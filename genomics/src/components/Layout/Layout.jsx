import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ stats, onExportData, children }) => {
  console.log('Layout component rendering', { stats });
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <div className="flex">
        <Sidebar stats={stats} onExportData={onExportData} />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
