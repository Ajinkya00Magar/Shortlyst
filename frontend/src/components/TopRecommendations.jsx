import React from 'react';
import { calculateConsensus } from '../utils/scoring';
import { Rocket, Star, TrendingUp, Zap, ShieldCheck } from 'lucide-react';

const TopRecommendations = ({ rankedItems }) => {
  const top5 = rankedItems.slice(0, 5);

  const getRecommendation = (rank) => {
    switch (rank) {
      case 1: return { label: "Flagship Recommendation", desc: "Highest composite score — Maximum strategic alignment with ISRO objectives and team capability.", icon: Rocket, gradient: "from-amber-400 to-orange-500" };
      case 2: return { label: "Strong Contender", desc: "Excellent scoring across all dimensions. A compelling alternative if the top pick encounters obstacles.", icon: Star, gradient: "from-slate-300 to-slate-400" };
      case 3: return { label: "High-Value Candidate", desc: "Balanced performance across innovation, feasibility, and impact metrics.", icon: TrendingUp, gradient: "from-amber-600 to-amber-800" };
      case 4: return { label: "Viable Shortlist Entry", desc: "Solid evaluation — strong in specific dimensions. Worth further discussion.", icon: Zap, gradient: "from-isro-accent to-blue-500" };
      case 5: return { label: "Honorable Mention", desc: "Demonstrates potential in key evaluation areas. Consider for strategic variety.", icon: ShieldCheck, gradient: "from-emerald-400 to-teal-500" };
      default: return { label: "Ranked", desc: "", icon: Star, gradient: "from-slate-500 to-slate-600" };
    }
  };

  return (
    <div className="glass-panel p-6 border-slate-800 bg-slate-900/40 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 rounded-xl bg-gradient-to-br from-isro-orange/20 to-amber-500/10 border border-isro-orange/20 text-isro-orange">
          <Rocket size={20} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white leading-tight">Top 5 Recommendations</h2>
          <p className="text-xs text-slate-400">AI-weighted recommendation engine based on team consensus and evaluation scores</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {top5.map((item) => {
          const rec = getRecommendation(item.rank);
          const consensus = calculateConsensus(item.teamRatings);
          const IconComp = rec.icon;

          return (
            <div
              key={item.id}
              className={`relative group bg-gradient-to-b from-slate-900/80 to-slate-950/95 border border-slate-800/80 rounded-2xl p-4 transition-all duration-300 hover:border-slate-700/80 hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] ${
                item.rank === 1 ? 'ring-1 ring-amber-400/30 shadow-[0_0_20px_rgba(251,191,36,0.1)]' : ''
              }`}
            >
              {/* Rank Medal */}
              <div className={`absolute -top-3 -right-2 w-8 h-8 rounded-full bg-gradient-to-br ${rec.gradient} flex items-center justify-center text-[10px] font-extrabold text-slate-950 shadow-lg`}>
                {item.rank}
              </div>

              <div className="flex items-center gap-2 mb-3">
                <IconComp size={14} className={`bg-gradient-to-r ${rec.gradient} bg-clip-text text-isro-orange`} />
                <span className="text-[9px] font-bold text-slate-400 tracking-widest uppercase">{rec.label}</span>
              </div>

              <h4 className="text-sm font-bold text-white leading-tight mb-1.5 line-clamp-2">{item.title}</h4>
              <span className="text-[9px] font-mono text-isro-orange">{item.id}</span>

              <div className="mt-3 pt-3 border-t border-slate-800/60 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] text-slate-500 font-bold uppercase">Score</span>
                  <span className="text-sm font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-isro-orange to-amber-400">{item.score}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[9px] text-slate-500 font-bold uppercase">Consensus</span>
                  <span className={`text-[9px] font-bold ${consensus.iconColor || 'text-slate-400'}`}>
                    {consensus.status} {consensus.label}
                  </span>
                </div>
              </div>

              <p className="mt-3 text-[9px] text-slate-500 leading-relaxed">{rec.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopRecommendations;
