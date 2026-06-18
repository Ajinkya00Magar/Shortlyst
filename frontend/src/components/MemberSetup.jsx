import React, { useState } from 'react';
import { Users, Check, Edit2 } from 'lucide-react';

const MemberSetup = ({ members, onUpdateMembers, isAdmin }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedMembers, setEditedMembers] = useState([...members]);

  const handleChange = (index, value) => {
    const updated = [...editedMembers];
    updated[index] = value;
    setEditedMembers(updated);
  };

  const handleSave = () => {
    const sanitized = editedMembers.map((name, i) => name.trim() || `Member ${i + 1}`);
    setEditedMembers(sanitized);
    onUpdateMembers(sanitized);
    setIsEditing(false);
  };

  return (
    <div className="glass-panel p-6 border-slate-800 bg-slate-900/50 mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-isro-orange/10 border border-isro-orange/20 text-isro-orange">
            <Users size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white leading-tight">Evaluation Team Settings</h2>
            <p className="text-xs text-slate-400">
              {isAdmin ? "Configure custom names for the 4 hackathon jury members" : "View the active jury evaluation panel (Owner locked)"}
            </p>
          </div>
        </div>
        
        {isAdmin && (
          <button
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold tracking-wide uppercase transition-all duration-200 ${
              isEditing
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            {isEditing ? (
              <>
                <Check size={14} /> Save Team Config
              </>
            ) : (
              <>
                <Edit2 size={14} /> Edit Member Names
              </>
            )}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {members.map((member, index) => (
          <div key={index} className="flex flex-col gap-1">
            <label className="text-[10px] text-slate-500 font-bold tracking-wider uppercase">Jury Member {index + 1}</label>
            {isEditing ? (
              <input
                type="text"
                value={editedMembers[index]}
                onChange={(e) => handleChange(index, e.target.value)}
                className="glass-input text-sm py-2 px-3 w-full bg-slate-950/80 border-slate-800 focus:border-isro-orange/40"
                maxLength={20}
                placeholder={`Member ${index + 1}`}
              />
            ) : (
              <div className="bg-slate-950/40 border border-slate-800/60 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-isro-orange animate-pulse"></span>
                {member}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemberSetup;
