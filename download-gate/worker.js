const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TOKEN_TTL_SECONDS = 7 * 24 * 60 * 60;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "GET" && url.pathname === "/") {
      return htmlResponse(renderForm(env));
    }

    if (request.method === "POST" && url.pathname === "/request") {
      return handleRequest(request, env);
    }

    if (request.method === "GET" && url.pathname === "/download") {
      return handleDownload(url, env);
    }

    if (request.method === "GET" && url.pathname === "/stats") {
      return handleStats(env);
    }

    return new Response("Not found", { status: 404 });
  }
};

async function handleRequest(request, env) {
  assertConfigured(env);

  const form = await request.formData();
  const email = String(form.get("email") || "").trim().toLowerCase();

  if (!isValidEmail(email)) {
    return htmlResponse(renderForm(env, "Please enter a valid email address."), 400);
  }

  const now = Math.floor(Date.now() / 1000);
  const token = await signToken(email, now, env.TOKEN_SECRET);
  const origin = new URL(request.url).origin;
  const link = `${origin}/download?email=${encodeURIComponent(email)}&ts=${now}&token=${encodeURIComponent(token)}`;

  await increment(env, "requests_total");
  await env.DOWNLOADS.put(`request:${now}:${crypto.randomUUID()}`, JSON.stringify({
    email,
    requested_at: new Date(now * 1000).toISOString()
  }));

  const sent = await sendEmail(env, email, link);
  if (!sent.ok) {
    await increment(env, "email_errors_total");
    return htmlResponse(renderForm(env, "We could not send the email. Please try again later."), 502);
  }

  await increment(env, "emails_sent_total");
  return htmlResponse(renderSent(email));
}

async function handleDownload(url, env) {
  assertConfigured(env);

  const email = String(url.searchParams.get("email") || "").trim().toLowerCase();
  const ts = Number(url.searchParams.get("ts") || "0");
  const token = String(url.searchParams.get("token") || "");
  const now = Math.floor(Date.now() / 1000);

  if (!isValidEmail(email) || !Number.isFinite(ts) || now - ts > TOKEN_TTL_SECONDS || ts > now + 300) {
    return htmlResponse(renderExpired(), 400);
  }

  const expected = await signToken(email, ts, env.TOKEN_SECRET);
  if (!timingSafeEqual(token, expected)) {
    return htmlResponse(renderExpired(), 403);
  }

  await increment(env, "downloads_total");
  await env.DOWNLOADS.put(`download:${now}:${crypto.randomUUID()}`, JSON.stringify({
    email,
    downloaded_at: new Date(now * 1000).toISOString()
  }));

  return Response.redirect(env.DATASET_URL, 302);
}

async function handleStats(env) {
  if (!env.DOWNLOADS) {
    return new Response("Stats unavailable", { status: 503 });
  }

  const stats = {
    requests_total: Number(await env.DOWNLOADS.get("count:requests_total") || "0"),
    emails_sent_total: Number(await env.DOWNLOADS.get("count:emails_sent_total") || "0"),
    email_errors_total: Number(await env.DOWNLOADS.get("count:email_errors_total") || "0"),
    downloads_total: Number(await env.DOWNLOADS.get("count:downloads_total") || "0")
  };

  return new Response(JSON.stringify(stats, null, 2), {
    headers: { "content-type": "application/json; charset=utf-8" }
  });
}

function isValidEmail(email) {
  return email.length <= 254 && EMAIL_RE.test(email);
}

async function sendEmail(env, to, link) {
  const datasetName = env.DATASET_NAME || "FlatLands";
  const paperUrl = env.PAPER_URL || "https://arxiv.org/abs/2603.16016";

  return fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "authorization": `Bearer ${env.RESEND_API_KEY}`,
      "content-type": "application/json"
    },
    body: JSON.stringify({
      from: env.FROM_EMAIL,
      to,
      subject: `${datasetName} dataset download link`,
      text: [
        `Your ${datasetName} dataset download link is below.`,
        "",
        link,
        "",
        "This signed link expires in 7 days.",
        `Paper: ${paperUrl}`
      ].join("\n")
    })
  });
}

async function increment(env, name) {
  const key = `count:${name}`;
  const current = Number(await env.DOWNLOADS.get(key) || "0");
  await env.DOWNLOADS.put(key, String(current + 1));
}

async function signToken(email, ts, secret) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const data = `${email}:${ts}`;
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
  return base64Url(sig);
}

function base64Url(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i += 1) {
    out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return out === 0;
}

function assertConfigured(env) {
  const missing = ["DATASET_URL", "RESEND_API_KEY", "FROM_EMAIL", "TOKEN_SECRET", "DOWNLOADS"]
    .filter((name) => !env[name]);
  if (missing.length) {
    throw new Error(`Missing required configuration: ${missing.join(", ")}`);
  }
}

function renderForm(env, error = "") {
  const datasetName = escapeHtml(env.DATASET_NAME || "FlatLands");
  return page(datasetName, `
    <main>
      <h1>${datasetName} Dataset</h1>
      <p>Enter a valid email address. The download link will be sent to that address.</p>
      ${error ? `<p class="error">${escapeHtml(error)}</p>` : ""}
      <form method="post" action="/request">
        <label for="email">Email address</label>
        <input id="email" name="email" type="email" autocomplete="email" required maxlength="254" placeholder="name@example.edu">
        <button type="submit">Send download link</button>
      </form>
      <p class="minor"><a href="https://arxiv.org/abs/2603.16016">Read the paper</a></p>
    </main>
  `);
}

function renderSent(email) {
  return page("Download link sent", `
    <main>
      <h1>Check your email</h1>
      <p>If <strong>${escapeHtml(email)}</strong> is valid, the FlatLands dataset link has been sent there.</p>
      <p class="minor">The download link expires in 7 days.</p>
    </main>
  `);
}

function renderExpired() {
  return page("Invalid link", `
    <main>
      <h1>Invalid or expired link</h1>
      <p>Please request a new FlatLands dataset download link.</p>
      <p class="minor"><a href="/">Request a new link</a></p>
    </main>
  `);
}

function htmlResponse(body, status = 200) {
  return new Response(body, {
    status,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store"
    }
  });
}

function page(title, body) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <style>
    :root { color-scheme: light; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
    body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #f7f8fa; color: #16181d; }
    main { width: min(92vw, 440px); }
    h1 { margin: 0 0 12px; font-size: 28px; line-height: 1.15; }
    p { margin: 0 0 18px; line-height: 1.5; color: #3d4552; }
    form { display: grid; gap: 10px; }
    label { font-weight: 650; font-size: 14px; }
    input { box-sizing: border-box; width: 100%; min-height: 46px; border: 1px solid #aeb7c4; border-radius: 6px; padding: 0 12px; font: inherit; background: white; }
    input:focus { outline: 3px solid #b8d6ff; border-color: #0b6bcb; }
    button { min-height: 46px; border: 0; border-radius: 6px; padding: 0 14px; background: #0b6bcb; color: white; font: inherit; font-weight: 700; cursor: pointer; }
    button:hover { background: #075aa9; }
    a { color: #0b5cad; }
    .error { color: #a81616; font-weight: 650; }
    .minor { margin-top: 18px; font-size: 14px; }
  </style>
</head>
<body>${body}</body>
</html>`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

