import React, { useState } from 'react';
import StarRating from './StarRating';
import { calculateLiveScore, calculateConsensus } from '../utils/scoring';
import { ChevronDown, ChevronUp, Plus, Minus, Info, BrainCircuit, AlertTriangle, Lightbulb } from 'lucide-react';

const ProblemCard = ({ item, rank, teamMembers, currentUser, onUpdateRatings, onUpdateMetrics, onUpdateField, isCompared, onToggleCompare }) => {
  const [isOpen, setIsOpen] = useState(false);
  const score = calculateLiveScore(item, teamMembers);
  const consensus = calculateConsensus(item.teamRatings);

  const [newPro, setNewPro] = useState("");
  const [newCon, setNewCon] = useState("");

  const handleRatingChange = (memberIdx, rating) => {
    const updated = [...item.teamRatings];
    updated[memberIdx] = rating;
    onUpdateRatings(item.id, updated);
  };

  const handleMetricChange = (metricKey, rating) => {
    const memberMetrics = item.memberMetrics || {};
    const currentUserMetrics = memberMetrics[currentUser] || {};
    const updatedUserMetrics = {
      ...currentUserMetrics,
      [metricKey]: rating
    };
    const updatedMemberMetrics = {
      ...memberMetrics,
      [currentUser]: updatedUserMetrics
    };
    onUpdateField(item.id, 'memberMetrics', updatedMemberMetrics);
  };

  const handleListAdd = (listType, value, setter) => {
    if (!value.trim()) return;
    const currentList = item[listType] || [];
    const updated = [...currentList, value.trim()];
    onUpdateField(item.id, listType, updated);
    setter("");
  };

  const handleListRemove = (listType, idx) => {
    const currentList = item[listType] || [];
    const updated = currentList.filter((_, i) => i !== idx);
    onUpdateField(item.id, listType, updated);
  };

  const isTopRanked = rank <= 5;

  return (
    <div className={`glass-card glass-panel-hover p-6 border-slate-800/80 relative transition-all duration-300 overflow-hidden ${
      isCompared ? 'ring-2 ring-isro-orange/50 shadow-[0_0_25px_rgba(255,153,51,0.15)] bg-slate-900/80' : ''
    }`}>
      {/* Dynamic Rank Badge Tag */}
      <div className={`absolute top-0 right-0 px-4 py-1.5 rounded-bl-2xl text-[10px] font-extrabold tracking-widest uppercase flex items-center gap-1 ${
        rank === 1 ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/25' :
        rank === 2 ? 'bg-slate-300 text-slate-950' :
        rank === 3 ? 'bg-amber-700 text-white' :
        isTopRanked ? 'bg-isro-orange/20 text-isro-orange border border-isro-orange/30' :
        'bg-slate-950 text-slate-400'
      }`}>
        {rank === 1 && "🥇 "}
        {rank === 2 && "🥈 "}
        {rank === 3 && "🥉 "}
        Rank {rank}
      </div>

      {/* Main Header Row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-800/60 mb-5 pr-20 lg:pr-0">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-xs font-mono font-bold text-isro-orange tracking-widest bg-isro-orange/10 border border-isro-orange/25 px-2 py-0.5 rounded">
              {item.id}
            </span>
            <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400 bg-slate-950 px-2.5 py-0.5 rounded-full border border-slate-800/60">
              {item.category}
            </span>
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight leading-snug">{item.title}</h3>
          <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
        </div>

        {/* Scoring & Consensus Indicators */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="text-right">
            <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase block">Normalized Score</span>
            <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-isro-orange to-amber-400">
              {score}<span className="text-xs text-slate-400 font-medium">/100</span>
            </span>
          </div>
          <div className="w-px h-10 bg-slate-800"></div>
          <div>
            <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase block mb-1">Team Align</span>
            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border flex items-center gap-1.5 ${consensus.color}`}>
              <span>{consensus.status}</span> {consensus.label}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
        {/* Left Col: Team Member Ratings */}
        <div className="space-y-3 bg-slate-950/40 p-4 rounded-xl border border-slate-900">
          <h4 className="text-xs font-bold text-slate-400 tracking-wider uppercase flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-isro-orange"></span>
            Member Ratings (Interest Scale)
          </h4>
          <div className="space-y-2.5">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="flex justify-between items-center bg-slate-900/30 px-3 py-1.5 rounded-lg border border-slate-800/40">
                <span className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                  {member}
                  {member === currentUser && (
                    <span className="text-[9px] font-bold text-isro-orange bg-isro-orange/10 border border-isro-orange/20 px-1.5 py-0.2 rounded">
                      You
                    </span>
                  )}
                </span>
                <StarRating
                  rating={item.teamRatings[idx]}
                  onChange={(rating) => handleRatingChange(idx, rating)}
                  readonly={member !== currentUser}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Priority Evaluation Metrics */}
        <div className="space-y-3 bg-slate-950/40 p-4 rounded-xl border border-slate-900">
          <h4 className="text-xs font-bold text-slate-400 tracking-wider uppercase flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-isro-accent animate-pulse"></span>
            Core Evaluation Factors
          </h4>
          <div className="space-y-2">
            {[
              { key: 'innovation', label: 'Innovation Matrix' },
              { key: 'difficulty', label: 'Difficulty Overhead' },
              { key: 'feasibility', label: 'Timeline Feasibility' },
              { key: 'industryImpact', label: 'Strategic Impact' },
              { key: 'learningOpportunity', label: 'Learning Velocity' },
            ].map(({ key, label }) => {
              const memberMetrics = item.memberMetrics || {};
              const currentUserMetrics = memberMetrics[currentUser] || {};
              const ratingValue = currentUserMetrics[key] !== undefined ? currentUserMetrics[key] : 3;
              const avgValue = item.metrics[key] !== undefined ? item.metrics[key] : 3;

              return (
                <div key={key} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-900/20 px-3 py-1.5 rounded-lg border border-slate-800/20">
                  <div className="flex items-center justify-between sm:justify-start gap-2 flex-1">
                    <span className="text-xs text-slate-300">{label}</span>
                    <span className="text-[10px] text-slate-500 bg-slate-950/50 border border-slate-800/40 px-1.5 py-0.5 rounded font-mono">
                      Avg: {avgValue}★
                    </span>
                  </div>
                  <StarRating
                    rating={ratingValue}
                    onChange={(rating) => handleMetricChange(key, rating)}
                    activeColor={key === 'difficulty' ? "text-rose-400 fill-rose-400" : "text-amber-400 fill-amber-400"}
                    inactiveColor={key === 'difficulty' ? "text-slate-600 hover:text-rose-500/70" : "text-slate-600 hover:text-amber-500/70"}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Accordion Footer Options */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 pt-3 border-t border-slate-800/50">
        <button
          onClick={() => onToggleCompare(item.id)}
          className={`flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold rounded-xl border transition-all duration-200 ${
            isCompared
              ? 'bg-isro-orange/20 border-isro-orange/50 text-isro-orange'
              : 'border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300 bg-slate-950/40'
          }`}
        >
          <input
            type="checkbox"
            checked={isCompared}
            onChange={() => {}}
            className="rounded border-slate-800 accent-isro-orange h-3.5 w-3.5 pointer-events-none"
          />
          Compare Statement
        </button>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white bg-slate-900/50 hover:bg-slate-800 border border-slate-800 transition-all duration-200"
        >
          {isOpen ? (
            <>
              Hide Notes & SWOT <ChevronUp size={14} />
            </>
          ) : (
            <>
              Expand Notes & SWOT <ChevronDown size={14} />
            </>
          )}
        </button>
      </div>

      {/* Accordion Drawer Content */}
      {isOpen && (
        <div className="mt-5 pt-5 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Notes Section */}
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-bold text-slate-400 tracking-wider uppercase flex items-center gap-2 mb-2">
                <Info size={12} className="text-isro-accent" /> Team Discussion Notes
              </h4>
              <textarea
                value={item.notes || ""}
                onChange={(e) => onUpdateField(item.id, 'notes', e.target.value)}
                className="glass-input w-full text-xs min-h-[80px] resize-y bg-slate-950/60"
                placeholder="Add team discussion notes here..."
              />
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-400 tracking-wider uppercase flex items-center gap-2 mb-2">
                <Lightbulb size={12} className="text-isro-gold" /> Creative Ideas
              </h4>
              <textarea
                value={item.ideas || ""}
                onChange={(e) => onUpdateField(item.id, 'ideas', e.target.value)}
                className="glass-input w-full text-xs min-h-[60px] resize-y bg-slate-950/60"
                placeholder="Brainstorm implementation ideas..."
              />
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-400 tracking-wider uppercase flex items-center gap-2 mb-2">
                <AlertTriangle size={12} className="text-rose-400" /> Key Challenges
              </h4>
              <textarea
                value={item.challenges || ""}
                onChange={(e) => onUpdateField(item.id, 'challenges', e.target.value)}
                className="glass-input w-full text-xs min-h-[60px] resize-y bg-slate-950/60"
                placeholder="Identify key challenges and risks..."
              />
            </div>
          </div>

          {/* Pros & Cons Lists */}
          <div className="space-y-4">
            {/* Pros */}
            <div>
              <h4 className="text-xs font-bold text-emerald-400 tracking-wider uppercase flex items-center gap-2 mb-2">
                <Plus size={12} /> Strengths / Pros
              </h4>
              <div className="space-y-1.5 mb-2">
                {(item.pros || []).map((pro, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-emerald-950/20 border border-emerald-900/30 rounded-lg px-3 py-1.5 group">
                    <span className="text-xs text-emerald-300">{pro}</span>
                    <button
                      onClick={() => handleListRemove('pros', idx)}
                      className="text-slate-600 hover:text-rose-400 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Minus size={12} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newPro}
                  onChange={(e) => setNewPro(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleListAdd('pros', newPro, setNewPro)}
                  className="glass-input flex-1 text-xs py-1.5 bg-slate-950/60"
                  placeholder="Add a pro..."
                />
                <button
                  onClick={() => handleListAdd('pros', newPro, setNewPro)}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600/20 border border-emerald-600/30 text-emerald-400 hover:bg-emerald-600/40 transition-all text-xs"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Cons */}
            <div>
              <h4 className="text-xs font-bold text-rose-400 tracking-wider uppercase flex items-center gap-2 mb-2">
                <Minus size={12} /> Weaknesses / Cons
              </h4>
              <div className="space-y-1.5 mb-2">
                {(item.cons || []).map((con, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-rose-950/20 border border-rose-900/30 rounded-lg px-3 py-1.5 group">
                    <span className="text-xs text-rose-300">{con}</span>
                    <button
                      onClick={() => handleListRemove('cons', idx)}
                      className="text-slate-600 hover:text-rose-400 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Minus size={12} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newCon}
                  onChange={(e) => setNewCon(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleListAdd('cons', newCon, setNewCon)}
                  className="glass-input flex-1 text-xs py-1.5 bg-slate-950/60"
                  placeholder="Add a con..."
                />
                <button
                  onClick={() => handleListAdd('cons', newCon, setNewCon)}
                  className="px-3 py-1.5 rounded-xl bg-rose-600/20 border border-rose-600/30 text-rose-400 hover:bg-rose-600/40 transition-all text-xs"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProblemCard;
