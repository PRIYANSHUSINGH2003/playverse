import Icon from './Icon';
export default function Filters({ category, setCategory, sort, setSort, categories }) {
  return <div className="filters"><div className="filter-select"><Icon name="filter" size={16}/><select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Filter by genre">{categories.map((c) => <option key={c}>{c}</option>)}</select></div><select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort games"><option value="popular">Popular</option><option value="rating">Top rated</option><option value="newest">Newest</option><option value="az">A–Z</option></select></div>;
}
