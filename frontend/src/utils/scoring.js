/**
 * Calculates standard deviation to judge team consensus
 */
export const calculateConsensus = (ratings) => {
  if (!ratings || ratings.length === 0) return { label: "Unknown", color: "text-slate-400 bg-slate-400/10" };
  
  const mean = ratings.reduce((sum, r) => sum + r, 0) / ratings.length;
  const variance = ratings.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / ratings.length;
  const stdDev = Math.sqrt(variance);

  if (stdDev <= 0.6) {
    return {
      label: "Strong Consensus",
      color: "text-emerald-400 bg-emerald-400/10 border-emerald-500/30",
      iconColor: "text-emerald-400",
      status: "🟢"
    };
  } else if (stdDev <= 1.2) {
    return {
      label: "Mixed Opinions",
      color: "text-amber-400 bg-amber-400/10 border-amber-500/30",
      iconColor: "text-amber-400",
      status: "🟡"
    };
  } else {
    return {
      label: "Dividing Opinions",
      color: "text-rose-400 bg-rose-400/10 border-rose-500/30",
      iconColor: "text-rose-400",
      status: "🔴"
    };
  }
};

/**
 * Computes average core evaluation metrics across all active jury members
 */
export const getAverageMetrics = (memberMetrics, teamMembers) => {
  const avg = {
    innovation: 0,
    difficulty: 0,
    feasibility: 0,
    industryImpact: 0,
    learningOpportunity: 0
  };
  const defaultMembers = ["Ajinkya Magar", "Rushda Jagtap", "Siddhi Garg", "Sanmit Patil"];
  const members = teamMembers && teamMembers.length > 0 ? teamMembers : defaultMembers;
  const keys = Object.keys(avg);
  
  keys.forEach(key => {
    let sum = 0;
    let count = 0;
    members.forEach(member => {
      const val = (memberMetrics && memberMetrics[member] && memberMetrics[member][key]) !== undefined 
        ? memberMetrics[member][key] 
        : 3;
      sum += val;
      count++;
    });
    avg[key] = count > 0 ? parseFloat((sum / count).toFixed(1)) : 3;
  });
  return avg;
};

/**
 * Custom Live Score Formula based on guidelines:
 * TeamVoteScore = sum(member ratings) [max: 20]
 * FinalScore = (TeamVoteScore * 0.40) + (Innovation * 0.20) + (IndustryImpact * 0.15) + (LearningOpportunity * 0.15) + (Feasibility * 0.10) / (Difficulty * 0.15)
 * 
 * We normalize this mathematically to map perfectly within a 100-point scale.
 */
export const calculateLiveScore = (item, teamMembers) => {
  const teamVoteScore = item.teamRatings.reduce((sum, r) => sum + r, 0);
  
  // Calculate average metrics across all team members
  const avgMetrics = getAverageMetrics(item.memberMetrics, teamMembers);
  const { innovation, difficulty, feasibility, industryImpact, learningOpportunity } = avgMetrics;

  const numerator = (teamVoteScore * 0.40) + 
                    (innovation * 0.20) + 
                    (industryImpact * 0.15) + 
                    (learningOpportunity * 0.15) + 
                    (feasibility * 0.10);
  
  // Prevent division by zero if difficulty isn't configured
  const verifiedDifficulty = difficulty > 0 ? difficulty : 1;
  const denominator = verifiedDifficulty * 0.15;

  const rawScore = numerator / denominator;

  // Normalization bounds:
  // Minimum: Ratings = 1 each. TeamVote = 4. Metrics = 1 each (Except Difficulty = 5 for max penalty).
  // Numerator Min = (4 * 0.4) + (1 * 0.2) + (1 * 0.15) + (1 * 0.15) + (1 * 0.10) = 2.20
  // Denominator Min = 5 * 0.15 = 0.75. Raw Min = 2.20 / 0.75 = 2.9333
  //
  // Maximum: Ratings = 5 each. TeamVote = 20. Metrics = 5 each (Except Difficulty = 1 for min penalty).
  // Numerator Max = (20 * 0.4) + (5 * 0.2) + (5 * 0.15) + (5 * 0.15) + (5 * 0.10) = 11.00
  // Denominator Max = 1 * 0.15 = 0.15. Raw Max = 11.00 / 0.15 = 73.3333

  const minRaw = 2.9333;
  const maxRaw = 73.3333;

  let normalized = ((rawScore - minRaw) / (maxRaw - minRaw)) * 100;
  
  // Guarantee values are bound strictly between 0 and 100
  normalized = Math.max(0, Math.min(100, normalized));

  return parseFloat(normalized.toFixed(1));
};

/**
 * Compiles rankings for all problem statements
 */
export const computeRankings = (items, teamMembers) => {
  const scoredList = items.map(item => {
    const avgMetrics = getAverageMetrics(item.memberMetrics, teamMembers);
    return {
      ...item,
      metrics: avgMetrics, // Assign averages back to item.metrics
      score: calculateLiveScore(item, teamMembers)
    };
  });
  
  // Sort descending by score
  scoredList.sort((a, b) => b.score - a.score);
  
  // Map rank indexes
  return scoredList.map((item, index) => ({
    ...item,
    rank: index + 1
  }));
};
