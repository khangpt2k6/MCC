import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import OverviewPage from './components/OverviewPage';
import MutationsPage from './components/MutationsPage';
import ExpressionPage from './components/ExpressionPage';
import ClinicalPage from './components/ClinicalPage';

export default function App() {
  console.log('App component rendering');
  
  // Mock data for testing
  const stats = {
    totalSamples: 38,
    totalMutations: 61,
    mutatedSamples: 23,
    expressionSamples: 36
  };

  // Mock data for visualizations
  const mockMutations = [
    { gene: { hugoGeneSymbol: 'TP53' }, sampleId: 'SAMPLE_001', proteinChange: 'R175H', mutationType: 'Missense' },
    { gene: { hugoGeneSymbol: 'KRAS' }, sampleId: 'SAMPLE_002', proteinChange: 'G12D', mutationType: 'Missense' },
    { gene: { hugoGeneSymbol: 'PIK3CA' }, sampleId: 'SAMPLE_003', proteinChange: 'H1047R', mutationType: 'Missense' },
    { gene: { hugoGeneSymbol: 'BRAF' }, sampleId: 'SAMPLE_004', proteinChange: 'V600E', mutationType: 'Missense' },
    { gene: { hugoGeneSymbol: 'TP53' }, sampleId: 'SAMPLE_005', proteinChange: 'R248Q', mutationType: 'Missense' }
  ];

  const mockExpressions = [
    { gene: { hugoGeneSymbol: 'TP53' }, sampleId: 'SAMPLE_001', value: 2.5 },
    { gene: { hugoGeneSymbol: 'KRAS' }, sampleId: 'SAMPLE_001', value: 1.8 },
    { gene: { hugoGeneSymbol: 'PIK3CA' }, sampleId: 'SAMPLE_001', value: 3.2 },
    { gene: { hugoGeneSymbol: 'BRAF' }, sampleId: 'SAMPLE_001', value: 0.9 },
    { gene: { hugoGeneSymbol: 'TP53' }, sampleId: 'SAMPLE_002', value: 1.2 },
    { gene: { hugoGeneSymbol: 'KRAS' }, sampleId: 'SAMPLE_002', value: 4.1 },
    { gene: { hugoGeneSymbol: 'PIK3CA' }, sampleId: 'SAMPLE_002', value: 2.7 },
    { gene: { hugoGeneSymbol: 'BRAF' }, sampleId: 'SAMPLE_002', value: 1.5 }
  ];

  const mockSamples = [
    { sampleId: 'SAMPLE_001', patientId: 'PATIENT_001', sampleType: 'Primary', cancerType: 'Melanoma' },
    { sampleId: 'SAMPLE_002', patientId: 'PATIENT_002', sampleType: 'Primary', cancerType: 'Melanoma' },
    { sampleId: 'SAMPLE_003', patientId: 'PATIENT_003', sampleType: 'Metastasis', cancerType: 'Melanoma' }
  ];

  const mockClinicalData = [
    { sampleId: 'SAMPLE_001', age: 65, sex: 'Male', stage: 'Stage III', survivalMonths: 24 },
    { sampleId: 'SAMPLE_002', sampleId: 'SAMPLE_002', age: 58, sex: 'Female', stage: 'Stage II', survivalMonths: 36 },
    { sampleId: 'SAMPLE_003', sampleId: 'SAMPLE_003', age: 72, sex: 'Male', stage: 'Stage IV', survivalMonths: 12 }
  ];

  const mockSurvivalData = [
    { time: 0, survival: 1.0, atRisk: 38 },
    { time: 6, survival: 0.95, atRisk: 36 },
    { time: 12, survival: 0.89, atRisk: 32 },
    { time: 18, survival: 0.82, atRisk: 28 },
    { time: 24, survival: 0.76, atRisk: 24 },
    { time: 30, survival: 0.71, atRisk: 20 },
    { time: 36, survival: 0.68, atRisk: 16 }
  ];

  const exportData = () => {
    console.log('Export data clicked');
  };

    return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Layout stats={stats} onExportData={exportData}>
            <OverviewPage survivalData={mockSurvivalData} />
          </Layout>
        } />
        <Route path="/mutations" element={
          <Layout stats={stats} onExportData={exportData}>
            <MutationsPage mutations={mockMutations} selectedGene="TP53" />
          </Layout>
        } />
        <Route path="/expression" element={
          <Layout stats={stats} onExportData={exportData}>
            <ExpressionPage expressions={mockExpressions} selectedGenes={['TP53', 'KRAS', 'PIK3CA', 'BRAF']} samples={mockSamples} />
          </Layout>
        } />
        <Route path="/clinical" element={
          <Layout stats={stats} onExportData={exportData}>
            <ClinicalPage clinicalData={mockClinicalData} samples={mockSamples} survivalData={mockSurvivalData} />
          </Layout>
        } />
      </Routes>
    </BrowserRouter>
  );
}