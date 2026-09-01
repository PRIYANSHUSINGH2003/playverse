import { useMemo, useState } from 'react';
import GameCard from '../components/GameCard';
import SectionTitle from '../components/SectionTitle';
import AdSlot from '../components/AdSlot';
import EmptyState from '../components/EmptyState';
import { categories } from '../data/games';
import { mobileGames } from '../data/platformGames';

export default function MobileGames({ search, favorites, onFavorite }) {
  const [category, setCategory] = useState('All');
  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return mobileGames.filter((game) => {
      const haystack = `${game.title} ${game.genre} ${game.description}`.toLowerCase();
      return (!q || haystack.includes(q)) && (category === 'All' || game.category.toLowerCase() === category.toLowerCase());
    });
  }, [search, category]);

  return (
    <main className="container page-content">
      <SectionTitle eyebrow="MOBILE DISCOVERY" title="Games for Android & iPhone" action={<span className="muted">{mobileGames.length} curated links</span>} />
      <div className="catalog-notice mobile-note">Open verified store pages from PlayVerse. Store pages may show availability, age ratings, in-app purchases, or regional restrictions set by the publisher.</div>
      <div className="category-row" aria-label="Mobile game categories">
        {categories.map((c) => <button key={c} className={category === c ? 'category-btn active' : 'category-btn'} onClick={() => setCategory(c)}>{c}</button>)}
      </div>
      <AdSlot slot={import.meta.env.VITE_ADSENSE_SLOT} className="page-ad" />
      {visible.length ? <div className="games-grid">{visible.map((game) => <GameCard key={game.id} game={game} favorite={favorites.includes(game.id)} onFavorite={onFavorite} />)}</div> : <EmptyState title="No mobile games found" text="Try another search or category." />}
      <section className="platform-links">
        <div><b>Android</b><span>Google Play links</span></div>
        <div><b>iPhone / iPad</b><span>App Store links</span></div>
        <div><b>One-tap access</b><span>PlayVerse sends you directly to the publisher store page.</span></div>
      </section>
    </main>
  );
}
