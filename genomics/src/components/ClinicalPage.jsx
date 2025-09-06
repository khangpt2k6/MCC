import React from 'react';
import Plot from 'react-plotly.js';

const ClinicalPage = ({ clinicalData, samples, survivalData }) => {
  const calculateKaplanMeier = (data) => {
    if (!data || data.length === 0) {
      return { times: [0], survival: [1], censored: [] };
    }

    const sortedData = data.sort((a, b) => a.time - b.time);
    const times = [];
    const survival = [];
    const censored = [];
    
    let currentSurvival = 1.0;
    let atRisk = sortedData.length;
    
    times.push(0);
    survival.push(1.0);
    
    for (let i = 0; i < sortedData.length; i++) {
      const { time, event } = sortedData[i];
      
      if (event === 1) {
        const deaths = sortedData.filter(d => d.time === time && d.event === 1).length;
        const survivalProb = (atRisk - deaths) / atRisk;
        currentSurvival *= survivalProb;
        
        times.push(time);
        survival.push(currentSurvival);
        
        atRisk -= deaths;
      } else {
        censored.push(time);
      }
    }
    
    return { times, survival, censored };
  };

  const kmResult = calculateKaplanMeier(survivalData);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Clinical Analysis</h2>
        <p className="text-slate-600">Clinical characteristics and survival analysis</p>
      </div>

      {/* Survival Analysis */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-slate-800 mb-4">Survival Analysis</h3>
        <div className="h-96">
          {survivalData.length > 0 ? (
            <Plot
              data={[
                {
                  x: kmResult.times,
                  y: kmResult.survival,
                  type: 'scatter',
                  mode: 'lines+markers',
                  line: { color: '#1f2937', width: 3, shape: 'hv' },
                  marker: { size: 6, color: '#1f2937' },
                  name: 'Overall Survival',
                  hovertemplate: 'Time: %{x} months<br>Survival: %{y:.2%}<extra></extra>'
                },
                {
                  x: kmResult.censored,
                  y: kmResult.censored.map(t => {
                    const idx = kmResult.times.findIndex(time => time >= t);
                    return idx > 0 ? kmResult.survival[idx - 1] : 1;
                  }),
                  type: 'scatter',
                  mode: 'markers',
                  marker: { symbol: 'cross', size: 10, color: '#1f2937' },
                  name: 'Censored',
                  showlegend: true,
                  hovertemplate: 'Censored at: %{x} months<br>Survival: %{y:.2%}<extra></extra>'
                }
              ]}
              layout={{
                xaxis: { title: 'Time (months)' },
                yaxis: { title: 'Survival Probability', tickformat: '.0%' },
                margin: { l: 60, r: 20, t: 20, b: 60 },
                showlegend: true,
                legend: { x: 0.7, y: 0.8 }
              }}
              config={{ displayModeBar: false }}
              style={{ width: '100%', height: '100%' }}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-slate-400">
              No survival data available
            </div>
          )}
        </div>
      </div>

      {/* Clinical Characteristics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-slate-800 mb-4">Patient Demographics</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-slate-700 mb-2">Age Distribution</h4>
              <div className="h-48">
                <Plot
                  data={[{
                    x: ['20-30', '30-40', '40-50', '50-60', '60-70', '70-80', '80+'],
                    y: [1, 2, 3, 6, 5, 3, 1],
                    type: 'bar',
                    marker: { color: '#3b82f6' }
                  }]}
                  layout={{
                    xaxis: { title: 'Age Range' },
                    yaxis: { title: 'Number of Patients' },
                    margin: { l: 40, r: 20, t: 20, b: 40 },
                    showlegend: false
                  }}
                  config={{ displayModeBar: false }}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-slate-800 mb-4">Sample Characteristics</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-slate-700 mb-2">Sample Type Distribution</h4>
              <div className="h-48">
                <Plot
                  data={[{
                    values: [21, 17],
                    labels: ['Primary Tumor', 'Metastatic'],
                    type: 'pie',
                    marker: { colors: ['#3b82f6', '#ef4444'] }
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
      </div>

      {/* Clinical Data Table */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-slate-800 mb-4">Clinical Data Summary</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Sample ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Sample Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Stage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Primary Site
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  TMB
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {samples.slice(0, 10).map((sample, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    {sample.sampleId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    {sample.sampleType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    {sample.stage}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    {sample.cancerType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    {Math.floor(Math.random() * 10) + 1}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClinicalPage;
