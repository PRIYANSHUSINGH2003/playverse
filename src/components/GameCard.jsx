import { Link } from 'react-router-dom';
import Icon from './Icon';

export default function GameCard({ game, favorite, onFavorite }) {
  const category = game.category || game.genre || 'Other';
  return (
    <article className="game-card">
      <Link to={`/play/${encodeURIComponent(game.id)}`} className="game-cover" aria-label={`Open ${game.title}`}>
        {(game.image || game.thumbnail) ? <img src={game.image || game.thumbnail} alt="" loading="lazy" onError={(e) => { e.currentTarget.style.display = 'none'; }} /> : <div className="game-cover-placeholder" aria-hidden="true"><strong>{game.title?.slice(0, 2).toUpperCase()}</strong><span>PLAYVERSE</span></div>}
        <div className="cover-overlay"><span className="play-pill"><Icon name="play" size={16} /> {game.platform === 'Mobile' ? 'Open store' : game.distribution === 'Store' ? 'View game' : 'Play'}</span></div>
        <div className="cover-badges"><span className="rating"><Icon name="star" size={13} /> {Number(game.rating || 4).toFixed(1)}</span><span className="source-badge">{game.platform || 'Browser'}</span></div>
      </Link>
      <div className="game-card-body">
        <div className="meta-row">
          <span className="chip">{category}</span>
          <button className={`heart-btn ${favorite ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); e.stopPropagation(); onFavorite(game.id); }} aria-label={`${favorite ? 'Remove' : 'Add'} ${game.title} ${favorite ? 'from' : 'to'} favorites`}>
            <Icon name="heart" size={17} />
          </button>
        </div>
        <Link to={`/play/${encodeURIComponent(game.id)}`}><h3>{game.title}</h3></Link>
        <p>{game.description || 'Explore this title on PlayVerse.'}</p>
      </div>
    </article>
  );
}
