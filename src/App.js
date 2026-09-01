import { useCallback, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
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
import { featuredGames } from './data/games';
import { pcGames, mobileGames } from './data/platformGames';
import './styles.css';

function Shell() {
  const [theme, setTheme] = useLocalStorage('theme', 'dark');
  const [favorites, setFavorites] = useLocalStorage('favorites', []);
  const [recent, setRecent] = useLocalStorage('recent', []);
  const [search, setSearch] = useLocalStorage('search', '');
  const [catalogGames, setCatalogGames] = useLocalStorage('catalog-cache', featuredGames);
  const location = useLocation();

  useEffect(() => { document.documentElement.dataset.theme = theme; }, [theme]);
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [location.pathname]);

  const toggleFavorite = useCallback((id) => setFavorites((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [id, ...prev]), [setFavorites]);
  const markPlayed = useCallback((game) => {
    setCatalogGames((prev) => {
      const merged = prev.some((x) => x.id === game.id) ? prev : [game, ...prev];
      return merged.slice(0, 300);
    });
    setRecent((prev) => [game.id, ...prev.filter((id) => id !== game.id)].slice(0, 12));
  }, [setCatalogGames, setRecent]);
  const allGames = [...catalogGames, ...featuredGames, ...pcGames, ...mobileGames].filter((g, i, a) => a.findIndex((x) => x.id === g.id) === i);
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
        <Route path="/play/:id" element={playing ? <GamePlayer game={playing} allGames={allGames} onPlayed={markPlayed} /> : <NotFound />} />
        <Route path="/privacy" element={<main className="container page-content prose-page"><span className="eyebrow">PRIVACY</span><h1>Privacy overview</h1><p>PlayVerse stores theme, search, favorites, and recently played state in your browser. External games, game catalogs, advertising providers, and outbound websites have their own policies.</p><p>For production advertising in the EEA, UK, or Switzerland, configure a Google-certified consent management solution before requesting personalized advertising.</p></main>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default Shell;
