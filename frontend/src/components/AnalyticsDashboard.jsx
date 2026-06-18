import React, { useMemo } from 'react';
import { Bar, Radar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { BarChart3 } from 'lucide-react';
import { calculateConsensus } from '../utils/scoring';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Filler,
  Tooltip,
  Legend
);

const chartDefaults = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: '#94a3b8',
        font: { size: 10, family: 'Plus Jakarta Sans' },
      },
    },
    tooltip: {
      backgroundColor: 'rgba(15, 23, 42, 0.95)',
      titleColor: '#FF9933',
      bodyColor: '#e2e8f0',
      borderColor: 'rgba(51, 65, 85, 0.5)',
      borderWidth: 1,
      cornerRadius: 12,
      padding: 12,
      titleFont: { size: 12, family: 'Space Grotesk', weight: 'bold' },
      bodyFont: { size: 11, family: 'Plus Jakarta Sans' },
    },
  },
};

const AnalyticsDashboard = ({ rankedItems }) => {
  // Score Distribution Bar Chart
  const scoreBarData = useMemo(() => ({
    labels: rankedItems.map(item => item.id),
    datasets: [{
      label: 'Normalized Score',
      data: rankedItems.map(item => item.score),
      backgroundColor: rankedItems.map((item, i) =>
        i < 3 ? 'rgba(255, 153, 51, 0.8)' :
        i < 5 ? 'rgba(255, 153, 51, 0.5)' :
        'rgba(59, 130, 246, 0.4)'
      ),
      borderColor: rankedItems.map((item, i) =>
        i < 3 ? 'rgba(255, 153, 51, 1)' :
        i < 5 ? 'rgba(255, 153, 51, 0.7)' :
        'rgba(59, 130, 246, 0.6)'
      ),
      borderWidth: 1,
      borderRadius: 8,
    }],
  }), [rankedItems]);

  const scoreBarOptions = {
    ...chartDefaults,
    scales: {
      x: {
        ticks: { color: '#64748b', font: { size: 9, family: 'Plus Jakarta Sans' } },
        grid: { color: 'rgba(51, 65, 85, 0.2)' },
      },
      y: {
        beginAtZero: true,
        max: 100,
        ticks: { color: '#64748b', font: { size: 10 } },
        grid: { color: 'rgba(51, 65, 85, 0.2)' },
      },
    },
  };

  // Top 5 Radar Chart
  const radarData = useMemo(() => {
    const top5 = rankedItems.slice(0, 5);
    const colors = [
      { bg: 'rgba(255, 153, 51, 0.15)', border: 'rgba(255, 153, 51, 0.8)' },
      { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.8)' },
      { bg: 'rgba(16, 185, 129, 0.15)', border: 'rgba(16, 185, 129, 0.8)' },
      { bg: 'rgba(168, 85, 247, 0.15)', border: 'rgba(168, 85, 247, 0.8)' },
      { bg: 'rgba(251, 191, 36, 0.15)', border: 'rgba(251, 191, 36, 0.8)' },
    ];

    return {
      labels: ['Innovation', 'Feasibility', 'Industry Impact', 'Learning', 'Team Rating Avg'],
      datasets: top5.map((item, idx) => ({
        label: `${item.id} - ${item.title.substring(0, 25)}...`,
        data: [
          item.metrics.innovation,
          item.metrics.feasibility,
          item.metrics.industryImpact,
          item.metrics.learningOpportunity,
          parseFloat((item.teamRatings.reduce((s, r) => s + r, 0) / item.teamRatings.length).toFixed(1)),
        ],
        backgroundColor: colors[idx].bg,
        borderColor: colors[idx].border,
        borderWidth: 2,
        pointBackgroundColor: colors[idx].border,
        pointBorderColor: '#030712',
        pointBorderWidth: 2,
        pointRadius: 4,
      })),
    };
  }, [rankedItems]);

  const radarOptions = {
    ...chartDefaults,
    scales: {
      r: {
        min: 0,
        max: 5,
        ticks: {
          stepSize: 1,
          color: '#475569',
          backdropColor: 'transparent',
          font: { size: 9 },
        },
        grid: { color: 'rgba(51, 65, 85, 0.3)' },
        angleLines: { color: 'rgba(51, 65, 85, 0.3)' },
        pointLabels: { color: '#94a3b8', font: { size: 10, family: 'Plus Jakarta Sans' } },
      },
    },
    plugins: {
      ...chartDefaults.plugins,
      legend: {
        ...chartDefaults.plugins.legend,
        position: 'bottom',
        labels: {
          ...chartDefaults.plugins.legend.labels,
          boxWidth: 8,
          boxHeight: 8,
          usePointStyle: true,
        },
      },
    },
  };

  // Consensus Doughnut
  const consensusCounts = useMemo(() => {
    const counts = { strong: 0, mixed: 0, dividing: 0 };
    rankedItems.forEach(item => {
      const c = calculateConsensus(item.teamRatings);
      if (c.label === "Strong Consensus") counts.strong++;
      else if (c.label === "Mixed Opinions") counts.mixed++;
      else counts.dividing++;
    });
    return counts;
  }, [rankedItems]);

  const doughnutData = {
    labels: ['Strong Consensus', 'Mixed Opinions', 'Dividing Opinions'],
    datasets: [{
      data: [consensusCounts.strong, consensusCounts.mixed, consensusCounts.dividing],
      backgroundColor: [
        'rgba(52, 211, 153, 0.7)',
        'rgba(251, 191, 36, 0.7)',
        'rgba(251, 113, 133, 0.7)',
      ],
      borderColor: [
        'rgba(52, 211, 153, 1)',
        'rgba(251, 191, 36, 1)',
        'rgba(251, 113, 133, 1)',
      ],
      borderWidth: 2,
      hoverOffset: 8,
    }],
  };

  const doughnutOptions = {
    ...chartDefaults,
    cutout: '65%',
    plugins: {
      ...chartDefaults.plugins,
      legend: {
        ...chartDefaults.plugins.legend,
        position: 'bottom',
        labels: {
          ...chartDefaults.plugins.legend.labels,
          boxWidth: 10,
          boxHeight: 10,
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
    },
  };

  // Category Distribution
  const categoryData = useMemo(() => {
    const categoryMap = {};
    rankedItems.forEach(item => {
      categoryMap[item.category] = (categoryMap[item.category] || 0) + 1;
    });
    const sortedCategories = Object.entries(categoryMap).sort((a, b) => b[1] - a[1]);
    return {
      labels: sortedCategories.map(([cat]) => cat.length > 25 ? cat.substring(0, 25) + '...' : cat),
      datasets: [{
        label: 'Problem Statements',
        data: sortedCategories.map(([, count]) => count),
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgba(59, 130, 246, 0.8)',
        borderWidth: 1,
        borderRadius: 6,
      }],
    };
  }, [rankedItems]);

  const categoryBarOptions = {
    ...chartDefaults,
    indexAxis: 'y',
    scales: {
      x: {
        beginAtZero: true,
        ticks: { color: '#64748b', font: { size: 9 }, stepSize: 1 },
        grid: { color: 'rgba(51, 65, 85, 0.2)' },
      },
      y: {
        ticks: { color: '#94a3b8', font: { size: 9, family: 'Plus Jakarta Sans' } },
        grid: { display: false },
      },
    },
  };

  // Summary stats
  const avgScore = (rankedItems.reduce((s, i) => s + i.score, 0) / rankedItems.length).toFixed(1);
  const maxScore = Math.max(...rankedItems.map(i => i.score));
  const minScore = Math.min(...rankedItems.map(i => i.score));

  return (
    <div className="glass-panel p-6 border-slate-800 bg-slate-900/40 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
          <BarChart3 size={20} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white leading-tight">Analytics Dashboard</h2>
          <p className="text-xs text-slate-400">Visual breakdown of scoring distributions, consensus, and category analysis</p>
        </div>
      </div>

      {/* Summary Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Statements', value: rankedItems.length, color: 'text-isro-accent' },
          { label: 'Average Score', value: avgScore, color: 'text-isro-orange' },
          { label: 'Highest Score', value: maxScore, color: 'text-emerald-400' },
          { label: 'Lowest Score', value: minScore, color: 'text-rose-400' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-slate-950/40 border border-slate-800/60 rounded-xl p-4 text-center">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">{label}</p>
            <p className={`text-2xl font-extrabold ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Score Distribution */}
        <div className="bg-slate-950/40 border border-slate-800/60 rounded-xl p-5">
          <h3 className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-4">Score Distribution (Ranked)</h3>
          <div className="h-[280px]">
            <Bar data={scoreBarData} options={scoreBarOptions} />
          </div>
        </div>

        {/* Top 5 Radar */}
        <div className="bg-slate-950/40 border border-slate-800/60 rounded-xl p-5">
          <h3 className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-4">Top 5 Multi-Dimensional Analysis</h3>
          <div className="h-[280px]">
            <Radar data={radarData} options={radarOptions} />
          </div>
        </div>

        {/* Consensus Doughnut */}
        <div className="bg-slate-950/40 border border-slate-800/60 rounded-xl p-5">
          <h3 className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-4">Team Consensus Overview</h3>
          <div className="h-[280px] flex items-center justify-center">
            <div className="w-[250px] h-[250px]">
              <Doughnut data={doughnutData} options={doughnutOptions} />
            </div>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-slate-950/40 border border-slate-800/60 rounded-xl p-5">
          <h3 className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-4">Category Distribution</h3>
          <div className="h-[280px]">
            <Bar data={categoryData} options={categoryBarOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
