import { useMemo } from 'react';
import { featuredGames } from '../data/games';
import GameCard from '../components/GameCard';
import SectionTitle from '../components/SectionTitle';
import EmptyState from '../components/EmptyState';

export default function Favorites({ favorites, games, onFavorite }) {
  const saved = useMemo(() => { const map = new Map([...featuredGames, ...games].map((g) => [g.id, g])); return favorites.map((id) => map.get(id)).filter(Boolean); }, [favorites, games]);
  return <main className="container page-content"><SectionTitle eyebrow="YOUR LIBRARY" title="Favorites" action={<span className="muted">{saved.length} saved</span>}/>{saved.length ? <div className="games-grid">{saved.map((g) => <GameCard key={g.id} game={g} favorite onFavorite={onFavorite}/>)}</div> : <EmptyState title="Your shelf is empty" text="Tap the heart on any game to build your personal quick-launch list."/>}</main>;
}
