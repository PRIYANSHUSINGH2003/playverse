import GameCard from './GameCard';
import SectionTitle from './SectionTitle';

export default function RecentRow({ games, favorites, onFavorite }) {
  if (!games.length) return null;
  return (
    <section className="recent-section">
      <SectionTitle eyebrow="YOUR SESSION" title="Continue playing" action={<span className="muted">Saved on this device</span>} />
      <div className="games-grid recent-grid">
        {games.slice(0, 4).map((game) => (
          <GameCard key={game.id} game={game} favorite={favorites.includes(game.id)} onFavorite={onFavorite} />
        ))}
      </div>
    </section>
  );
}
