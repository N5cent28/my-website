---
title: "THA Cement Decision ML"
description: "Machine learning decision-support research for cemented vs non-cemented total hip arthroplasty using CT-derived features"
image: "/images/THAMLMajorityVote_roc_curves.png"
weight: 4
ShowToc: true
website: "https://github.com/N5cent28/the-cement-decision-ml"
sourceCode: "https://github.com/N5cent28/the-cement-decision-ml"
---

## Project Links

<div class="project-links">
  <a href="https://github.com/N5cent28/the-cement-decision-ml" class="project-link" target="_blank" rel="noopener noreferrer">
    <span>GitHub Repository</span>
  </a>
  <a href="https://github.com/N5cent28/the-cement-decision-ml/blob/main/methods.md" class="project-link" target="_blank" rel="noopener noreferrer">
    <span>Methods Document</span>
  </a>
</div>

## Overview

This is an ongoing machine learning research project focused on decision support for fixation strategy in total hip arthroplasty (THA): cemented versus non-cemented implants. The pipeline uses CT-derived quantitative imaging features and compares multiple modeling approaches while explicitly addressing surgeon disagreement, cohort heterogeneity, and data quality constraints.

The current repository reflects active development and iteration; results and conclusions will continue to evolve as additional analyses are completed.

## What I Accomplished

- Built an end-to-end, script-based ML workflow from data audit through model evaluation (`01_data_audit.py` to `05_compare_all_experiments.py`)
- Created leakage-safe preprocessing with patient-level grouped splitting, train-only fitting for imputation/scaling, and same-split reuse for controlled sensitivity analyses
- Implemented multiple label strategies to manage clinical uncertainty:
  - original-surgeon labels
  - majority-vote labels
  - vote-fraction (soft/probabilistic) labels
- Engineered clinically motivated features from Gruen zone BMD and cortical geometry, expanding from 13 base CT features to 22 total model inputs
- Trained and benchmarked Logistic Regression, Random Forest, Gradient Boosting, and SVM models with grouped cross-validation and held-out test evaluation
- Added cohort-specific reporting to evaluate domain shift across scanner eras/manufacturers (Toshiba vs Philips)

## Technical Approach

### Data and Labeling
- Retrospective THA cohort from preoperative CT scans
- Unit of analysis: hip-level observations, grouped by patient to prevent leakage
- Harmonized surgeon labels and quantified inter-rater agreement before defining target labels

### Preprocessing and Feature Engineering
- Quality filtering for unusable scans and implausible segmentation-derived values
- Cohort-aware KNN imputation (fit on training set only)
- Standardized scaling fit on train data, applied to both train and test
- Derived BMD summary statistics, paired-zone averages, and ratio features tied to cortical measurements

### Modeling and Evaluation
- Grouped 5-fold cross-validation by patient ID
- Test metrics: ROC-AUC, PR-AUC, accuracy, precision, recall, F1, confusion matrix
- Additional cohort-specific performance breakdowns to assess robustness

## Current Findings (Interim)

- The project demonstrates meaningful predictive signal from CT-derived features, but outcomes are sensitive to label definition and cohort differences.
- Logistic Regression currently provides a strong baseline ROC-AUC in majority-vote experiments.
- Comparative experiments suggest combined CT + demographic models may outperform CT-only models in this dataset, while demographics-only models retain moderate signal.

![Majority-vote ROC curves](/images/THAMLMajorityVote_roc_curves.png)

These findings are preliminary and intended to guide the next research iterations rather than serve as final clinical conclusions.

## Ongoing Work

Because this project is not yet published, current priorities are:

- sensitivity analyses across alternative ground truth definitions
- deeper unanimous-only versus majority-vote comparisons
- quality-flag impact analysis (including/excluding questionable scans)
- cohort transfer/generalization testing and potential harmonization strategies
- refinement of feature interpretation and model calibration

## Research Context

This work is intended as clinical decision-support research, not autonomous decision-making. It is being developed with de-identified data, documented preprocessing safeguards, and reproducibility-focused scripting to support transparent, iterative validation.
