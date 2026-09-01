import { Link } from 'react-router-dom';
export default function NotFound() { return <main className="container page-content center-page"><span className="eyebrow">404</span><h1>That page vanished into another dimension.</h1><p>Head back to the game library and choose another route.</p><Link to="/" className="primary-btn">Back to PlayVerse</Link></main>; }
