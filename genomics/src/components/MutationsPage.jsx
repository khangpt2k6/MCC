import React from 'react';
import Plot from 'react-plotly.js';

const MutationsPage = ({ mutations, selectedGene }) => {
  // Filter mutations for selected gene
  const geneMutations = mutations.filter(m => m.gene?.hugoGeneSymbol === selectedGene);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Mutation Analysis</h2>
        <p className="text-slate-600">Detailed analysis of genetic mutations in the dataset</p>
      </div>

      {/* Gene Selection */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-slate-800 mb-4">Gene Selection</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Selected Gene
            </label>
            <select className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="TP53">TP53</option>
              <option value="BRAF">BRAF</option>
              <option value="KRAS">KRAS</option>
              <option value="PIK3CA">PIK3CA</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Mutation Count
            </label>
            <div className="text-2xl font-bold text-slate-800">{geneMutations.length}</div>
          </div>
        </div>
      </div>

      {/* Lollipop Plot */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-slate-800 mb-4">
          Mutation Lollipop Plot - {selectedGene}
        </h3>
        <div className="h-96">
          {geneMutations.length > 0 ? (
            <Plot
              data={[{
                x: geneMutations.map((m, i) => m.proteinPosStart || i * 10),
                y: geneMutations.map((m, i) => i),
                type: 'scatter',
                mode: 'markers',
                marker: { 
                  size: 12, 
                  color: '#3b82f6',
                  line: { width: 2, color: '#1e40af' }
                },
                name: 'Mutations',
                hovertemplate: 'Position: %{x}<br>Mutation: %{text}<extra></extra>',
                text: geneMutations.map(m => m.proteinChange || 'Unknown')
              }]}
              layout={{
                xaxis: { title: 'Protein Position' },
                yaxis: { title: 'Mutation Index', showticklabels: false },
                margin: { l: 60, r: 20, t: 20, b: 60 },
                showlegend: false
              }}
              config={{ displayModeBar: false }}
              style={{ width: '100%', height: '100%' }}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-slate-400">
              No mutations found for {selectedGene}
            </div>
          )}
        </div>
      </div>

      {/* Mutation Table */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-slate-800 mb-4">Mutation Details</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Sample ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Protein Change
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Type
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {geneMutations.slice(0, 10).map((mutation, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    {mutation.sampleId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    {mutation.proteinChange || 'Unknown'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    {mutation.proteinPosStart || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    {mutation.mutationType || 'Unknown'}
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

export default MutationsPage;
