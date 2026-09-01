export default function LoadMore({ hasMore, loading, onClick, label = 'Load more games' }) {
  if (!hasMore) return null;
  return (
    <div className="load-more-wrap">
      <button className="secondary-btn load-more" onClick={onClick} disabled={loading}>
        {loading ? 'Loading…' : label}
      </button>
    </div>
  );
}
