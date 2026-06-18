import React from 'react';
import { calculateConsensus } from '../utils/scoring';
import { Columns, X, Star } from 'lucide-react';

const ComparisonMode = ({ comparedItems, onRemoveCompare, teamMembers }) => {
  if (!comparedItems || comparedItems.length < 2) {
    return (
      <div className="glass-panel p-6 border-slate-800 bg-slate-900/40 mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 rounded-xl bg-isro-accent/10 border border-isro-accent/20 text-isro-accent">
            <Columns size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white leading-tight">Comparison Matrix</h2>
            <p className="text-xs text-slate-400">Select at least 2 problem statements using the "Compare" checkbox to enable side-by-side analysis</p>
          </div>
        </div>
        <div className="text-center py-8 text-slate-500 text-sm">
          <Columns size={40} className="mx-auto mb-3 opacity-30" />
          <p>No statements selected for comparison yet.</p>
          <p className="text-xs mt-1">Use the <strong className="text-isro-orange">"Compare Statement"</strong> button on each card.</p>
        </div>
      </div>
    );
  }

  const metricKeys = [
    { key: 'innovation', label: 'Innovation', color: 'text-amber-400' },
    { key: 'difficulty', label: 'Difficulty', color: 'text-rose-400' },
    { key: 'feasibility', label: 'Feasibility', color: 'text-emerald-400' },
    { key: 'industryImpact', label: 'Industry Impact', color: 'text-blue-400' },
    { key: 'learningOpportunity', label: 'Learning Opportunity', color: 'text-purple-400' },
  ];

  return (
    <div className="glass-panel p-6 border-slate-800 bg-slate-900/40 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 rounded-xl bg-isro-accent/10 border border-isro-accent/20 text-isro-accent">
          <Columns size={20} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white leading-tight">Side-by-Side Comparison Matrix</h2>
          <p className="text-xs text-slate-400">Comparing {comparedItems.length} problem statements across all evaluation dimensions</p>
        </div>
      </div>

      <div className="overflow-x-auto -mx-6 px-6">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-slate-800/80">
              <th className="text-left py-3 px-3 text-[10px] font-bold text-slate-500 tracking-wider uppercase min-w-[150px]">Dimension</th>
              {comparedItems.map((item) => (
                <th key={item.id} className="py-3 px-3 text-center min-w-[180px]">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-isro-orange font-mono font-bold text-[10px]">{item.id}</span>
                    <button
                      onClick={() => onRemoveCompare(item.id)}
                      className="text-slate-600 hover:text-rose-400 transition-colors"
                    >
                      <X size={12} />
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-300 font-semibold mt-1 line-clamp-2">{item.title}</p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Rank Row */}
            <tr className="border-b border-slate-800/30 bg-amber-500/5">
              <td className="py-2.5 px-3 text-slate-400 font-bold uppercase text-[10px]">Rank</td>
              {comparedItems.map((item) => (
                <td key={item.id} className="py-2.5 px-3 text-center">
                  <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-[10px] font-extrabold ${
                    item.rank <= 3 ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {item.rank}
                  </span>
                </td>
              ))}
            </tr>

            {/* Score Row */}
            <tr className="border-b border-slate-800/30">
              <td className="py-2.5 px-3 text-slate-400 font-bold uppercase text-[10px]">Score</td>
              {comparedItems.map((item) => {
                const maxScore = Math.max(...comparedItems.map(i => i.score));
                return (
                  <td key={item.id} className="py-2.5 px-3 text-center">
                    <span className={`text-lg font-extrabold ${
                      item.score === maxScore ? 'text-transparent bg-clip-text bg-gradient-to-r from-isro-orange to-amber-400' : 'text-slate-300'
                    }`}>
                      {item.score}
                    </span>
                  </td>
                );
              })}
            </tr>

            {/* Consensus Row */}
            <tr className="border-b border-slate-800/30">
              <td className="py-2.5 px-3 text-slate-400 font-bold uppercase text-[10px]">Consensus</td>
              {comparedItems.map((item) => {
                const consensus = calculateConsensus(item.teamRatings);
                return (
                  <td key={item.id} className="py-2.5 px-3 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${consensus.color}`}>
                      {consensus.status} {consensus.label}
                    </span>
                  </td>
                );
              })}
            </tr>

            {/* Team Avg Row */}
            <tr className="border-b border-slate-800/30">
              <td className="py-2.5 px-3 text-slate-400 font-bold uppercase text-[10px]">Team Avg Rating</td>
              {comparedItems.map((item) => {
                const avg = (item.teamRatings.reduce((s, r) => s + r, 0) / item.teamRatings.length).toFixed(1);
                return (
                  <td key={item.id} className="py-2.5 px-3 text-center text-slate-200 font-semibold">
                    {avg} ★
                  </td>
                );
              })}
            </tr>

            {/* Individual Member Ratings */}
            {teamMembers.map((member, idx) => (
              <tr key={idx} className="border-b border-slate-800/20">
                <td className="py-2 px-3 text-slate-500 text-[10px]">{member}</td>
                {comparedItems.map((item) => {
                  const maxRating = Math.max(...comparedItems.map(i => i.teamRatings[idx]));
                  return (
                    <td key={item.id} className="py-2 px-3 text-center">
                      <span className={`font-medium ${
                        item.teamRatings[idx] === maxRating ? 'text-isro-orange font-bold' : 'text-slate-400'
                      }`}>
                        {item.teamRatings[idx]}★
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}

            {/* Metric Rows */}
            {metricKeys.map(({ key, label, color }) => (
              <tr key={key} className="border-b border-slate-800/20">
                <td className="py-2.5 px-3 text-slate-400 font-bold uppercase text-[10px]">{label}</td>
                {comparedItems.map((item) => {
                  const maxVal = Math.max(...comparedItems.map(i => i.metrics[key]));
                  const isMax = item.metrics[key] === maxVal;
                  return (
                    <td key={item.id} className="py-2.5 px-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <span className={`font-semibold ${isMax ? color + ' font-extrabold' : 'text-slate-400'}`}>
                          {item.metrics[key]}
                        </span>
                        <Star size={10} className={isMax ? color : 'text-slate-600'} />
                      </div>
                      {/* Visual bar */}
                      <div className="mt-1 mx-auto w-full max-w-[80px] h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            key === 'difficulty' ? 'bg-rose-500' : 'bg-isro-orange'
                          }`}
                          style={{ width: `${(item.metrics[key] / 5) * 100}%` }}
                        />
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparisonMode;
