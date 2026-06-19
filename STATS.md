# FlatLands Release Statistics

Release date: 2026-06-20

## Dataset Scale

| Metric | Value |
| --- | ---: |
| Total kept observations | 270,575 |
| Total rejected observations | 120,449 |
| Total processed observations | 391,024 |
| Paper-reported real metric indoor scenes | 17,656 |
| Source datasets | 6 |
| Filtering threshold | `conditional_signal_ratio >= 0.10` |

## Kept Observations by Split and Source

| Source | Train | Validation | Test | Total |
| --- | ---: | ---: | ---: | ---: |
| 3RScan | 15,425 | 1,912 | 879 | 18,216 |
| ARKitScenes | 34,151 | 4,201 | 1,930 | 40,282 |
| Matterport3D | 32,196 | 4,039 | 1,769 | 38,004 |
| ScanNet | 20,957 | 2,609 | 1,197 | 24,763 |
| ZInD | 112,613 | 14,129 | 6,354 | 133,096 |
| ScanNet++ | 0 | 0 | 16,214 | 16,214 |
| Total | 215,342 | 26,890 | 28,343 | 270,575 |

## Rejected Observations by Split and Source

| Source | Train | Validation | Test | Total |
| --- | ---: | ---: | ---: | ---: |
| 3RScan | 8,878 | 1,125 | 491 | 10,494 |
| ARKitScenes | 42,158 | 5,337 | 2,369 | 49,864 |
| Matterport3D | 9,703 | 1,198 | 592 | 11,493 |
| ScanNet | 8,041 | 1,015 | 437 | 9,493 |
| ZInD | 28,695 | 3,534 | 1,605 | 33,834 |
| ScanNet++ | 0 | 0 | 5,271 | 5,271 |
| Total | 97,475 | 12,209 | 10,765 | 120,449 |

## Observation Files

Each observation directory contains:

| File | Meaning |
| --- | --- |
| `observed_floor.png` | Observed floor conditioning map. |
| `floor_map.png` | Ground-truth complete floor map target. |
| `unobserved.png` | Unobserved/completion-region mask. |
| `epistemic_mask.png` | Valid support mask. |
| `metadata.json` | Observation, scene, crop, and provenance metadata. |

## Metadata Fields

Each `metadata.json` includes:

| Section | Fields |
| --- | --- |
| `observation` | rotation angle, camera floor position, camera pixel position, FOV, pixel counts, coverage, conditional signal ratio |
| `scene` | source dataset, scene id, area, grid size, metric resolution, floor height, geometry transform config |
| `provenance` | global observation id, original source path, original observation id, original split, quality category, difficulty score, original ratios |
| `crop` | original size, cropped size, crop bounds, camera offset |

