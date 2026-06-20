# FlatLands Repository

FlatLands is the official dataset release for **Generative Floormap Completion From a Single Egocentric View**.

<p>
  <a href="https://huggingface.co/datasets/Rudra1ssb/FlatLands">
    <img
      alt="FlatLands dataset on Hugging Face"
      src="https://img.shields.io/badge/Hugging%20Face-Dataset-FFD21E?style=for-the-badge&logo=huggingface"
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

- **26 June 2026; Camera-Ready:** Dataset downloads are served through the Hugging Face dataset repository.

- Model weights, code, and the tools used to construct the FlatLands dataset are planned for release in this repository.

- Additional release materials, including metadata for the RGB-to-BEV experiments and a private challenge split for leaderboard evaluation, will be hosted through Hugging Face.

**Important:** **None** of the underlying source data from the datasets listed in [`LICENSES.md`](LICENSES.md) is redistributed by this repository. Only the transformed FlatLands dataset artifacts described in the paper are released. Users remain responsible for complying with the terms of the original source datasets.


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

## Citation

```bibtex
@inproceedings{bhattacharjee2026flatlands,
  title     = {FlatLands: Generative Floormap Completion From a Single Egocentric View},
  author    = {Bhattacharjee, Subhransu S. and Campbell, Dylan and Shome, Rahul},
  booktitle = {European Conference on Computer Vision (ECCV)},
  year      = {2026}
}
```

Please also consider citing the underlying datasets as used:

```bibtex

@inproceedings{mp3d,
  title     = {{Matterport3D}: Learning from {RGB-D} Data in Indoor Environments},
  author    = {Chang, Angel X. and Dai, Angela and Funkhouser, Thomas and Halber, Maciej and Nie{\ss}ner, Matthias and Savva, Manolis and Song, Shuran and Zeng, Andy and Zhang, Yinda},
  booktitle = {International Conference on 3D Vision (3DV)},
  pages     = {667--676},
  year      = {2017}
}

@inproceedings{dai2017scannet,
  title     = {{ScanNet}: Richly-Annotated 3D Reconstructions of Indoor Scenes},
  author    = {Dai, Angela and Chang, Angel X. and Savva, Manolis and Halber, Maciej and Funkhouser, Thomas and Nie{\ss}ner, Matthias},
  booktitle = {Proceedings of the IEEE Conference on Computer Vision and Pattern Recognition (CVPR)},
  pages     = {2432--2443},
  year      = {2017}
}

@inproceedings{yeshwanth2023scannetpp,
  title     = {{ScanNet++}: A High-Fidelity Dataset of 3D Indoor Scenes},
  author    = {Yeshwanth, Chandan and Liu, Yueh-Cheng and Nie{\ss}ner, Matthias and Dai, Angela},
  booktitle = {Proceedings of the IEEE/CVF International Conference on Computer Vision (ICCV)},
  year      = {2023}
}

@inproceedings{baruch2021arkitscenes,
  title     = {{ARKitScenes}: A Diverse Real-World Dataset for 3D Indoor Scene Understanding Using Mobile {RGB-D} Data},
  author    = {Baruch, Gilad and Chen, Zhuoyuan and Dehghan, Afshin and Dimry, Tal and Feigin, Yuri and Fu, Peter and Gebauer, Thomas and Joffe, Brandon and Kurz, Daniel and Schwartz, Arik and Shulman, Elad},
  booktitle = {Advances in Neural Information Processing Systems (NeurIPS) Datasets and Benchmarks Track},
  year      = {2021}
}

@inproceedings{wald2019rio,
  title     = {{RIO}: 3D Object Instance Re-Localization in Changing Indoor Environments},
  author    = {Wald, Johanna and Avetisyan, Armen and Navab, Nassir and Tombari, Federico and Nie{\ss}ner, Matthias},
  booktitle = {Proceedings of the IEEE/CVF International Conference on Computer Vision (ICCV)},
  pages     = {7657--7666},
  year      = {2019}
}

@inproceedings{zind,
  title     = {{Zillow Indoor Dataset}: Annotated Floor Plans with 360deg Panoramas and 3D Room Layouts},
  author    = {Cruz, Steve and Hutchcroft, Will and Li, Yuguang and Khosravan, Naji and Boyadzhiev, Ivaylo and Kang, Sing Bing},
  booktitle = {Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)},
  pages     = {2133--2143},
  year      = {2021}
}
```
