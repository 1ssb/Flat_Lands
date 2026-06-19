# FlatLands Dataset

FlatLands is the official dataset release for **Generative Floormap Completion From a Single Egocentric View**.

<p>
  <a href="https://github.com/1ssb/Flat_Lands/releases/latest">
    <img alt="Download FlatLands dataset" src="https://img.shields.io/badge/Download-Dataset-0b6bcb?style=for-the-badge">
  </a>
  <a href="https://arxiv.org/abs/2603.16016">
    <img alt="Read the FlatLands paper" src="https://img.shields.io/badge/Read-Paper-b31b1b?style=for-the-badge">
  </a>
</p>

## Release Status

This repository is reserved for the final dataset release only: dataset access, provenance, statistics, citation, and license notices.

The dataset archives should be attached as GitHub Release assets, or hosted by an institutional/object-storage endpoint linked from the latest release. GitHub Release assets provide public download counts. Email collection requires a privacy-compliant form or backend; do not collect researcher emails in public GitHub issues.

## Dataset Summary

- Observations: 270,575
- Real metric indoor scenes: 17,656
- Source datasets: 6
- Splits: train, validation, test
- Observation packet: `observed_floor.png`, `floor_map.png`, `unobserved.png`, `epistemic_mask.png`, `metadata.json`
- Filtering threshold: `conditional_signal_ratio >= 0.10`

## Split Counts

| Split | Observations |
| --- | ---: |
| Train | 215,342 |
| Validation | 26,890 |
| Test | 28,343 |
| Total | 270,575 |

## Files

- `STATS.md`: release statistics and per-source split counts.
- `PROVENANCE.md`: dataset construction and per-observation provenance fields.
- `LICENSE`: FlatLands release notice.
- `LICENSES.md`: upstream source dataset license and terms pointers.
- `DATASET_RELEASE.json`: machine-readable release metadata.
- `CITATION.cff`: citation metadata.

## Citation

```bibtex
@misc{bhattacharjee2026flatlands,
  title = {FlatLands: Generative Floormap Completion From a Single Egocentric View},
  author = {Subhransu S. Bhattacharjee and Dylan Campbell and Rahul Shome},
  year = {2026},
  eprint = {2603.16016},
  archivePrefix = {arXiv},
  primaryClass = {cs.CV},
  doi = {10.48550/arXiv.2603.16016}
}
```

