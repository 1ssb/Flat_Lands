# FlatLands Dataset

FlatLands is the official dataset release for **Generative Floormap Completion From a Single Egocentric View**.


<p>
  <a href="download-gate/">
    <img
      alt="Request FlatLands dataset by email"
      src="https://img.shields.io/badge/Request-Dataset-0b6bcb?style=for-the-badge"
    >
  </a>
  <a href="https://arxiv.org/abs/2603.16016">
    <img
      alt="Read the FlatLands paper"
      src="https://img.shields.io/badge/Read-Paper-b31b1b?style=for-the-badge"
    >
  </a>
</p>


## Release Status

This repository is reserved for the final code, dataset and model release. 

Dataset downloads are served through Huggingface dataset repository. Tools used for creating the dataset have also been released in this repository.

Model weights and code will be released soon.

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
@inproceedings{bhattacharjee2026flatlands,
  title     = {FlatLands: Generative Floormap Completion From a Single Egocentric View},
  author    = {Bhattacharjee, Subhransu S. and Campbell, Dylan and Shome, Rahul},
  booktitle = {European Conference on Computer Vision (ECCV)},
  year      = {2026}
}
```

