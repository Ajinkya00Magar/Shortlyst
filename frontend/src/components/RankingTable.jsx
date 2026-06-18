import React from 'react';
import { calculateLiveScore, calculateConsensus } from '../utils/scoring';
import { Trophy, ArrowUp, ArrowDown, Minus } from 'lucide-react';

const RankingTable = ({ rankedItems, teamMembers }) => {
  return (
    <div className="glass-panel p-6 border-slate-800 bg-slate-900/40 mb-8 overflow-hidden">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
          <Trophy size={20} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white leading-tight">Master Rankings Leaderboard</h2>
          <p className="text-xs text-slate-400">Live computed rankings based on weighted scoring formula</p>
        </div>
      </div>

      <div className="overflow-x-auto -mx-6 px-6">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-slate-800/80">
              <th className="text-left py-3 px-3 text-[10px] font-bold text-slate-500 tracking-wider uppercase">Rank</th>
              <th className="text-left py-3 px-3 text-[10px] font-bold text-slate-500 tracking-wider uppercase">ID</th>
              <th className="text-left py-3 px-3 text-[10px] font-bold text-slate-500 tracking-wider uppercase min-w-[200px]">Problem Statement</th>
              <th className="text-left py-3 px-3 text-[10px] font-bold text-slate-500 tracking-wider uppercase">Category</th>
              <th className="text-center py-3 px-3 text-[10px] font-bold text-slate-500 tracking-wider uppercase">Score</th>
              <th className="text-center py-3 px-3 text-[10px] font-bold text-slate-500 tracking-wider uppercase">Consensus</th>
              {teamMembers.map((m, i) => (
                <th key={i} className="text-center py-3 px-2 text-[10px] font-bold text-slate-500 tracking-wider uppercase whitespace-nowrap">{m}</th>
              ))}
              <th className="text-center py-3 px-2 text-[10px] font-bold text-slate-500 tracking-wider uppercase">Innov.</th>
              <th className="text-center py-3 px-2 text-[10px] font-bold text-slate-500 tracking-wider uppercase">Diff.</th>
              <th className="text-center py-3 px-2 text-[10px] font-bold text-slate-500 tracking-wider uppercase">Feas.</th>
            </tr>
          </thead>
          <tbody>
            {rankedItems.map((item) => {
              const consensus = calculateConsensus(item.teamRatings);
              const isTop3 = item.rank <= 3;
              const isTop5 = item.rank <= 5;

              return (
                <tr
                  key={item.id}
                  className={`border-b border-slate-800/30 transition-colors duration-150 ${
                    isTop3 ? 'bg-amber-500/5 hover:bg-amber-500/10' :
                    isTop5 ? 'bg-isro-orange/5 hover:bg-isro-orange/10' :
                    'hover:bg-slate-800/30'
                  }`}
                >
                  <td className="py-3 px-3">
                    <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-[10px] font-extrabold ${
                      item.rank === 1 ? 'bg-amber-400 text-slate-950' :
                      item.rank === 2 ? 'bg-slate-300 text-slate-950' :
                      item.rank === 3 ? 'bg-amber-700 text-white' :
                      'bg-slate-800 text-slate-400'
                    }`}>
                      {item.rank}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono text-isro-orange font-bold text-[10px]">{item.id}</td>
                  <td className="py-3 px-3">
                    <span className="text-slate-200 font-semibold leading-tight line-clamp-2">{item.title}</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-[10px] font-medium text-slate-400 bg-slate-950 px-2 py-0.5 rounded-full border border-slate-800/60 whitespace-nowrap">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="text-sm font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-isro-orange to-amber-400">
                      {item.score}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${consensus.color}`}>
                      {consensus.status} {consensus.label}
                    </span>
                  </td>
                  {item.teamRatings.map((r, i) => (
                    <td key={i} className="py-3 px-2 text-center text-slate-300 font-medium">
                      {r}★
                    </td>
                  ))}
                  <td className="py-3 px-2 text-center text-slate-300 font-medium">{item.metrics.innovation}★</td>
                  <td className="py-3 px-2 text-center text-rose-400 font-medium">{item.metrics.difficulty}★</td>
                  <td className="py-3 px-2 text-center text-emerald-400 font-medium">{item.metrics.feasibility}★</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RankingTable;
