import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';
import AdSlot from './AdSlot';
import GameCard from './GameCard';

function hostOf(url) { try { return new URL(url).hostname; } catch { return ''; } }
function safeUrl(value) { try { const u = new URL(value); return ['http:', 'https:'].includes(u.protocol) ? u.toString() : null; } catch { return null; } }

export default function GamePlayer({ game, allGames, onPlayed }) {
  const [failed, setFailed] = useState(false);
  const frameRef = useRef(null);
  const url = safeUrl(game.game_url || game.externalUrl);
  const host = hostOf(url || '');
  const canEmbed = Boolean(url && game.embedEligible);

  useEffect(() => { setFailed(false); onPlayed(game); }, [game, onPlayed]);

  const recommendations = useMemo(() => allGames.filter((g) => g.id !== game.id && (g.category === game.category || g.genre === game.genre)).slice(0, 4), [allGames, game]);
  const fullscreen = async () => { try { await frameRef.current?.requestFullscreen?.(); } catch {} };
  const share = async () => {
    const payload = { title: game.title, text: `Play ${game.title} on PlayVerse`, url: window.location.href };
    if (navigator.share) { try { await navigator.share(payload); } catch {} }
    else { await navigator.clipboard?.writeText(window.location.href); }
  };

  if (!url) return <main className="player-page"><div className="container"><div className="empty-state"><h3>Game link unavailable</h3><Link className="primary-btn" to="/">Back to games</Link></div></div></main>;

  return (
    <main className="player-page"><div className="container">
      <div className="player-topbar">
        <Link className="back-link" to="/"><Icon name="back" size={17}/> Back to games</Link>
        <div className="player-actions">
          <button className="secondary-btn" onClick={share}><Icon name="share" size={16}/> Share</button>
          {canEmbed && <button className="secondary-btn" onClick={fullscreen}><Icon name="fullscreen" size={16}/> Fullscreen</button>}
          <a className="secondary-btn" href={url} target="_blank" rel="noopener noreferrer"><Icon name="external" size={16}/> Open external</a>
        </div>
      </div>

      <div className="player-layout">
        <section>
          <div className="player-shell">
            {canEmbed && !failed ? (
              <iframe ref={frameRef} title={game.title} src={url} sandbox="allow-scripts allow-same-origin allow-forms allow-pointer-lock allow-popups allow-popups-to-escape-sandbox" referrerPolicy="strict-origin-when-cross-origin" allow="fullscreen; gamepad; autoplay; orientation-lock" onError={() => setFailed(true)} />
            ) : (
              <div className="blocked-player">
                <img src={game.image || game.thumbnail} alt="" />
                <div>
                  <span className="eyebrow">{game.platform === 'Mobile' ? 'STORE LAUNCH' : 'DIRECT LAUNCH RECOMMENDED'}</span>
                  <h2>{game.title}</h2>
                  <p>{game.platform === 'Mobile' ? 'This title is distributed through an official mobile store. Open the store page to install or play it on a supported device.' : 'This game is hosted by a third party or does not permit iframe embedding. Open the official game page to play.'}</p>
                  <a className="primary-btn" href={url} target="_blank" rel="noopener noreferrer"><Icon name="play" size={17}/> {game.actionLabel || 'Launch game'}</a>
                </div>
              </div>
            )}
          </div>
          <AdSlot slot={import.meta.env.VITE_ADSENSE_SLOT} className="player-ad" />
        </section>

        <aside className="player-info">
          <span className="chip">{game.category || 'Game'}</span>
          <h1>{game.title}</h1>
          <p>{game.description || 'A browser game available through an external game host.'}</p>
          <div className="info-list">
            <div><b>Platform</b><span>{game.platform || 'Browser'}</span></div>
            <div><b>Source</b><span>{game.source || 'Curated'}</span></div>
            <div><b>Provider</b><span>{game.source || host || 'External host'}</span></div>
            {game.distribution && <div><b>Distribution</b><span>{game.distribution}</span></div>}
          </div>
          <div className="safety-note"><strong>Play safe</strong><span>Keep your browser updated and never enter sensitive passwords or payment information into unfamiliar game pages.</span></div>
        </aside>
      </div>

      {recommendations.length > 0 && <section className="recommendations"><div className="section-title"><div><span className="eyebrow">KEEP EXPLORING</span><h2>More like this</h2></div></div><div className="games-grid">{recommendations.map((item) => <GameCard key={item.id} game={item} favorite={false} onFavorite={() => {}} />)}</div></section>}
    </div></main>
  );
}
