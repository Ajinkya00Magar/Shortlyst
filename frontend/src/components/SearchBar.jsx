import React from 'react';
import { Search, Filter, RefreshCw } from 'lucide-react';

const SearchBar = ({ search, setSearch, activeFilter, setActiveFilter, totalCount, onReset, isAdmin }) => {
  const filterPills = [
    { id: 'all', label: 'All Statements' },
    { id: 'high-innovation', label: 'High Innovation (4★+)' },
    { id: 'low-difficulty', label: 'Low Difficulty (≤3★)' },
    { id: 'high-feasibility', label: 'High Feasibility (4★+)' },
    { id: 'top-rated', label: 'Top Rated (Score > 80)' },
    { id: 'most-agreed', label: 'Strong Consensus' },
  ];

  return (
    <div className="glass-panel p-6 border-slate-800 bg-slate-900/40 mb-8">
      <div className="flex flex-col md:flex-row gap-4 items-center mb-5">
        <div className="relative w-full md:flex-1">
          <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-500" size={18} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search problem statements by keyword, technology, category..."
            className="glass-input w-full pl-11 text-sm text-slate-100 bg-slate-950/70 border-slate-800"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto shrink-0 justify-end">
          <span className="text-xs text-slate-400 font-medium">
            Found <span className="text-isro-orange font-bold text-sm">{totalCount}</span> Match{totalCount !== 1 ? 'es' : ''}
          </span>
          {isAdmin && (
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-slate-800 bg-slate-950/50 hover:bg-slate-800/50 text-xs text-slate-400 hover:text-white transition-all duration-200"
              title="Reset ratings & evaluation configurations"
            >
              <RefreshCw size={13} />
              Reset All
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold uppercase tracking-wider">
          <Filter size={12} className="text-isro-orange" />
          <span>Priority Filter Overlays</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {filterPills.map((pill) => (
            <button
              key={pill.id}
              onClick={() => setActiveFilter(pill.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border ${
                activeFilter === pill.id
                  ? 'bg-gradient-to-r from-isro-orange to-amber-500 border-isro-orange text-slate-950 shadow-md shadow-isro-orange/10 font-bold'
                  : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-900/80 hover:border-slate-700'
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
