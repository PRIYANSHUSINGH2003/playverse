import { Link } from 'react-router-dom';
export default function Footer() {
  return <footer className="footer"><div className="container footer-grid"><div><div className="brand"><span className="brand-mark">P</span><span><b>Play</b>Verse</span></div><p>Discover browser-friendly games, save favorites, and get into your next session faster.</p></div><div><h4>Explore</h4><Link to="/">Discover</Link><Link to="/pc-games">PC Games</Link><Link to="/favorites">Favorites</Link></div><div><h4>Platform</h4><Link to="/about">About</Link><Link to="/contact">Contact</Link><Link to="/privacy">Privacy</Link></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} PlayVerse</span><span>Built for fast discovery · data providers credited in-app</span></div></footer>;
}
