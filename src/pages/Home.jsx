import { useEffect, useMemo, useRef, useState } from 'react';
import { featuredGames, categories, mergeGames } from '../data/games';
import { fetchBrowserGames } from '../lib/api';
import GameCard from '../components/GameCard';
import Hero from '../components/Hero';
import Filters from '../components/Filters';
import SectionTitle from '../components/SectionTitle';
import LoadingGrid from '../components/LoadingGrid';
import EmptyState from '../components/EmptyState';
import AdSlot from '../components/AdSlot';
import LoadMore from '../components/LoadMore';
import RecentRow from '../components/RecentRow';

const PAGE_SIZE = 24;

export default function Home({ search, favorites, recent, allGames, onFavorite, onPlayed }) {
  const [games, setGames] = useState(featuredGames);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('popular');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const gameRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    // Curated games render immediately; remote catalog hydrates in parallel.
    fetchBrowserGames(controller.signal)
      .then((data) => {
        setGames(mergeGames(featuredGames, data));
        setNotice('Live free-to-play catalog synced.');
      })
      .catch(() => setNotice('Live catalog is unavailable right now. Showing the resilient curated library.'))
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  useEffect(() => setVisibleCount(PAGE_SIZE), [search, category, sort]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const result = games.filter((g) => {
      const text = `${g.title} ${g.description || ''} ${g.genre || ''} ${g.publisher || ''}`.toLowerCase();
      return (!q || text.includes(q)) && (category === 'All' || String(g.category || '').toLowerCase() === category.toLowerCase());
    });
    return result.sort((a, b) => {
      if (sort === 'rating') return Number(b.rating || 0) - Number(a.rating || 0);
      if (sort === 'newest') return String(b.released || '').localeCompare(String(a.released || ''));
      if (sort === 'az') return a.title.localeCompare(b.title);
      return Number(b.rating || 0) - Number(a.rating || 0);
    });
  }, [games, search, category, sort]);

  const visibleGames = filtered.slice(0, visibleCount);
  const recentGames = recent.map((id) => allGames.find((g) => g.id === id)).filter(Boolean);

  const scrollToGames = () => gameRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  return (
    <>
      <Hero onExplore={scrollToGames} />
      <main className="container home-content" ref={gameRef} id="trending">
        <RecentRow games={recentGames} favorites={favorites} onFavorite={onFavorite} />
        <AdSlot slot={import.meta.env.VITE_ADSENSE_SLOT} className="ad-after-hero" />

        <SectionTitle eyebrow="DISCOVER" title="Games for your next session" action={<span className="live-dot">● Live-ready catalog</span>} />
        <div className="category-row" aria-label="Game categories">
          {categories.map((c) => <button key={c} className={category === c ? 'category-btn active' : 'category-btn'} onClick={() => setCategory(c)}>{c}</button>)}
        </div>
        <div className="catalog-toolbar">
          <p>{filtered.length} games · {category === 'All' ? 'all genres' : category}</p>
          <Filters {...{ category, setCategory, sort, setSort, categories }} />
        </div>
        {notice && <div className="catalog-notice">{notice}</div>}
        {loading ? <LoadingGrid /> : filtered.length ? (
          <>
            <div className="games-grid">
              {visibleGames.map((game, index) => (
                <GameCard key={game.id} game={game} favorite={favorites.includes(game.id)} onFavorite={onFavorite} onPlayed={onPlayed} />
              ))}
            </div>
            {visibleGames.length >= 12 && <AdSlot slot={import.meta.env.VITE_ADSENSE_SLOT} className="inline-ad" />}
            <LoadMore hasMore={visibleCount < filtered.length} onClick={() => setVisibleCount((n) => n + PAGE_SIZE)} />
          </>
        ) : (
          <EmptyState title="No matches" text="Try a different search term or reset your genre filter." action={<button className="secondary-btn" onClick={() => setCategory('All')}>Reset filter</button>} />
        )}
      </main>
    </>
  );
}
