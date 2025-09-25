---
title: "GRHL2 DNA Binding Analysis"
description: "Analysis of Grainyhead-like protein 2 homolog binding patterns using microarray data and unsupervised machine learning techniques"
image: "/images/grhl2_poster.png"
weight: 6
ShowToc: true
---

## Project Links

<div class="project-links">
  <a href="https://youtu.be/19DapI1pLJw" class="project-link" target="_blank" rel="noopener noreferrer">
    <span>Presentation Video</span>
  </a>
  <a href="/documents/UnsupervisedML_Final.html" class="project-link" target="_blank" rel="noopener noreferrer">
    <span>Analysis Report</span>
  </a>
</div>

## Overview

This project investigates the DNA binding patterns of GRHL2 (Grainyhead-like protein 2), a transcription factor implicated in cancer progression. Using microarray data and unsupervised machine learning techniques, I analyzed binding motifs to better understand how GRHL2 interacts with DNA.

## Key Components

- **Data Processing**: Cleaned and normalized microarray data to identify binding regions
- **Motif Analysis**: Applied unsupervised learning to discover potential binding motifs
- **Visualization**: Created interactive visualizations of binding patterns and motif clusters
- **Integration**: Connected findings with known GRHL2 functions in cancer pathways

## Technical Details

- **Languages**: Python, R
- **Key Libraries**: scikit-learn, BioPython, ggplot2
- **Analysis Methods**: 
  - K-means clustering
  - Position Weight Matrices (PWM)
  - Sequence logo generation
  - Statistical significance testing

## Results

The analysis revealed several interesting patterns in GRHL2 binding preferences, including:
- Correlation between binding strength and specific sequence features
- Clustering of binding sites with similar characteristics