import express from 'express';
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pcGames as curatedPcGames } from '../src/data/platformGames.js';

const app = express();
const PORT = Number(process.env.PORT || 5000);
const allowedOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173').split(',').map((v) => v.trim()).filter(Boolean);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.disable('x-powered-by');
app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: '32kb' }));

const cache = new Map();
const TTL = 5 * 60 * 1000;
const contactWindow = new Map();

function cached(key) {
  const item = cache.get(key);
  if (!item || Date.now() - item.at > TTL) return null;
  return item.value;
}
function setCache(key, value) { cache.set(key, { at: Date.now(), value }); return value; }
function normalizeUrl(value) { try { const u = new URL(value); return ['http:', 'https:'].includes(u.protocol) ? u.toString() : null; } catch { return null; } }
function rateLimited(key, limit = 5, windowMs = 60_000) {
  const now = Date.now();
  const item = contactWindow.get(key);
  if (!item || now - item.at > windowMs) { contactWindow.set(key, { at: now, count: 1 }); return false; }
  item.count += 1;
  return item.count > limit;
}

app.get('/api/health', (_req, res) => res.json({ ok: true, service: 'playverse-api', time: new Date().toISOString() }));

app.get('/api/games/:id', async (req, res) => {
  const id = String(req.params.id || '').trim();
  if (!/^\d+$/.test(id)) return res.status(400).json({ message: 'Invalid game id.' });
  const cacheKey = `freetogame-game:${id}`;
  const hit = cached(cacheKey);
  if (hit) return res.json(hit);
  try {
    const url = new URL('https://www.freetogame.com/api/game');
    url.searchParams.set('id', id);
    const response = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error(`FreeToGame responded ${response.status}`);
    const game = await response.json();
    if (!game?.id) return res.status(404).json({ message: 'Game not found.' });
    const normalized = {
      id: `ftg-${game.id}`,
      title: game.title,
      thumbnail: normalizeUrl(game.thumbnail), image: normalizeUrl(game.thumbnail),
      description: game.description || game.short_description || '',
      category: game.genre || 'Other', genre: game.genre || 'Other',
      platform: game.platform || 'Browser', publisher: game.publisher || '', developer: game.developer || '',
      released: game.release_date || '', rating: 4.2,
      game_url: normalizeUrl(game.game_url || game.freetogame_profile_url),
      externalUrl: normalizeUrl(game.game_url || game.freetogame_profile_url),
      source: 'FreeToGame', embedEligible: false,
    };
    return res.json(setCache(cacheKey, normalized));
  } catch (error) {
    console.error('[game]', error.message);
    return res.status(502).json({ message: 'Game detail provider is temporarily unavailable.' });
  }
});

app.get('/api/games', async (req, res) => {
  const platform = String(req.query.platform || 'browser').toLowerCase() === 'pc' ? 'pc' : 'browser';
  const key = `freetogame:${platform}`;
  const hit = cached(key);
  if (hit) return res.json(hit);
  try {
    const url = new URL('https://www.freetogame.com/api/games');
    url.searchParams.set('platform', platform);
    const response = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error(`FreeToGame responded ${response.status}`);
    const data = await response.json();
    const normalized = Array.isArray(data) ? data.map((game) => ({
      id: `ftg-${game.id}`,
      title: game.title,
      thumbnail: normalizeUrl(game.thumbnail), image: normalizeUrl(game.thumbnail),
      description: game.short_description || '',
      category: game.genre || 'Other', genre: game.genre || 'Other',
      platform: game.platform || platform, publisher: game.publisher || '', developer: game.developer || '',
      released: game.release_date || '', rating: 4.2, game_url: normalizeUrl(game.game_url),
      source: 'FreeToGame', externalUrl: normalizeUrl(game.game_url), embedEligible: false,
    })) : [];
    res.json(setCache(key, normalized));
  } catch (error) {
    console.error('[games]', error.message);
    res.status(502).json({ message: 'Game catalog provider is temporarily unavailable.' });
  }
});

app.get('/api/rawg/games', async (req, res) => {
  const page = Math.min(Math.max(Number(req.query.page || 1), 1), 50);
  const search = String(req.query.search || '').trim().slice(0, 120);
  if (!process.env.RAWG_API_KEY) {
    const q = search.toLowerCase();
    const filtered = q ? curatedPcGames.filter((game) => `${game.title} ${game.genre} ${game.category} ${game.description}`.toLowerCase().includes(q)) : curatedPcGames;
    const pageSize = 24;
    const start = (page - 1) * pageSize;
    return res.json({ source: 'curated', next: start + pageSize < filtered.length, count: filtered.length, results: filtered.slice(start, start + pageSize) });
  }
  const cacheKey = `rawg:${page}:${search.toLowerCase()}`;
  const hit = cached(cacheKey);
  if (hit) return res.json(hit);
  try {
    const url = new URL('https://api.rawg.io/api/games');
    url.searchParams.set('key', process.env.RAWG_API_KEY);
    url.searchParams.set('page', String(page));
    url.searchParams.set('page_size', '40');
    url.searchParams.set('parent_platforms', '1');
    url.searchParams.set('ordering', '-added');
    if (search) url.searchParams.set('search', search);
    const response = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error(`RAWG responded ${response.status}`);
    const data = await response.json();
    const normalized = {
      next: Boolean(data.next),
      count: Number(data.count || 0),
      results: (data.results || []).map((game) => ({
        id: `rawg-${game.id}`, title: game.name, image: normalizeUrl(game.background_image), thumbnail: normalizeUrl(game.background_image),
        description: '', category: game.genres?.[0]?.name || 'Other', genre: game.genres?.map((g) => g.name).slice(0, 3).join(', ') || 'Other',
        platform: 'PC', released: game.released || '', rating: Number(game.rating || 0), metacritic: Number(game.metacritic || 0),
        source: 'RAWG', externalUrl: `https://rawg.io/games/${game.slug}`, embedEligible: false,
      })),
    };
    res.json(setCache(cacheKey, normalized));
  } catch (error) {
    console.error('[rawg]', error.message);
    res.status(502).json({ message: 'PC metadata provider is temporarily unavailable.' });
  }
});

app.post('/api/contact', (req, res) => {
  const key = req.ip || 'unknown';
  if (rateLimited(key)) return res.status(429).json({ message: 'Too many messages. Please try again later.' });
  const name = String(req.body?.name || '').trim();
  const email = String(req.body?.email || '').trim();
  const message = String(req.body?.message || '').trim();
  if (name.length < 2 || name.length > 80 || !/^\S+@\S+\.\S+$/.test(email) || message.length < 10 || message.length > 3000) {
    return res.status(400).json({ message: 'Please provide a valid name, email, and a message between 10 and 3000 characters.' });
  }
  console.log(`[contact] ${new Date().toISOString()} ${name} <${email}>: ${message}`);
  res.json({ ok: true, message: 'Your message was accepted by the demo API. Connect this endpoint to email/ticketing before production launch.' });
});

const distDir = path.resolve(__dirname, '../dist');
app.use(express.static(distDir));
app.get('/{*splat}', (req, res, next) => { if (req.path.startsWith('/api/')) return next(); res.sendFile(path.join(distDir, 'index.html'), (error) => error && next(error)); });
app.listen(PORT, () => console.log(`PlayVerse API running on http://localhost:${PORT}`));
