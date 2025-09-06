#!/usr/bin/perl
use strict;
use warnings;
use Getopt::Long;

my $input_file = '';
my $output_file = '';
my $help = 0;

# Parse command line options
GetOptions(
    'input=s'  => \$input_file,
    'output=s' => \$output_file,
    'help|h'   => \$help
) or die "Error in command line arguments\n";

# Display help if requested
if ($help || !$input_file || !$output_file) {
    print_help();
    exit(0);
}

unless (-f $input_file) {
    die "Error: Input file '$input_file' not found\n";
}

process_fasta($input_file, $output_file);

print "GC content analysis completed. Results written to: $output_file\n";

# Subroutines
sub print_help {
    print <<EOF;
GC Content Calculator v1.0

Usage: perl toolExample.pl --input <input.fasta> --output <output.txt>

Options:
  --input   Input FASTA file
  --output  Output file for results
  --help    Display this help message

Description:
  Calculates GC content percentage for each sequence in a FASTA file.
  
Example:
  perl toolExample.pl --input sequences.fasta --output gc_results.txt

EOF
}

sub process_fasta {
    my ($input, $output) = @_;
    
    open(my $in_fh, '<', $input) or die "Cannot open input file '$input': $!\n";
    open(my $out_fh, '>', $output) or die "Cannot open output file '$output': $!\n";
    
    # Print header
    print $out_fh "Sequence_ID\tLength\tGC_Count\tGC_Percentage\tAT_Count\tAT_Percentage\n";
    
    my $seq_id = '';
    my $sequence = '';
    my $seq_count = 0;
    
    while (my $line = <$in_fh>) {
        chomp $line;
        
        if ($line =~ /^>(.+)/) {
            # Process previous sequence if exists
            if ($seq_id && $sequence) {
                process_sequence($out_fh, $seq_id, $sequence);
                $seq_count++;
            }
            
            # Start new sequence
            $seq_id = $1;
            $sequence = '';
        } elsif ($line =~ /^[ACGTNacgtn]+$/) {
            # Add to current sequence (only valid nucleotides)
            $sequence .= uc($line);
        }
    }
    
    # Process last sequence
    if ($seq_id && $sequence) {
        process_sequence($out_fh, $seq_id, $sequence);
        $seq_count++;
    }
    
    close($in_fh);
    close($out_fh);
    
    print "Processed $seq_count sequences\n";
}

sub process_sequence {
    my ($fh, $id, $seq) = @_;
    
    my $length = length($seq);
    return if $length == 0;
    
    # Count nucleotides
    my $g_count = ($seq =~ tr/G//);
    my $c_count = ($seq =~ tr/C//);
    my $a_count = ($seq =~ tr/A//);
    my $t_count = ($seq =~ tr/T//);
    
    my $gc_count = $g_count + $c_count;
    my $at_count = $a_count + $t_count;
    
    # Calculate percentages
    my $gc_percentage = $length > 0 ? sprintf("%.2f", ($gc_count / $length) * 100) : 0;
    my $at_percentage = $length > 0 ? sprintf("%.2f", ($at_count / $length) * 100) : 0;
    
    # Write results
    print $fh "$id\t$length\t$gc_count\t$gc_percentage\t$at_count\t$at_percentage\n";
}