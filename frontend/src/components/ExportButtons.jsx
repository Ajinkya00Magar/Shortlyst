import React from 'react';
import { Download, FileSpreadsheet, Printer } from 'lucide-react';
import { exportToCSV, exportToExcel, triggerPDFPrint } from '../utils/csvExport';

const ExportButtons = ({ rankedItems, teamMembers }) => {
  return (
    <div className="glass-panel p-5 border-slate-800 bg-slate-900/40 mb-8 no-print">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-white">Export Evaluations</h3>
          <p className="text-[10px] text-slate-400 mt-0.5">Download your team's evaluation data in multiple formats</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => exportToCSV(rankedItems, teamMembers)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600/20 border border-emerald-600/30 text-emerald-400 hover:bg-emerald-600/40 transition-all duration-200 text-xs font-semibold"
          >
            <Download size={14} />
            Export CSV
          </button>
          <button
            onClick={() => exportToExcel(rankedItems, teamMembers)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-isro-accent/20 border border-isro-accent/30 text-isro-accent hover:bg-isro-accent/40 transition-all duration-200 text-xs font-semibold"
          >
            <FileSpreadsheet size={14} />
            Export Excel
          </button>
          <button
            onClick={triggerPDFPrint}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-isro-orange/20 border border-isro-orange/30 text-isro-orange hover:bg-isro-orange/40 transition-all duration-200 text-xs font-semibold"
          >
            <Printer size={14} />
            Print / PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportButtons;
