# FlatLands Provenance, Structure, and Statistics

FlatLands is a derived benchmark dataset for single-view bird’s-eye-view floor completion. Each observation contains an egocentric partial floor observation, completion and support masks, a complete ground-truth BEV floor map, and metadata for provenance and reproducibility.

## Source Datasets

FlatLands is derived from six existing indoor scene datasets:

* 3RScan
* ARKitScenes
* Matterport3D
* ScanNet
* ZInD
* ScanNet++

This repository does **not** relicense or redistribute upstream RGB-D videos, raw meshes, point clouds, panoramas, or proprietary source archives. Users remain responsible for complying with the original source dataset terms listed in `LICENSES.md`.

## Dataset Construction

FlatLands was constructed as follows:

1. Source indoor scenes were converted into metric floor maps.
2. Egocentric observations were sampled from valid camera and floor locations.
3. Each observation was converted into aligned BEV supervision containing:

   * observed floor conditioning,
   * unobserved completion region,
   * valid/epistemic support mask,
   * complete floor-map target,
   * JSON metadata and provenance.
4. Observations were filtered using:

```text
conditional_signal_ratio >= 0.10
```

The final released train/validation/test dataset contains **270,575 observations**.

## Split Policy

| Split      | Observations |
| ---------- | -----------: |
| Train      |      215,342 |
| Validation |       26,890 |
| Test       |       28,343 |
| **Total**  |  **270,575** |

ScanNet++ is included only in the test split in the final release statistics.

## Dataset Scale

| Metric                                   |                              Value |
| ---------------------------------------- | ---------------------------------: |
| Total kept observations                  |                            270,575 |
| Total rejected observations              |                            120,449 |
| Total processed observations             |                            391,024 |
| Paper-reported real metric indoor scenes |                             17,656 |
| Source datasets                          |                                  6 |
| Filtering threshold                      | `conditional_signal_ratio >= 0.10` |

## Kept Observations by Split and Source

| Source       |       Train | Validation |       Test |       Total |
| ------------ | ----------: | ---------: | ---------: | ----------: |
| 3RScan       |      15,425 |      1,912 |        879 |      18,216 |
| ARKitScenes  |      34,151 |      4,201 |      1,930 |      40,282 |
| Matterport3D |      32,196 |      4,039 |      1,769 |      38,004 |
| ScanNet      |      20,957 |      2,609 |      1,197 |      24,763 |
| ZInD         |     112,613 |     14,129 |      6,354 |     133,096 |
| ScanNet++    |           0 |          0 |     16,214 |      16,214 |
| **Total**    | **215,342** | **26,890** | **28,343** | **270,575** |

## Rejected Observations by Split and Source

| Source       |      Train | Validation |       Test |       Total |
| ------------ | ---------: | ---------: | ---------: | ----------: |
| 3RScan       |      8,878 |      1,125 |        491 |      10,494 |
| ARKitScenes  |     42,158 |      5,337 |      2,369 |      49,864 |
| Matterport3D |      9,703 |      1,198 |        592 |      11,493 |
| ScanNet      |      8,041 |      1,015 |        437 |       9,493 |
| ZInD         |     28,695 |      3,534 |      1,605 |      33,834 |
| ScanNet++    |          0 |          0 |      5,271 |       5,271 |
| **Total**    | **97,475** | **12,209** | **10,765** | **120,449** |

## Observation Directory Structure

Each released observation directory contains:

| File                 | Description                                        |
| -------------------- | -------------------------------------------------- |
| `observed_floor.png` | Observed floor conditioning map.                   |
| `floor_map.png`      | Ground-truth complete floor-map target.            |
| `unobserved.png`     | Unobserved/completion-region mask.                 |
| `epistemic_mask.png` | Valid support mask.                                |
| `metadata.json`      | Observation, scene, crop, and provenance metadata. |

## Metadata Fields

Each `metadata.json` file contains the following sections:

| Section       | Fields                                                                                                                                                   |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `observation` | Rotation angle, camera floor position, camera pixel position, field of view, pixel counts, coverage, and conditional signal ratio.                       |
| `scene`       | Source dataset, scene identifier, area, grid size, metric resolution, floor height, and geometry transform configuration.                                |
| `provenance`  | Global observation ID, original source path, original observation ID, original split, quality category, difficulty score, and original filtering ratios. |
| `crop`        | Original size, cropped size, crop bounds, and camera offset.                                                                                             |

## Per-Observation Traceability

Every released observation includes provenance metadata that allows it to be traced back to its source dataset, scene identifier, original split, and original observation ID.

Example:

```json
{
  "provenance": {
    "global_id": "obs_084303",
    "original_path": "train/ARKitScenes/41126908_3dod_mesh/observations/obs_000",
    "original_obs_id": "obs_000",
    "original_split": "train",
    "quality_category": "LEARNABLE",
    "difficulty_score": 6.74904695004161,
    "original_conditional_signal_ratio": 0.12904812765325036,
    "original_completion_ratio": 0.8709518723467496
  }
}
```

This metadata is intended to support dataset auditing, split verification, reproducibility, and source-level analysis without redistributing the upstream source artifacts.
