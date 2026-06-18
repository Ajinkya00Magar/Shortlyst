/**
 * API Client wrapper for communicating with the backend Express server.
 */

const API_BASE = '/_/backend';

export async function fetchProblemStatements() {
  const response = await fetch(`${API_BASE}/api/problem-statements`);
  if (!response.ok) {
    throw new Error('Failed to fetch problem statements');
  }
  return response.json();
}

export async function updateProblemStatement(id, updatedFields) {
  const response = await fetch(`${API_BASE}/api/problem-statements/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedFields),
  });
  if (!response.ok) {
    throw new Error(`Failed to update problem statement ${id}`);
  }
  return response.json();
}

export async function fetchTeamMembers() {
  const response = await fetch(`${API_BASE}/api/team-members`);
  if (!response.ok) {
    throw new Error('Failed to fetch team members');
  }
  return response.json();
}

export async function updateTeamMembers(members) {
  const response = await fetch(`${API_BASE}/api/team-members`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ members }),
  });
  if (!response.ok) {
    throw new Error('Failed to update team members');
  }
  return response.json();
}

export async function resetDatabase() {
  const response = await fetch(`${API_BASE}/api/reset`, {
    method: 'POST',
  });
  if (!response.ok) {
    throw new Error('Failed to reset database');
  }
  return response.json();
}
