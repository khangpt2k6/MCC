import React from 'react';
import { Download } from 'lucide-react';

const Sidebar = ({ stats, onExportData }) => {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 min-h-screen">
      <div className="p-6">
        {/* Dataset Info */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Acral Melanoma Dataset</h3>
          <p className="text-sm text-slate-600">
            Whole exome sequencing and transcriptome analysis of 34 Acral Melanoma patients (33 with matched normals)
          </p>
        </div>

        {/* Stats Cards */}
        <div className="space-y-4 mb-6">
          <div className="bg-slate-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-slate-800">{stats.totalSamples}</div>
            <div className="text-sm text-slate-600">Total Samples</div>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-slate-800">{stats.totalMutations}</div>
            <div className="text-sm text-slate-600">Total Mutations</div>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-slate-800">{stats.mutatedSamples}</div>
            <div className="text-sm text-slate-600">Mutated Samples</div>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-slate-800">{stats.expressionSamples}</div>
            <div className="text-sm text-slate-600">Expression Samples</div>
          </div>
        </div>

        {/* Export Button */}
        <div className="mt-8">
          <button
            onClick={onExportData}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors text-sm font-medium"
          >
            <Download className="w-4 h-4" />
            <span>Export Data</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
