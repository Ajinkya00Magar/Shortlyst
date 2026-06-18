const PROBLEM_STATEMENTS_KEY = "isro_hackathon_problem_statements";
const TEAM_MEMBERS_KEY = "isro_hackathon_team_members";

export const loadStoredData = (fallbackData) => {
  try {
    const stored = localStorage.getItem(PROBLEM_STATEMENTS_KEY);
    return stored ? JSON.parse(stored) : fallbackData;
  } catch (error) {
    console.error("Failed to load local storage problem statements", error);
    return fallbackData;
  }
};

export const saveStoredData = (data) => {
  try {
    localStorage.setItem(PROBLEM_STATEMENTS_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save local storage problem statements", error);
  }
};

export const loadTeamMembers = () => {
  try {
    const stored = localStorage.getItem(TEAM_MEMBERS_KEY);
    return stored ? JSON.parse(stored) : ["Member 1", "Member 2", "Member 3", "Member 4"];
  } catch (error) {
    console.error("Failed to load team members data", error);
    return ["Member 1", "Member 2", "Member 3", "Member 4"];
  }
};

export const saveTeamMembers = (members) => {
  try {
    localStorage.setItem(TEAM_MEMBERS_KEY, JSON.stringify(members));
  } catch (error) {
    console.error("Failed to save team members data", error);
  }
};
