---
title: "Statistical Genetics"
description: "Showcasing projects from human statistical genetics coursework"
image: "/images/humangenetics.png"
weight: 4
ShowToc: true
---

## Project Links

<div class="project-links">
  <a href="/documents/620hw3_README.html" class="project-link" target="_blank" rel="noopener noreferrer">
    <span>GWAS Analysis Report</span>
  </a>
  <a href="/documents/schizophrenia_gwas_analysis_final.html" class="project-link" target="_blank" rel="noopener noreferrer">
    <span>Schizophrenia GWAS Final Project</span>
  </a>
</div>

## Overview

This project showcases various analyses completed as part of my statistical genetics coursework. The collection demonstrates my ability to apply statistical methods to genomic data and extract meaningful biological insights.

## GWAS Analysis

For this assignment, we conducted a genome-wide association study (GWAS) to identify genetic variants associated with a simulated quantitative trait using European data from the 1000 Genomes Project. We implemented the analysis in Python using the statsmodels and sklearn libraries for linear regression analysis. We used age, sex, and the first 4 principal components as covariates, and generated association statistics for approximately 700,000 SNPs.

The analysis identified several suggestive associations primarily on chromosome 12, with the strongest signal at rs4348470 (p = 1.37×10⁻⁷). We visualized the results through Manhattan and QQ plots, which confirmed the absence of genome-wide significant associations but revealed multiple variants approaching significance.

![Manhattan Plot](/images/manhattan_plot.png)

## Schizophrenia GWAS Final Project

For my final project, I conducted a comprehensive genome-wide association study (GWAS) analysis of schizophrenia using the PGC3 dataset, which included over 1 million variants across 21,909 cases and 38,691 controls. This project demonstrated advanced statistical genetics techniques including heritability estimation, genetic correlation analysis, and Mendelian randomization.

### Key Analyses

- **GWAS Analysis**: Identified 21,790 genome-wide significant variants (p < 5×10⁻⁸) across the genome
- **Heritability Estimation**: Used LD Score regression to estimate SNP-based heritability at 23.15% (SE: 1.54%), consistent with previous schizophrenia studies
- **Genetic Correlations**: Analyzed genetic correlations between schizophrenia and 5+ other traits including ADHD, PTSD, and substance use disorders
- **Mendelian Randomization**: Performed bidirectional MR analysis to investigate causal relationships between schizophrenia and related phenotypes

### Technical Skills Demonstrated

- **Data Processing**: Handled large-scale genomic datasets (>1M variants) using Python and pandas
- **Statistical Methods**: Applied LD Score regression, genomic control correction, and multiple testing corrections
- **Visualization**: Created Manhattan plots, QQ plots, and LocusZoom plots for result interpretation
- **Software Tools**: Used LDSC, PLINK, and custom Python scripts for analysis pipeline

![Schizophrenia Manhattan Plot](/images/manhattan_plot.png)

![Heritability Estimates](/images/heritability_enrichment_figures/heritability_estimates.png)

### Results Summary

The analysis revealed strong genetic signals in the MHC region on chromosome 6, consistent with established schizophrenia loci. The heritability analysis confirmed substantial genetic contribution to schizophrenia risk, while genetic correlation analysis provided insights into shared genetic architecture with related psychiatric and behavioral traits.

## Future Assignments

This section will be expanded with additional statistical genetics assignments and projects as they are completed. 