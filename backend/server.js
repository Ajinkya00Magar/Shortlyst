import express from 'express';
import cors from 'cors';
import { 
  initDb, 
  getProblemStatements, 
  updateProblemStatement, 
  getTeamMembers, 
  updateTeamMembers, 
  resetDatabase 
} from './db.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize Database on Startup
try {
  initDb();
  console.log("Database initialized successfully.");
} catch (error) {
  console.error("Failed to initialize database:", error);
}

// Get all problem statements
app.get('/api/problem-statements', (req, res) => {
  try {
    const data = getProblemStatements();
    res.json(data);
  } catch (error) {
    console.error("Failed to get problem statements:", error);
    res.status(500).json({ error: "Failed to fetch problem statements" });
  }
});

// Update fields of a specific problem statement
app.put('/api/problem-statements/:id', (req, res) => {
  const { id } = req.params;
  const fields = req.body;
  try {
    updateProblemStatement(id, fields);
    res.json({ success: true, message: `Problem statement ${id} updated` });
  } catch (error) {
    console.error(`Failed to update problem statement ${id}:`, error);
    res.status(500).json({ error: "Failed to update problem statement" });
  }
});

// Get team members list
app.get('/api/team-members', (req, res) => {
  try {
    const data = getTeamMembers();
    res.json(data);
  } catch (error) {
    console.error("Failed to get team members:", error);
    res.status(500).json({ error: "Failed to fetch team members" });
  }
});

// Update team members list
app.put('/api/team-members', (req, res) => {
  const { members } = req.body;
  if (!Array.isArray(members)) {
    return res.status(400).json({ error: "members parameter must be an array of strings" });
  }
  try {
    updateTeamMembers(members);
    res.json({ success: true, message: "Team members list updated" });
  } catch (error) {
    console.error("Failed to update team members:", error);
    res.status(500).json({ error: "Failed to update team members" });
  }
});

// Reset entire database to default seeding
app.post('/api/reset', (req, res) => {
  try {
    resetDatabase();
    res.json({ success: true, message: "Database reset to defaults successfully" });
  } catch (error) {
    console.error("Failed to reset database:", error);
    res.status(500).json({ error: "Failed to reset database" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
