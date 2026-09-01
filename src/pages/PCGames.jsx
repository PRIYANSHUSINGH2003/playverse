import { useEffect, useMemo, useState } from 'react';
import { fetchPCGames } from '../lib/api';
import { mergeGames } from '../data/games';
import { pcGames } from '../data/platformGames';
import GameCard from '../components/GameCard';
import SectionTitle from '../components/SectionTitle';
import LoadingGrid from '../components/LoadingGrid';
import EmptyState from '../components/EmptyState';
import LoadMore from '../components/LoadMore';
import AdSlot from '../components/AdSlot';

export default function PCGames({ search, favorites, onFavorite }) {
  const [games, setGames] = useState(pcGames);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [message, setMessage] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    const c = new AbortController();
    fetchPCGames({ page: 1, search: '', signal: c.signal })
      .then((payload) => {
        const remote = Array.isArray(payload) ? payload : (payload?.results || []);
        setGames(remote.length ? mergeGames(pcGames, remote) : pcGames);
        setHasMore(Boolean(!Array.isArray(payload) && payload?.next));
        if (payload?.source === 'curated') setMessage('Showing the PlayVerse curated PC catalog. Add RAWG_API_KEY on the server to hydrate it with live metadata.');
      })
      .catch((e) => {
        if (e.name !== 'AbortError') setMessage('RAWG is unavailable right now. Showing the curated PC library instead.');
        setGames(pcGames);
        setHasMore(false);
      })
      .finally(() => setLoading(false));
    return () => c.abort();
  }, []);

  const loadMore = async () => {
    if (!hasMore) return;
    setLoadingMore(true);
    try {
      const payload = await fetchPCGames({ page: page + 1, search: '', signal: undefined });
      const nextGames = Array.isArray(payload) ? payload : (payload?.results || []);
      setGames((prev) => mergeGames(prev, nextGames));
      setPage((p) => p + 1);
      setHasMore(Boolean(payload.next));
    } catch (e) { setMessage(e.message); }
    finally { setLoadingMore(false); }
  };

  const visible = useMemo(() => games.filter((g) => `${g.title} ${g.genre || ''}`.toLowerCase().includes(search.toLowerCase())), [games, search]);
  return <main className="container page-content"><SectionTitle eyebrow="DESKTOP DISCOVERY" title="PC games" action={<span className="muted">{games.length} titles loaded</span>} />{message && <div className="catalog-notice">{message}</div>}<AdSlot slot={import.meta.env.VITE_ADSENSE_SLOT} className="page-ad" />{loading ? <LoadingGrid/> : visible.length ? <><div className="games-grid">{visible.map((g) => <GameCard key={g.id} game={g} favorite={favorites.includes(g.id)} onFavorite={onFavorite}/>)}</div><LoadMore hasMore={hasMore} loading={loadingMore} onClick={loadMore} /></> : <EmptyState title="No PC games found" text="Try another search. PlayVerse keeps a curated PC library available even when the metadata provider is offline."/>}</main>;
}
