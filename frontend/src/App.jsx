import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { computeRankings, calculateLiveScore, calculateConsensus, getAverageMetrics } from './utils/scoring';
import { 
  fetchProblemStatements, 
  updateProblemStatement, 
  fetchTeamMembers, 
  updateTeamMembers, 
  resetDatabase 
} from './utils/api';

import MemberSetup from './components/MemberSetup';
import SearchBar from './components/SearchBar';
import ProblemCard from './components/ProblemCard';
import RankingTable from './components/RankingTable';
import TopRecommendations from './components/TopRecommendations';
import ExportButtons from './components/ExportButtons';
import ComparisonMode from './components/ComparisonMode';
import AnalyticsDashboard from './components/AnalyticsDashboard';

import { Rocket, BarChart3, Trophy, Layers, ListChecks, GitCompare, ChevronUp, RefreshCw } from 'lucide-react';

const App = () => {
  const [problemStatements, setProblemStatements] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [comparedIds, setComparedIds] = useState([]);
  const [activeTab, setActiveTab] = useState('cards');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayOrder, setDisplayOrder] = useState([]);
  
  const [currentUser, setCurrentUser] = useState(() => localStorage.getItem("isro_eval_current_user") || null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [pendingUser, setPendingUser] = useState(null);
  const [authError, setAuthError] = useState(false);

  const handleUserChange = (user) => {
    if (user === "Ajinkya Magar") {
      const isAuthed = sessionStorage.getItem("isro_eval_admin_auth") === "true";
      if (!isAuthed) {
        setPendingUser(user);
        setShowPasswordModal(true);
        setPasswordValue("");
        setAuthError(false);
        return;
      }
    }
    setCurrentUser(user);
    localStorage.setItem("isro_eval_current_user", user);
  };

  const handlePasswordSubmit = () => {
    if (passwordValue === "AJ") {
      sessionStorage.setItem("isro_eval_admin_auth", "true");
      setCurrentUser(pendingUser);
      localStorage.setItem("isro_eval_current_user", pendingUser);
      setShowPasswordModal(false);
      setPendingUser(null);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handlePasswordCancel = () => {
    setShowPasswordModal(false);
    setPendingUser(null);
    setAuthError(false);
    const selectEl = document.querySelector("#jury-selector");
    if (selectEl) selectEl.value = currentUser;
  };

  // Load initial data from SQLite via Backend APIs
  useEffect(() => {
    let active = true;
    const loadData = async () => {
      try {
        setLoading(true);
        const [statements, members] = await Promise.all([
          fetchProblemStatements(),
          fetchTeamMembers()
        ]);
        if (active) {
          setProblemStatements(statements);
          setTeamMembers(members);
          const ranked = computeRankings(statements);
          setDisplayOrder(ranked.map(item => item.id));
          setError(null);
        }
      } catch (err) {
        console.error("Error loading data from backend:", err);
        if (active) {
          setError("Could not connect to the database. Make sure the backend server is running.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };
    loadData();
    return () => { active = false; };
  }, []);

  // Scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Compute rankings
  const rankedItems = useMemo(() => computeRankings(problemStatements, teamMembers), [problemStatements, teamMembers]);

  // Filter and search
  const filteredItems = useMemo(() => {
    let items = rankedItems;

    // Text search
    if (search.trim()) {
      const lowerSearch = search.toLowerCase();
      items = items.filter(item =>
        item.title.toLowerCase().includes(lowerSearch) ||
        item.id.toLowerCase().includes(lowerSearch) ||
        item.category.toLowerCase().includes(lowerSearch) ||
        item.description.toLowerCase().includes(lowerSearch) ||
        (item.notes && item.notes.toLowerCase().includes(lowerSearch))
      );
    }

    // Filter pills
    switch (activeFilter) {
      case 'high-innovation':
        items = items.filter(i => i.metrics.innovation >= 4);
        break;
      case 'low-difficulty':
        items = items.filter(i => i.metrics.difficulty <= 3);
        break;
      case 'high-feasibility':
        items = items.filter(i => i.metrics.feasibility >= 4);
        break;
      case 'top-rated':
        items = items.filter(i => i.score > 80);
        break;
      case 'most-agreed':
        items = items.filter(i => calculateConsensus(i.teamRatings).label === "Strong Consensus");
        break;
      default:
        break;
    }

    return items;
  }, [rankedItems, search, activeFilter]);

  // Compared items
  const comparedItems = useMemo(() => {
    return rankedItems.filter(item => comparedIds.includes(item.id));
  }, [rankedItems, comparedIds]);

  // Keep display order stable while filtering/searching
  const sortedFilteredItems = useMemo(() => {
    if (displayOrder.length === 0) return filteredItems;
    return [...filteredItems].sort((a, b) => {
      const indexA = displayOrder.indexOf(a.id);
      const indexB = displayOrder.indexOf(b.id);
      return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
    });
  }, [filteredItems, displayOrder]);

  // Check if live rankings differ from current display order
  const hasPendingOrderChanges = useMemo(() => {
    if (problemStatements.length === 0 || displayOrder.length === 0) return false;
    const currentRankedIds = rankedItems.map(item => item.id);
    for (let i = 0; i < currentRankedIds.length; i++) {
      if (currentRankedIds[i] !== displayOrder[i]) {
        return true;
      }
    }
    return false;
  }, [rankedItems, displayOrder, problemStatements]);

  // Handlers
  const handleUpdateRatings = useCallback((id, newRatings) => {
    setProblemStatements(prev =>
      prev.map(item => item.id === id ? { ...item, teamRatings: newRatings } : item)
    );
    updateProblemStatement(id, { teamRatings: newRatings }).catch(err => {
      console.error("Failed to update ratings on server:", err);
    });
  }, []);

  const handleUpdateMetrics = useCallback((id, newMetrics) => {
    setProblemStatements(prev =>
      prev.map(item => item.id === id ? { ...item, metrics: newMetrics } : item)
    );
    updateProblemStatement(id, { metrics: newMetrics }).catch(err => {
      console.error("Failed to update metrics on server:", err);
    });
  }, []);

  const handleUpdateField = useCallback((id, field, value) => {
    setProblemStatements(prev =>
      prev.map(item => {
        if (item.id === id) {
          const updated = { ...item, [field]: value };
          if (field === 'memberMetrics') {
            const avg = getAverageMetrics(value, teamMembers);
            updated.metrics = avg;
          }
          return updated;
        }
        return item;
      })
    );
    updateProblemStatement(id, { [field]: value }).catch(err => {
      console.error(`Failed to update field ${field} on server:`, err);
    });
  }, [teamMembers]);

  const handleToggleCompare = useCallback((id) => {
    setComparedIds(prev =>
      prev.includes(id) ? prev.filter(cid => cid !== id) : [...prev, id]
    );
  }, []);

  const handleRemoveCompare = useCallback((id) => {
    setComparedIds(prev => prev.filter(cid => cid !== id));
  }, []);

  const handleReset = useCallback(async () => {
    if (window.confirm("This will reset ALL ratings, notes, and criteria in the database. This action cannot be undone. Continue?")) {
      try {
        setLoading(true);
        await resetDatabase();
        const [statements, members] = await Promise.all([
          fetchProblemStatements(),
          fetchTeamMembers()
        ]);
        setProblemStatements(statements);
        setTeamMembers(members);
        const ranked = computeRankings(statements);
        setDisplayOrder(ranked.map(item => item.id));
        setComparedIds([]);
        setSearch('');
        setActiveFilter('all');
        setError(null);
      } catch (err) {
        console.error("Failed to reset database:", err);
        setError("Failed to reset the database. Please verify the backend is running.");
      } finally {
        setLoading(false);
      }
    }
  }, []);

  const handleUpdateMembers = useCallback((newMembers) => {
    setTeamMembers(newMembers);
    updateTeamMembers(newMembers).catch(err => {
      console.error("Failed to update team members on server:", err);
    });
  }, []);

  const tabs = [
    { id: 'cards', label: 'Evaluation Cards', icon: ListChecks },
    { id: 'rankings', label: 'Rankings', icon: Trophy },
    { id: 'recommendations', label: 'Top Picks', icon: Rocket },
    { id: 'compare', label: `Compare (${comparedIds.length})`, icon: GitCompare },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6">
        <div className="p-3 rounded-2xl bg-gradient-to-br from-isro-orange/20 to-amber-600/10 border border-isro-orange/25 animate-pulse mb-4">
          <Rocket size={40} className="text-isro-orange animate-bounce" />
        </div>
        <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-isro-orange to-isro-gold animate-pulse">
          Connecting to ISRO Evaluation Engine...
        </h2>
        <p className="text-xs text-slate-500 mt-2 font-mono">Loading data from SQLite Database...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
        <div className="p-4 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 mb-4 animate-pulse">
          <Rocket size={40} className="rotate-180 text-red-500" />
        </div>
        <h2 className="text-xl font-bold text-red-400 mb-2">Connection Failure</h2>
        <p className="text-sm text-slate-400 mb-6">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-isro-orange to-amber-600 text-slate-950 font-bold hover:brightness-110 transition-all duration-200 shadow-lg shadow-isro-orange/20"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      {/* Password Modal for Owner Authentication */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 no-print">
          <div className="glass-panel p-6 border-slate-800 bg-slate-900/95 max-w-sm w-full shadow-2xl relative animate-fade-in animate-pulse-glow">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <span className="text-amber-400">👑</span> Owner Authentication
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Enter password to switch to **Ajinkya Magar** (Owner / Admin).
            </p>
            
            <input
              type="password"
              value={passwordValue}
              onChange={(e) => {
                setPasswordValue(e.target.value);
                setAuthError(false);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handlePasswordSubmit();
              }}
              placeholder="Enter password..."
              className="glass-input w-full text-sm py-2 px-3 bg-slate-950/80 border-slate-800 focus:border-amber-500/40 mb-3"
              autoFocus
            />
            
            {authError && (
              <p className="text-[11px] text-rose-400 font-semibold mb-3">
                ❌ Incorrect Password!
              </p>
            )}
            
            <div className="flex gap-3 justify-end mt-4">
              <button
                onClick={handlePasswordCancel}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white bg-slate-800/40 border border-slate-800/60 hover:bg-slate-800 transition-all duration-150"
              >
                Cancel
              </button>
              <button
                onClick={handlePasswordSubmit}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-isro-orange to-amber-500 hover:brightness-110 shadow-lg shadow-isro-orange/20 transition-all duration-150"
              >
                Authenticate
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Header */}
      <header className="sticky top-0 z-50 glass-panel border-x-0 border-t-0 rounded-none backdrop-blur-2xl bg-slate-950/80 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-isro-orange/20 to-amber-600/10 border border-isro-orange/25 animate-pulse-glow">
                <Rocket size={28} className="text-isro-orange" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-isro-orange via-amber-400 to-isro-gold tracking-tight">
                  ISRO Bharatiya Antariksh Hackathon 2026
                </h1>
                <p className="text-[10px] md:text-xs text-slate-400 font-medium tracking-wide">
                  Problem Statement Evaluation & Shortlisting Platform — Team Decision Engine
                </p>
              </div>
            </div>

            {/* Tab Navigation & Active Jury Member Selector */}
            <div className="flex flex-wrap items-center gap-3 justify-end">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs shadow-inner">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1">
                  {currentUser === "Ajinkya Magar" && <span className="text-amber-400">👑</span>}
                  Jury member:
                </span>
                <select
                  id="jury-selector"
                  value={currentUser || ""}
                  onChange={(e) => handleUserChange(e.target.value)}
                  className="bg-transparent text-slate-200 font-bold focus:outline-none border-none cursor-pointer pr-1"
                >
                  {!currentUser && (
                    <option value="" disabled className="bg-slate-950 text-slate-500 font-semibold">
                      — Select Member —
                    </option>
                  )}
                  {teamMembers.map((member, i) => (
                    <option key={i} value={member} className="bg-slate-950 text-slate-100 font-semibold">
                      {member} {member === "Ajinkya Magar" ? "👑 (Owner)" : ""}
                    </option>
                  ))}
                </select>
              </div>

              <nav className="flex flex-wrap gap-1.5">
                {tabs.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border ${
                      activeTab === id
                        ? 'bg-gradient-to-r from-isro-orange/20 to-amber-600/10 border-isro-orange/40 text-isro-orange shadow-md shadow-isro-orange/5'
                        : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <Icon size={13} />
                    <span className="hidden sm:inline">{label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Gate Overlay — shown when no user is selected */}
      {!currentUser && (
        <div className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-xl flex items-center justify-center">
          <div className="glass-panel p-8 md:p-12 max-w-md w-full mx-4 text-center border-slate-700/60 shadow-2xl">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-isro-orange/20 to-amber-600/10 border border-isro-orange/25 w-fit mx-auto mb-6 animate-pulse-glow">
              <Rocket size={40} className="text-isro-orange" />
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-isro-orange via-amber-400 to-isro-gold mb-2">
              ISRO Hackathon Evaluator
            </h2>
            <p className="text-xs text-slate-400 mb-8">
              Select your jury member identity to begin evaluating problem statements.
            </p>
            <div className="space-y-3">
              {teamMembers.map((member, i) => (
                <button
                  key={i}
                  onClick={() => handleUserChange(member)}
                  className="w-full flex items-center justify-between px-5 py-3 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800/80 hover:border-isro-orange/30 text-slate-200 text-sm font-semibold transition-all duration-200 group"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-gradient-to-br from-isro-orange/30 to-amber-600/20 flex items-center justify-center text-xs font-black text-isro-orange border border-isro-orange/20">
                      {member.split(' ').map(n => n[0]).join('')}
                    </span>
                    {member}
                  </span>
                  {member === "Ajinkya Magar" && <span className="text-amber-400 text-xs">👑 Owner</span>}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-slate-600 mt-6">
              Your selection is stored locally. You can switch members from the header.
            </p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Team Setup — always visible */}
        <MemberSetup members={teamMembers} onUpdateMembers={handleUpdateMembers} isAdmin={currentUser === "Ajinkya Magar"} />

        {/* Export Buttons — always visible */}
        <ExportButtons rankedItems={rankedItems} teamMembers={teamMembers} />

        {/* Search & Filter — visible on cards tab */}
        {activeTab === 'cards' && (
          <>
            <SearchBar
              search={search}
              setSearch={setSearch}
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
              totalCount={filteredItems.length}
              onReset={handleReset}
              isAdmin={currentUser === "Ajinkya Magar"}
            />

            {/* Pending Rank Changes Banner */}
            {hasPendingOrderChanges && (
              <div className="glass-panel p-4 mb-6 border-amber-500/30 bg-amber-950/20 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in no-print animate-pulse-glow">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                    <GitCompare size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-200">Rankings Updated</h4>
                    <p className="text-xs text-slate-400">Some problem statements have changed ranks based on your scores.</p>
                  </div>
                </div>
                <button
                  onClick={() => setDisplayOrder(rankedItems.map(item => item.id))}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-isro-orange to-amber-500 text-slate-950 text-xs font-extrabold hover:brightness-110 shadow-lg shadow-isro-orange/20 transition-all duration-200 shrink-0"
                >
                  <RefreshCw size={13} className="animate-spin-slow" />
                  Apply & Re-sort Cards
                </button>
              </div>
            )}

            {/* Problem Cards */}
            <div className="space-y-6">
              {sortedFilteredItems.length === 0 ? (
                <div className="glass-panel p-12 text-center border-slate-800">
                  <Layers size={48} className="mx-auto mb-4 text-slate-700" />
                  <h3 className="text-lg font-bold text-slate-400 mb-2">No Matching Statements</h3>
                  <p className="text-xs text-slate-500">Try adjusting your search query or filter selection.</p>
                </div>
              ) : (
                sortedFilteredItems.map((item) => (
                  <ProblemCard
                    key={item.id}
                    item={item}
                    rank={item.rank}
                    teamMembers={teamMembers}
                    currentUser={currentUser}
                    onUpdateRatings={handleUpdateRatings}
                    onUpdateMetrics={handleUpdateMetrics}
                    onUpdateField={handleUpdateField}
                    isCompared={comparedIds.includes(item.id)}
                    onToggleCompare={handleToggleCompare}
                  />
                ))
              )}
            </div>
          </>
        )}

        {/* Rankings Tab */}
        {activeTab === 'rankings' && (
          <RankingTable rankedItems={rankedItems} teamMembers={teamMembers} />
        )}

        {/* Recommendations Tab */}
        {activeTab === 'recommendations' && (
          <TopRecommendations rankedItems={rankedItems} />
        )}

        {/* Comparison Tab */}
        {activeTab === 'compare' && (
          <ComparisonMode
            comparedItems={comparedItems}
            onRemoveCompare={handleRemoveCompare}
            teamMembers={teamMembers}
          />
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <AnalyticsDashboard rankedItems={rankedItems} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 mt-16 py-8 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[10px] text-slate-600 font-medium">
            ISRO Bharatiya Antariksh Hackathon 2026 — Problem Statement Evaluation Platform
          </p>
          <p className="text-[9px] text-slate-700 mt-1">
            Built for collaborative team decision-making. All evaluations auto-saved locally.
          </p>
        </div>
      </footer>

      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 p-3 rounded-full bg-isro-orange/90 text-slate-950 shadow-lg shadow-isro-orange/25 hover:bg-isro-orange transition-all duration-200 z-50 no-print"
          aria-label="Scroll to top"
        >
          <ChevronUp size={20} />
        </button>
      )}
    </div>
  );
};

export default App;
