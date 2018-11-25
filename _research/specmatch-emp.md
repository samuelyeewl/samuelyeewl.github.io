---
layout: page
title: Stellar Characterization
img: specmatch-emp.png
imgalign: right
imgcaption: Performance of <i>SpecMatch-Emp</i> in an internal cross-validation test. Black points denote the library properties of a given star, red lines point to the derived properties. Especially along the main sequence, <i>SpecMatch-Emp</i> performs extremely well.
---

Our methods for detecting and characterizing exoplanets depend heavily on a detailed understanding of their host stars. For instance, the transit detection method measures the tiny dip in a star's brightness as a planet passes in front of it, with the size of this dip depending on the ratio of the planet's to star's radius.

Working with [Erik Petigura](https://www.erikpetigura.com/), I developed [SpecMatch-Empirical](https://github.com/samuelyeewl/specmatch-emp), a new tool for characterizing the effective temperature, radius, and metallicity of a star from its spectrum. _SpecMatch-Emp_ compares a target spectrum with a library of high resolution, high signal-to-noise observed spectra from stars with empirically-determined properties. Using empirical instead of synthetic spectra allows us to avoid model-dependent uncertainties particularly for late-type stars, and we achieve a precision of ~70 K in effective temperature and <10% in stellar radius.

_SpecMatch-Emp_ has been applied to spectra from many spectrographs including Keck/HIRES, HARPS, and _Coralie_. More information can be found in [Yee, Petigura and Von Braun (2017)](https://arxiv.org/abs/1701.00922), as well as at the [documentation page](https://specmatch-emp.readthedocs.io).
 
{% include figure.html image="specmatch-spectra.png" caption="<i>SpecMatch-Emp</i> identifies the five best-matching library spectra to the target, in this case the G-type star HD 190406, and synthesizes a linear combination to create an even better match to the target spectrum. The weights of the linear combination are used to derive a set of stellar parameters for the target." width="full" %}
