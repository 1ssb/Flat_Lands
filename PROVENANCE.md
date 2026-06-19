# FlatLands Provenance

FlatLands is a derived benchmark dataset for single-view bird's-eye-view floor completion. It contains aligned observation maps, visibility/completion masks, valid support masks, ground-truth BEV floor maps, and per-observation metadata.

## Source Datasets

FlatLands is derived from six existing indoor scene datasets:

- 3RScan
- ARKitScenes
- Matterport3D
- ScanNet
- ZInD
- ScanNet++

No upstream RGB-D videos, raw meshes, point clouds, panoramas, or proprietary source archives are relicensed by this repository. Users remain responsible for complying with the source dataset terms listed in `LICENSES.md`.

## Construction Summary

1. Source indoor scenes were converted into metric floor maps.
2. Egocentric observations were sampled from valid camera/floor locations.
3. For each observation, FlatLands stores:
   - observed floor conditioning
   - unobserved completion region
   - valid/epistemic support mask
   - complete floor-map target
   - JSON metadata and provenance
4. Observations were filtered at `conditional_signal_ratio >= 0.10`.
5. The final train/validation/test release contains 270,575 observations.

## Split Policy

| Split | Observations |
| --- | ---: |
| Train | 215,342 |
| Validation | 26,890 |
| Test | 28,343 |

ScanNet++ appears only in the test split in the final release statistics.

## Per-Observation Traceability

Every released observation has a `metadata.json` file with provenance fields:

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

This enables each FlatLands observation to be traced back to its source dataset, scene identifier, original split, and original observation id.

## Data Integrity

Official release archives should include checksums in the GitHub Release notes or a release asset manifest. Archive assets should not be committed directly to Git unless they are tracked with Git LFS.

