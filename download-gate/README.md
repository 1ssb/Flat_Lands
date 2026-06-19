# FlatLands Download Gate

This Cloudflare Worker validates an email address, emails a signed dataset download link to that address, and counts requests/sent emails/download clicks.

It is intentionally separate from the dataset metadata so the repository remains a dataset release, not an application repo.

## Required Secrets and Bindings

Set these before deployment:

| Name | Type | Purpose |
| --- | --- | --- |
| `DATASET_URL` | secret/variable | Final private or public archive URL. |
| `RESEND_API_KEY` | secret | Resend API key used to send the email. |
| `FROM_EMAIL` | secret/variable | Verified sender, for example `FlatLands <datasets@example.edu>`. |
| `TOKEN_SECRET` | secret | Long random string used to sign download links. |
| `DOWNLOADS` | KV namespace | Stores counts and request records. |

Optional:

| Name | Purpose |
| --- | --- |
| `PAPER_URL` | Defaults to `https://arxiv.org/abs/2603.16016`. |
| `DATASET_NAME` | Defaults to `FlatLands`. |

## Deploy

```bash
cp download-gate/wrangler.toml.example wrangler.toml
wrangler kv namespace create DOWNLOADS
wrangler secret put DATASET_URL
wrangler secret put RESEND_API_KEY
wrangler secret put FROM_EMAIL
wrangler secret put TOKEN_SECRET
wrangler deploy
```

After deployment, use the Worker URL as the dataset button target in `README.md`.

## Behavior

1. User enters an email address.
2. Worker validates the address server-side.
3. Worker sends the dataset link only to that address.
4. The emailed link is signed and expires after 7 days.
5. `/download` validates the signature, increments download counters, then redirects to `DATASET_URL`.

This confirms that the submitted address is deliverable enough to receive the link; it does not prove institutional affiliation.

