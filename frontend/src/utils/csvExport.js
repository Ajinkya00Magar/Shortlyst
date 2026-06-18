import { calculateLiveScore, calculateConsensus } from './scoring';

/**
 * Handles CSV text generation and download trigger
 */
export const exportToCSV = (items, teamMembers) => {
  const headers = [
    "Rank",
    "ID",
    "Title",
    "Category",
    "Score (Normalized /100)",
    "Consensus Level",
    ...teamMembers.map(m => `Rating: ${m}`),
    "Innovation Rating",
    "Difficulty Rating",
    "Feasibility Rating",
    "Industry Impact Rating",
    "Learning Opportunity Rating",
    "Team Notes",
    "Pros",
    "Cons"
  ];

  const rows = items.map((item, idx) => {
    const consensus = calculateConsensus(item.teamRatings);
    return [
      idx + 1,
      item.id,
      `"${item.title.replace(/"/g, '""')}"`,
      `"${item.category.replace(/"/g, '""')}"`,
      calculateLiveScore(item),
      consensus.label,
      ...item.teamRatings,
      item.metrics.innovation,
      item.metrics.difficulty,
      item.metrics.feasibility,
      item.metrics.industryImpact,
      item.metrics.learningOpportunity,
      `"${(item.notes || '').replace(/"/g, '""')}"`,
      `"${(item.pros ? item.pros.join(', ') : '').replace(/"/g, '""')}"`,
      `"${(item.cons ? item.cons.join(', ') : '').replace(/"/g, '""')}"`
    ];
  });

  const csvContent = "data:text/csv;charset=utf-8," 
    + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
  
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "ISRO_Hackathon_2026_Problem_Evaluations.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Handles HTML-based styled Excel worksheet download
 */
export const exportToExcel = (items, teamMembers) => {
  let tableHTML = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta charset="UTF-8">
      <style>
        table { border-collapse: collapse; }
        th { background-color: #0c2340; color: white; font-weight: bold; border: 1px solid #ddd; padding: 8px; }
        td { border: 1px solid #ddd; padding: 6px; }
        .rank-top { background-color: #fef3c7; font-weight: bold; }
        .score-cell { font-weight: bold; color: #d97706; }
      </style>
    </head>
    <body>
      <h2>ISRO Bharatiya Antariksh Hackathon 2026 - Master Evaluations Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>ID</th>
            <th>Problem Statement Title</th>
            <th>Category</th>
            <th>Score (Normalized /100)</th>
            <th>Consensus Status</th>
            ${teamMembers.map(m => `<th>${m}</th>`).join('')}
            <th>Innovation</th>
            <th>Difficulty</th>
            <th>Feasibility</th>
            <th>Impact</th>
            <th>Learning</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
  `;

  items.forEach((item, index) => {
    const isTop5 = index < 5;
    const consensus = calculateConsensus(item.teamRatings);
    const score = calculateLiveScore(item);
    
    tableHTML += `
      <tr class="${isTop5 ? 'rank-top' : ''}">
        <td>${index + 1}</td>
        <td>${item.id}</td>
        <td>${item.title}</td>
        <td>${item.category}</td>
        <td class="score-cell">${score}</td>
        <td>${consensus.label}</td>
        ${item.teamRatings.map(r => `<td>${r} ★</td>`).join('')}
        <td>${item.metrics.innovation} ★</td>
        <td>${item.metrics.difficulty} ★</td>
        <td>${item.metrics.feasibility} ★</td>
        <td>${item.metrics.industryImpact} ★</td>
        <td>${item.metrics.learningOpportunity} ★</td>
        <td>${item.notes || ''}</td>
      </tr>
    `;
  });

  tableHTML += `
        </tbody>
      </table>
    </body>
    </html>
  `;

  const blob = new Blob([tableHTML], { type: "application/vnd.ms-excel" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "ISRO_Hackathon_2026_Evaluation_Grid.xls";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Triggers standard browser window print module optimized via print layout CSS in globals
 */
export const triggerPDFPrint = () => {
  window.print();
};
