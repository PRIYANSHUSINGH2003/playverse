const json = async (response) => {
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Request failed');
  return data;
};

async function fetchWithTimeout(url, options = {}, timeout = 12000) {
  const signal = options.signal || (typeof AbortSignal !== 'undefined' && AbortSignal.timeout ? AbortSignal.timeout(timeout) : undefined);
  return fetch(url, { ...options, signal });
}

export async function fetchBrowserGames(signal) {
  const response = await fetchWithTimeout('/api/games?platform=browser', { signal });
  return json(response);
}

export async function fetchPCGames({ page = 1, search = '', signal } = {}) {
  const params = new URLSearchParams({ page: String(page) });
  if (search.trim()) params.set('search', search.trim());
  const response = await fetchWithTimeout(`/api/rawg/games?${params.toString()}`, { signal });
  return json(response);
}

export async function submitContact(payload, signal) {
  const response = await fetchWithTimeout('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    signal,
  });
  return json(response);
}
