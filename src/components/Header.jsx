import { Link, NavLink } from 'react-router-dom';
import Icon from './Icon';

export default function Header({ theme, onTheme, search, onSearch, favoritesCount }) {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" to="/" aria-label="PlayVerse home">
          <span className="brand-mark">P</span><span><b>Play</b>Verse</span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {['/', '/pc-games', '/mobile-games', '/about', '/contact'].map((path) => {
            const label = path === '/' ? 'Discover' : path.slice(1).replace('-', ' ');
            return <NavLink key={path} to={path} end={path === '/'}>{label}</NavLink>;
          })}
        </nav>
        <div className="header-actions">
          <label className="header-search">
            <Icon name="search" size={18} />
            <input value={search} onChange={(e) => onSearch(e.target.value)} placeholder="Search games..." aria-label="Search games" />
          </label>
          <Link className="icon-btn badge-btn" to="/favorites" aria-label={`Favorites, ${favoritesCount} saved`}><Icon name="heart" size={18} />{favoritesCount > 0 && <span>{favoritesCount}</span>}</Link>
          <button className="icon-btn" onClick={onTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}><Icon name={theme === 'dark' ? 'sun' : 'moon'} size={18} /></button>
          <Link className="mobile-menu" to="/menu" aria-label="Open menu"><Icon name="menu" /></Link>
        </div>
      </div>
    </header>
  );
}
