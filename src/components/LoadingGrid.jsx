export default function LoadingGrid({ count = 8 }) {
  return <div className="games-grid">{Array.from({ length: count }).map((_, i) => <div className="skeleton-card" key={i}><div className="skeleton-media" /><div className="skeleton-line wide" /><div className="skeleton-line" /></div>)}</div>;
}
