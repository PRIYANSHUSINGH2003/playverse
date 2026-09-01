import { useCallback, useEffect, useMemo, useState } from 'react';
import { Route, Routes, useLocation, useParams } from 'react-router-dom';
import { useLocalStorage } from './hooks/useLocalStorage';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileMenu from './components/MobileMenu';
import GamePlayer from './components/GamePlayer';
import Home from './pages/Home';
import PCGames from './pages/PCGames';
import MobileGames from './pages/MobileGames';
import Favorites from './pages/Favorites';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import { featuredGames, mergeGames } from './data/games';
import { fetchBrowserGames, fetchBrowserGameById, fetchPCGames } from './lib/api';
import { pcGames, mobileGames } from './data/platformGames';
import './styles.css';

function GameRoute({ initialGame, allGames, catalogHydrated, onPlayed }) {
  const { id } = useParams();
  const [game, setGame] = useState(initialGame || null);
  const [loading, setLoading] = useState(!initialGame && /^ftg-\d+$/.test(id || ''));
  const [error, setError] = useState('');

  useEffect(() => {
    setGame(initialGame || null);
    setError('');
    if (initialGame || !/^ftg-\d+$/.test(id || '')) {
      setLoading(false);
      return;
    }
    const controller = new AbortController();
    setLoading(true);
    fetchBrowserGameById(id, controller.signal)
      .then((value) => {
        if (!value) throw new Error('Game not found');
        setGame(value);
      })
      .catch((e) => { if (e.name !== 'AbortError') setError(e.message || 'Unable to load this game.'); })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [id, initialGame]);

  if (loading) return <main className="container page-content"><div className="catalog-notice">Loading game…</div></main>;
  if (game) return <GamePlayer game={game} allGames={allGames} onPlayed={onPlayed} />;
  if (error) return <NotFound />;
  return catalogHydrated ? <NotFound /> : <main className="container page-content"><div className="catalog-notice">Loading game catalog…</div></main>;
}

function Shell() {
  const [theme, setTheme] = useLocalStorage('theme', 'dark');
  const [favorites, setFavorites] = useLocalStorage('favorites', []);
  const [recent, setRecent] = useLocalStorage('recent', []);
  const [search, setSearch] = useLocalStorage('search', '');
  const [catalogGames, setCatalogGames] = useLocalStorage('catalog-cache', featuredGames);
  const [remoteCatalog, setRemoteCatalog] = useLocalStorage('remote-catalog-cache', []);
  const [catalogHydrated, setCatalogHydrated] = useState(false);
  const location = useLocation();

  useEffect(() => { document.documentElement.dataset.theme = theme; }, [theme]);
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [location.pathname]);

  useEffect(() => {
    const controller = new AbortController();
    Promise.allSettled([
      fetchBrowserGames(controller.signal),
      fetchPCGames({ page: 1, search: '', signal: controller.signal }),
    ]).then(([browserResult, pcResult]) => {
      if (controller.signal.aborted) return;
      setCatalogHydrated(true);
      const browser = browserResult.status === 'fulfilled' && Array.isArray(browserResult.value) ? browserResult.value : [];
      const pcPayload = pcResult.status === 'fulfilled' ? pcResult.value : null;
      const pc = Array.isArray(pcPayload) ? pcPayload : (pcPayload?.results || []);
      const remote = mergeGames(browser, pc);
      if (remote.length) setRemoteCatalog((previous) => mergeGames(remote, previous).slice(0, 600));
    }).catch(() => setCatalogHydrated(true));
    return () => controller.abort();
  }, [setRemoteCatalog]);

  const toggleFavorite = useCallback((id) => setFavorites((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [id, ...prev]), [setFavorites]);
  const markPlayed = useCallback((game) => {
    setCatalogGames((prev) => {
      const merged = prev.some((x) => x.id === game.id) ? prev : [game, ...prev];
      return merged.slice(0, 300);
    });
    setRecent((prev) => [game.id, ...prev.filter((id) => id !== game.id)].slice(0, 12));
  }, [setCatalogGames, setRecent]);
  const allGames = useMemo(() => mergeGames(remoteCatalog, catalogGames, featuredGames, pcGames, mobileGames), [remoteCatalog, catalogGames, pcGames, mobileGames]);
  const id = decodeURIComponent(location.pathname.split('/play/')[1] || '');
  const playing = id ? allGames.find((g) => g.id === id) : null;

  return (
    <div className="app-shell">
      <Header theme={theme} favoritesCount={favorites.length} search={search} onSearch={setSearch} onTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
      <Routes>
        <Route path="/" element={<Home search={search} favorites={favorites} recent={recent} allGames={allGames} onFavorite={toggleFavorite} onPlayed={markPlayed} />} />
        <Route path="/pc-games" element={<PCGames search={search} favorites={favorites} onFavorite={toggleFavorite} />} />
        <Route path="/mobile-games" element={<MobileGames search={search} favorites={favorites} onFavorite={toggleFavorite} />} />
        <Route path="/favorites" element={<Favorites favorites={favorites} games={allGames} onFavorite={toggleFavorite} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/menu" element={<MobileMenu />} />
        <Route path="/play/:id" element={<GameRoute initialGame={playing} allGames={allGames} catalogHydrated={catalogHydrated} onPlayed={markPlayed} />} />
        <Route path="/privacy" element={<main className="container page-content prose-page"><span className="eyebrow">PRIVACY</span><h1>Privacy overview</h1><p>PlayVerse stores theme, search, favorites, and recently played state in your browser. External games, game catalogs, advertising providers, and outbound websites have their own policies.</p><p>For production advertising in the EEA, UK, or Switzerland, configure a Google-certified consent management solution before requesting personalized advertising.</p></main>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default Shell;
