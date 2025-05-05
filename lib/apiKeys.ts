export interface ApiKey {
  id: string;
  name: string;
  key: string;
  created_at: string;
}

export async function fetchApiKeys(): Promise<ApiKey[]> {
  const response = await fetch('/api/keys');
  if (!response.ok) throw new Error('Failed to fetch keys');
  return response.json();
}

export async function createApiKey(name: string): Promise<ApiKey> {
  const response = await fetch('/api/keys', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });
  if (!response.ok) throw new Error('Failed to create key');
  return response.json();
}

export async function deleteApiKey(id: string): Promise<void> {
  const response = await fetch('/api/keys', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });
  if (!response.ok) throw new Error('Failed to delete key');
}

export async function updateApiKey(id: string, name: string): Promise<ApiKey> {
  const response = await fetch('/api/keys', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, name }),
  });
  if (!response.ok) throw new Error('Failed to update key');
  return response.json();
}

export async function validateApiKey(apiKey: string): Promise<boolean> {
  const response = await fetch('/api/protected', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ apiKey }),
  });
  return response.ok;
} 