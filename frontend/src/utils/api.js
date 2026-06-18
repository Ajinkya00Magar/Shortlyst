/**
 * API Client wrapper for communicating with the backend Express server.
 */

export async function fetchProblemStatements() {
  const response = await fetch('/api/problem-statements');
  if (!response.ok) {
    throw new Error('Failed to fetch problem statements');
  }
  return response.json();
}

export async function updateProblemStatement(id, updatedFields) {
  const response = await fetch(`/api/problem-statements/${id}`, {
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
  const response = await fetch('/api/team-members');
  if (!response.ok) {
    throw new Error('Failed to fetch team members');
  }
  return response.json();
}

export async function updateTeamMembers(members) {
  const response = await fetch('/api/team-members', {
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
  const response = await fetch('/api/reset', {
    method: 'POST',
  });
  if (!response.ok) {
    throw new Error('Failed to reset database');
  }
  return response.json();
}
