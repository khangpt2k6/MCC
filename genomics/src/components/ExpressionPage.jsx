import React from 'react';
import Plot from 'react-plotly.js';

const ExpressionPage = ({ expressions, selectedGenes, samples }) => {
  // Process expression data for heatmap
  const processExpressionData = () => {
    if (!expressions.length || !selectedGenes.length) return { z: [], x: [], y: [] };

    const sampleIds = [...new Set(expressions.map(e => e.sampleId))].slice(0, 20); // Limit to 20 samples
    const geneSymbols = selectedGenes.slice(0, 10); // Limit to 10 genes

    const z = geneSymbols.map(gene => 
      sampleIds.map(sampleId => {
        const expr = expressions.find(e => 
          e.gene?.hugoGeneSymbol === gene && e.sampleId === sampleId
        );
        return expr ? expr.value : 0;
      })
    );

    return {
      z,
      x: sampleIds,
      y: geneSymbols
    };
  };

  const heatmapData = processExpressionData();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Expression Analysis</h2>
        <p className="text-slate-600">Gene expression patterns across samples</p>
      </div>

      {/* Gene Selection */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-slate-800 mb-4">Gene Selection</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {['TP53', 'KRAS', 'PIK3CA', 'EGFR', 'BRAF', 'APC', 'PTEN', 'CDKN2A', 'MYC', 'RB1'].map(gene => (
            <label key={gene} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedGenes.includes(gene)}
                className="mr-2 w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-slate-700">{gene}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Expression Heatmap */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-slate-800 mb-4">Expression Heatmap</h3>
        <div className="h-96">
          {heatmapData.z.length > 0 ? (
            <Plot
              data={[{
                z: heatmapData.z,
                x: heatmapData.x,
                y: heatmapData.y,
                type: 'heatmap',
                colorscale: 'RdBu',
                reversescale: true,
                hovertemplate: 'Gene: %{y}<br>Sample: %{x}<br>Expression: %{z:.2f}<extra></extra>'
              }]}
              layout={{
                xaxis: { title: 'Samples' },
                yaxis: { title: 'Genes' },
                margin: { l: 80, r: 20, t: 20, b: 80 }
              }}
              config={{ displayModeBar: false }}
              style={{ width: '100%', height: '100%' }}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-slate-400">
              No expression data available
            </div>
          )}
        </div>
      </div>

      {/* Expression Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-slate-800 mb-4">Expression Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">Total Expression Values</span>
              <span className="text-sm font-medium text-slate-900">{expressions.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">Unique Genes</span>
              <span className="text-sm font-medium text-slate-900">
                {new Set(expressions.map(e => e.gene?.hugoGeneSymbol)).size}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">Unique Samples</span>
              <span className="text-sm font-medium text-slate-900">
                {new Set(expressions.map(e => e.sampleId)).size}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-slate-800 mb-4">Selected Genes</h3>
          <div className="space-y-2">
            {selectedGenes.map(gene => (
              <div key={gene} className="flex justify-between items-center py-1">
                <span className="text-sm text-slate-700">{gene}</span>
                <span className="text-xs text-slate-500">
                  {expressions.filter(e => e.gene?.hugoGeneSymbol === gene).length} values
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-slate-800 mb-4">Expression Range</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">Min Value</span>
              <span className="text-sm font-medium text-slate-900">
                {expressions.length > 0 ? Math.min(...expressions.map(e => e.value)).toFixed(2) : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">Max Value</span>
              <span className="text-sm font-medium text-slate-900">
                {expressions.length > 0 ? Math.max(...expressions.map(e => e.value)).toFixed(2) : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">Mean Value</span>
              <span className="text-sm font-medium text-slate-900">
                {expressions.length > 0 ? (expressions.reduce((sum, e) => sum + e.value, 0) / expressions.length).toFixed(2) : 'N/A'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpressionPage;
