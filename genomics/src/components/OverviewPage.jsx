import React, { useState } from 'react';
import Plot from 'react-plotly.js';

const OverviewPage = ({ survivalData }) => {
  console.log('OverviewPage component rendering', { survivalData });
  
  // State for zoom controls
  const [overallZoom, setOverallZoom] = useState({ x: [0, 250], y: [0, 100] });
  const [diseaseFreeZoom, setDiseaseFreeZoom] = useState({ x: [0, 150], y: [0, 100] });

  // Zoom control functions
  const zoomIn = (plotType) => {
    if (plotType === 'overall') {
      const xRange = overallZoom.x[1] - overallZoom.x[0];
      const yRange = overallZoom.y[1] - overallZoom.y[0];
      const newXRange = xRange * 0.7;
      const newYRange = yRange * 0.7;
      const xCenter = (overallZoom.x[0] + overallZoom.x[1]) / 2;
      const yCenter = (overallZoom.y[0] + overallZoom.y[1]) / 2;
      
      setOverallZoom({
        x: [xCenter - newXRange/2, xCenter + newXRange/2],
        y: [Math.max(0, yCenter - newYRange/2), Math.min(100, yCenter + newYRange/2)]
      });
    } else if (plotType === 'diseaseFree') {
      const xRange = diseaseFreeZoom.x[1] - diseaseFreeZoom.x[0];
      const yRange = diseaseFreeZoom.y[1] - diseaseFreeZoom.y[0];
      const newXRange = xRange * 0.7;
      const newYRange = yRange * 0.7;
      const xCenter = (diseaseFreeZoom.x[0] + diseaseFreeZoom.x[1]) / 2;
      const yCenter = (diseaseFreeZoom.y[0] + diseaseFreeZoom.y[1]) / 2;
      
      setDiseaseFreeZoom({
        x: [xCenter - newXRange/2, xCenter + newXRange/2],
        y: [Math.max(0, yCenter - newYRange/2), Math.min(100, yCenter + newYRange/2)]
      });
    }
  };

  const zoomOut = (plotType) => {
    if (plotType === 'overall') {
      const xRange = overallZoom.x[1] - overallZoom.x[0];
      const yRange = overallZoom.y[1] - overallZoom.y[0];
      const newXRange = Math.min(250, xRange * 1.3);
      const newYRange = Math.min(100, yRange * 1.3);
      const xCenter = (overallZoom.x[0] + overallZoom.x[1]) / 2;
      const yCenter = (overallZoom.y[0] + overallZoom.y[1]) / 2;
      
      setOverallZoom({
        x: [Math.max(0, xCenter - newXRange/2), Math.min(250, xCenter + newXRange/2)],
        y: [Math.max(0, yCenter - newYRange/2), Math.min(100, yCenter + newYRange/2)]
      });
    } else if (plotType === 'diseaseFree') {
      const xRange = diseaseFreeZoom.x[1] - diseaseFreeZoom.x[0];
      const yRange = diseaseFreeZoom.y[1] - diseaseFreeZoom.y[0];
      const newXRange = Math.min(150, xRange * 1.3);
      const newYRange = Math.min(100, yRange * 1.3);
      const xCenter = (diseaseFreeZoom.x[0] + diseaseFreeZoom.x[1]) / 2;
      const yCenter = (diseaseFreeZoom.y[0] + diseaseFreeZoom.y[1]) / 2;
      
      setDiseaseFreeZoom({
        x: [Math.max(0, xCenter - newXRange/2), Math.min(150, xCenter + newXRange/2)],
        y: [Math.max(0, yCenter - newYRange/2), Math.min(100, yCenter + newYRange/2)]
      });
    }
  };

  const resetZoom = (plotType) => {
    if (plotType === 'overall') {
      setOverallZoom({ x: [0, 250], y: [0, 100] });
    } else if (plotType === 'diseaseFree') {
      setDiseaseFreeZoom({ x: [0, 150], y: [0, 100] });
    }
  };

  // Mock data for the dashboard
  const dataTypes = [
    { type: 'Mutations', count: 38, freq: 100.0 },
    { type: 'Putative copy-number alterations from GISTIC', count: 38, freq: 100.0 },
    { type: 'mRNA expression (FPKM)', count: 36, freq: 94.7 },
    { type: 'mRNA expression z-scores relative to all samples', count: 36, freq: 94.7 },
    { type: 'mRNA expression z-scores relative to diploid samples', count: 36, freq: 94.7 }
  ];

  const mutatedGenes = [
    { gene: 'FCGBP', mutations: 14, samples: 8, freq: 21.1 },
    { gene: 'AHNAK2', mutations: 11, samples: 8, freq: 21.1 },
    { gene: 'HLA-DRB5', mutations: 9, samples: 7, freq: 18.4 },
    { gene: 'XIRP2', mutations: 16, samples: 7, freq: 18.4 },
    { gene: 'HLA-B', mutations: 13, samples: 7, freq: 18.4 },
    { gene: 'CSMD1', mutations: 9, samples: 7, freq: 18.4 },
    { gene: 'PABPC1', mutations: 10, samples: 7, freq: 18.4 },
    { gene: 'MUC17', mutations: 13, samples: 7, freq: 18.4 },
    { gene: 'BRAF', mutations: 9, samples: 7, freq: 18.4 },
    { gene: 'FMN2', mutations: 7, samples: 7, freq: 18.4 },
    { gene: 'MYCBP2', mutations: 6, samples: 6, freq: 15.8 }
  ];

  const cnaGenes = [
    { gene: 'OMP', cytoband: '11q13.5', cna: 'AMP', count: 6, freq: 15.8 },
    { gene: 'USP35', cytoband: '11q14.1', cna: 'AMP', count: 6, freq: 15.8 },
    { gene: 'ALG8', cytoband: '11q14.1', cna: 'AMP', count: 6, freq: 15.8 },
    { gene: 'INTS4', cytoband: '11q14.1', cna: 'AMP', count: 6, freq: 15.8 },
    { gene: 'CLNS1A', cytoband: '11q14.1', cna: 'AMP', count: 6, freq: 15.8 },
    { gene: 'CAPN5', cytoband: '11q13.5', cna: 'AMP', count: 6, freq: 15.8 }
  ];

  const treatments = [
    { treatment: 'Ipilimumab', count: 19 },
    { treatment: 'Pembrolizumab', count: 2 },
    { treatment: 'Nivolumab', count: 2 },
    { treatment: 'MK-3475', count: 2 },
    { treatment: 'MEKi/AKTi', count: 2 },
    { treatment: 'Vem/cobi', count: 1 }
  ];

  // Pie chart data
  const samplesPerPatient = [
    { label: '1', value: 31, color: '#1f77b4' },
    { label: '2', value: 5, color: '#ff7f0e' },
    { label: '3+', value: 2, color: '#d62728' }
  ];

  const sexData = [
    { label: 'Male', value: 21, color: '#1f77b4' },
    { label: 'Female', value: 13, color: '#ff69b4' }
  ];

  const raceData = [
    { label: 'White', value: 27, color: '#1f77b4' },
    { label: 'Other', value: 7, color: '#ff7f0e' },
    { label: 'Unknown', value: 4, color: '#2ca02c' }
  ];

  const sampleTypeData = [
    { label: 'Primary', value: 21, color: '#1f77b4' },
    { label: 'Metastasis', value: 17, color: '#d62728' }
  ];

  const adjuvantData = [
    { label: 'No', value: 21, color: '#ff7f0e' },
    { label: 'Yes', value: 10, color: '#2ca02c' },
    { label: 'Unknown', value: 7, color: '#1f77b4' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Acral Melanoma Dataset Overview</h2>
          <p className="text-slate-600">Comprehensive cancer genomics analysis dashboard</p>
        </div>
        <a href="#" className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
          <span>Study Page Help</span>
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </a>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        
        {/* Data Types */}
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <h3 className="text-lg font-medium text-slate-800 mb-4">Data Types</h3>
          <div className="space-y-2">
            {dataTypes.map((item, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-slate-100">
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span className="text-sm text-slate-700">{item.type}</span>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-slate-600">{item.count}</span>
                  <span className="text-slate-600">{item.freq}%</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
            />
          </div>
        </div>

        {/* KM Plots */}
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-slate-800">KM Plot: Overall (months)</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => zoomIn('overall')}
                className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                title="Zoom In"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </button>
              <button
                onClick={() => zoomOut('overall')}
                className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                title="Zoom Out"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                </svg>
              </button>
              <button
                onClick={() => resetZoom('overall')}
                className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                title="Reset Zoom"
              >
                Reset
              </button>
            </div>
          </div>
          <div className="h-64">
            <Plot
              data={[{
                x: survivalData.map(d => d.time),
                y: survivalData.map(d => d.survival * 100),
                type: 'scatter',
                mode: 'lines+markers',
                line: { shape: 'hv' },
                marker: { symbol: 'cross', size: 8 },
                name: 'Overall'
              }]}
              layout={{
                xaxis: { title: 'Time (months)', range: overallZoom.x },
                yaxis: { title: 'Survival Probability (%)', range: overallZoom.y },
                margin: { l: 60, r: 20, t: 20, b: 60 },
                showlegend: false
              }}
              config={{ displayModeBar: false }}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-slate-800">KM Plot: Disease Free (months)</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => zoomIn('diseaseFree')}
                className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                title="Zoom In"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </button>
              <button
                onClick={() => zoomOut('diseaseFree')}
                className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                title="Zoom Out"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                </svg>
              </button>
              <button
                onClick={() => resetZoom('diseaseFree')}
                className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                title="Reset Zoom"
              >
                Reset
              </button>
            </div>
          </div>
          <div className="h-64">
            <Plot
              data={[{
                x: [0, 6, 12, 18, 24, 30, 36, 42, 48, 54, 60, 66, 72, 78, 84, 90, 96, 102, 108, 114, 120, 126, 132, 138, 144, 150],
                y: [100, 95, 89, 82, 76, 71, 68, 65, 62, 59, 56, 53, 50, 47, 44, 41, 38, 35, 32, 29, 26, 23, 20, 17, 14, 11],
                type: 'scatter',
                mode: 'lines+markers',
                line: { shape: 'hv' },
                marker: { symbol: 'cross', size: 8 },
                name: 'Disease Free'
              }]}
              layout={{
                xaxis: { title: 'Time (months)', range: diseaseFreeZoom.x },
                yaxis: { title: 'Disease Free Probability (%)', range: diseaseFreeZoom.y },
                margin: { l: 60, r: 20, t: 20, b: 60 },
                showlegend: false
              }}
              config={{ displayModeBar: false }}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>

        {/* Mutated Genes */}
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <h3 className="text-lg font-medium text-slate-800 mb-4">Mutated Genes (38 profiled samples)</h3>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {mutatedGenes.map((gene, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-slate-100">
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm font-medium text-slate-700">{gene.gene}</span>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-slate-600">{gene.mutations}</span>
                  <span className="text-slate-600">{gene.samples}</span>
                  <span className="text-slate-600">{gene.freq}%</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
            />
          </div>
        </div>

        {/* Pie Charts Row */}
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <h3 className="text-lg font-medium text-slate-800 mb-4">Number of Samples Per Patient</h3>
          <div className="h-48">
            <Plot
              data={[{
                values: samplesPerPatient.map(d => d.value),
                labels: samplesPerPatient.map(d => d.label),
                type: 'pie',
                marker: { colors: samplesPerPatient.map(d => d.color) }
              }]}
              layout={{
                margin: { l: 20, r: 20, t: 20, b: 20 },
                showlegend: true
              }}
              config={{ displayModeBar: false }}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <h3 className="text-lg font-medium text-slate-800 mb-4">Sex</h3>
          <div className="h-48">
            <Plot
              data={[{
                values: sexData.map(d => d.value),
                labels: sexData.map(d => d.label),
                type: 'pie',
                marker: { colors: sexData.map(d => d.color) }
              }]}
              layout={{
                margin: { l: 20, r: 20, t: 20, b: 20 },
                showlegend: true
              }}
              config={{ displayModeBar: false }}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>

        {/* Mutation Count Chart */}
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <h3 className="text-lg font-medium text-slate-800 mb-4">Mutation Count</h3>
          <div className="h-48">
            <Plot
              data={[{
                x: ['≤25', '25', '50', '75', '100', '125', '150', '175', '200', '225', '250+'],
                y: [2, 4, 6, 8, 7, 5, 3, 2, 1, 1, 1],
                type: 'bar',
                marker: { color: '#1f77b4' }
              }]}
              layout={{
                xaxis: { title: 'Mutation Count' },
                yaxis: { title: 'Frequency' },
                margin: { l: 60, r: 20, t: 20, b: 60 }
              }}
              config={{ displayModeBar: false }}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          <div className="mt-2 text-sm text-slate-600">NA: 1</div>
        </div>

        {/* CNA Genes */}
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <h3 className="text-lg font-medium text-slate-800 mb-4">CNA Genes (38 profiled samples)</h3>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {cnaGenes.map((gene, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-slate-100">
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm font-medium text-slate-700">{gene.gene}</span>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-slate-600">{gene.cytoband}</span>
                  <span className="text-slate-600">{gene.cna}</span>
                  <span className="text-slate-600">{gene.count}</span>
                  <span className="text-slate-600">{gene.freq}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Treatment per Patient */}
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <h3 className="text-lg font-medium text-slate-800 mb-4">Treatment per Patient</h3>
          <div className="space-y-2">
            {treatments.map((treatment, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-slate-100">
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-slate-700">{treatment.treatment}</span>
                </div>
                <span className="text-sm text-slate-600">{treatment.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Pie Charts */}
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <h3 className="text-lg font-medium text-slate-800 mb-4">Race Category</h3>
          <div className="h-48">
            <Plot
              data={[{
                values: raceData.map(d => d.value),
                labels: raceData.map(d => d.label),
                type: 'pie',
                marker: { colors: raceData.map(d => d.color) }
              }]}
              layout={{
                margin: { l: 20, r: 20, t: 20, b: 20 },
                showlegend: true
              }}
              config={{ displayModeBar: false }}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <h3 className="text-lg font-medium text-slate-800 mb-4">Sample Type</h3>
          <div className="h-48">
            <Plot
              data={[{
                values: sampleTypeData.map(d => d.value),
                labels: sampleTypeData.map(d => d.label),
                type: 'pie',
                marker: { colors: sampleTypeData.map(d => d.color) }
              }]}
              layout={{
                margin: { l: 20, r: 20, t: 20, b: 20 },
                showlegend: true
              }}
              config={{ displayModeBar: false }}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <h3 className="text-lg font-medium text-slate-800 mb-4">Did patient start adjuvant postoperative treatment?</h3>
          <div className="h-48">
            <Plot
              data={[{
                values: adjuvantData.map(d => d.value),
                labels: adjuvantData.map(d => d.label),
                type: 'pie',
                marker: { colors: adjuvantData.map(d => d.color) }
              }]}
              layout={{
                margin: { l: 20, r: 20, t: 20, b: 20 },
                showlegend: true
              }}
              config={{ displayModeBar: false }}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default OverviewPage;