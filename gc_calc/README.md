## Input

- FASTA file containing one or more DNA sequences

## Output

Tab-delimited file with columns:
- Sequence_ID: FASTA header identifier
- Length: Total sequence length
- GC_Count: Number of G and C nucleotides
- GC_Percentage: Percentage of G and C nucleotides
- AT_Count: Number of A and T nucleotides
- AT_Percentage: Percentage of A and T nucleotides

## Installation

This tool is available in the Galaxy Tool Shed:
https://toolshed.g2.bx.psu.edu/view/khangpt2k6/gc_calc

## Usage

1. Upload a FASTA file to Galaxy
2. Run "GC Content Calculator" tool
3. View results in tabular format

# Requirements

- Perl 5.26 or higher
- Galaxy platform#

## Example

Input FASTA:
```
>sequence1
ATGCGATCGTAGCATGC
>sequence2
AAATTTTGGGGCCCC
```

Output:
```
Sequence_ID	Length	GC_Count	GC_Percentage	AT_Count	AT_Percentage
sequence1	17	9	52.94	8	47.06
sequence2	15	10	66.67	5	33.33
```