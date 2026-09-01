import { Link } from 'react-router-dom';
import Icon from './Icon';
export default function MobileMenu() { return <div className="mobile-menu-page"><div className="container"><div className="mobile-menu-box"><Link to="/">Discover</Link><Link to="/pc-games">PC Games</Link><Link to="/mobile-games">Mobile Games</Link><Link to="/favorites">Favorites</Link><Link to="/about">About</Link><Link to="/contact">Contact</Link><Link to="/">Back <Icon name="arrow" size={16}/></Link></div></div></div>; }
