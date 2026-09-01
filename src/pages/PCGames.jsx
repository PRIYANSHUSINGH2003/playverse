import { useEffect, useMemo, useState } from 'react';
import { fetchPCGames } from '../lib/api';
import { featuredGames, mergeGames } from '../data/games';
import { pcGames } from '../data/platformGames';
import GameCard from '../components/GameCard';
import SectionTitle from '../components/SectionTitle';
import LoadingGrid from '../components/LoadingGrid';
import EmptyState from '../components/EmptyState';
import LoadMore from '../components/LoadMore';
import AdSlot from '../components/AdSlot';

export default function PCGames({ search, favorites, onFavorite }) {
  const [games, setGames] = useState(pcGames);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [message, setMessage] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const c = new AbortController();
    fetchPCGames({ page: 1, search: '', signal: c.signal })
      .then((payload) => { setGames(mergeGames(pcGames, payload.results || payload || [])); setHasMore(Boolean(payload.next)); })
      .catch((e) => setMessage(e.message))
      .finally(() => setLoading(false));
    return () => c.abort();
  }, []);

  const loadMore = async () => {
    setLoadingMore(true);
    try {
      const payload = await fetchPCGames({ page: page + 1, search: '', signal: undefined });
      setGames((prev) => [...prev, ...(payload.results || payload || [])]);
      setPage((p) => p + 1);
      setHasMore(Boolean(payload.next));
    } catch (e) { setMessage(e.message); }
    finally { setLoadingMore(false); }
  };

  const visible = useMemo(() => games.filter((g) => `${g.title} ${g.genre || ''}`.toLowerCase().includes(search.toLowerCase())), [games, search]);
  return <main className="container page-content"><SectionTitle eyebrow="DESKTOP DISCOVERY" title="PC games" action={<span className="muted">{games.length} titles loaded</span>} />{message && <div className="catalog-notice">{message}</div>}<AdSlot slot={import.meta.env.VITE_ADSENSE_SLOT} className="page-ad" />{loading ? <LoadingGrid/> : visible.length ? <><div className="games-grid">{visible.map((g) => <GameCard key={g.id} game={g} favorite={favorites.includes(g.id)} onFavorite={onFavorite}/>)}</div><LoadMore hasMore={hasMore} loading={loadingMore} onClick={loadMore} /></> : <EmptyState title="No PC games found" text="Try another search. PlayVerse keeps a curated PC library available even when the metadata provider is offline."/>}</main>;
}
