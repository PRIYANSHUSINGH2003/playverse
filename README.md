# PlayVerse 2.0

A production-oriented refresh of the original PlayVerse gaming website.

## What changed

- Migrated the client from Create React App-era React 18 + `react-scripts` to Vite with React 19.
- Removed the exposed RAWG API key from source code. RAWG is now optional and server-side via `RAWG_API_KEY`.
- Added a responsive discovery experience with search, genre chips, sorting, favorites, recent-play state, loading skeletons, and empty/error states.
- Added a dedicated game player route with fullscreen support, sandboxed iframe loading for curated embeds, and external-launch fallback.
- Added accessible navigation, keyboard-friendly controls, reduced-motion support, mobile navigation, theme persistence, and local-first preferences.
- Added server-side validation for the contact endpoint and normalized external URLs.
- Added API caching to reduce repeated provider calls and improve resilience.
- Added PC Games, Favorites, About, Contact, Privacy, and 404 routes.
- Preserved a curated set of games from the original project while allowing the live FreeToGame browser catalog to augment it.

## Why the iframe fallback exists

Third-party sites can block embedding with `X-Frame-Options` or CSP `frame-ancestors`. A frontend cannot reliably override those response headers. PlayVerse therefore treats embedding as an explicit, curated capability and provides a direct external launch when embedding is blocked.

## Local development

```bash
npm install
cp .env.example .env
npm run dev
```

Open `http://localhost:5173`.

## Optional PC catalog

Create `.env` and add your RAWG key:

```env
RAWG_API_KEY=your_server_only_key
```

Never expose that key to browser JavaScript.

## Production

```bash
npm install
npm run build
npm run server
```

The Express server serves `dist` after the Vite build.

## Notes

The contact API intentionally logs accepted demo submissions rather than pretending to deliver email. Connect it to a mail or ticketing provider before production launch.

Game links and third-party game content remain subject to the policies and security restrictions of their respective providers.

## Game data + monetization architecture

PlayVerse intentionally separates **game metadata**, **game launching**, and **advertising**:

- Browser discovery comes from a curated fallback plus the FreeToGame catalog API. The backend normalizes remote data, caches it for five minutes, and keeps provider URLs out of arbitrary client fetch logic.
- PC discovery uses RAWG through the server only. RAWG requires an API key on every request and its current free plan has usage/attribution conditions, so `RAWG_API_KEY` stays server-side and the UI does not expose it.
- Third-party games are launched either in a sandboxed iframe when explicitly marked `embedEligible` or directly in a new tab. PlayVerse does **not** inject ads into third-party game documents.
- AdSense slots are page-level placements (`AdSlot`) around the game experience. They are disabled until you configure the public AdSense client and slot IDs. For EEA/UK/Switzerland traffic, configure Google's consent flow/certified CMP as required before serving personalized advertising.
- For games you own and control, use the game's own monetization SDK/H5 game ad placement system instead of trying to alter a third-party iframe.

## Production checklist

1. Rotate the old RAWG credential that was previously committed to the public repository.
2. Add a Google-certified consent management solution for relevant traffic before personalized ads.
3. Replace the demo contact handler with a real support/ticketing provider and add persistent moderation/audit storage.
4. Test every external game URL and remove any game whose publisher does not permit embedding/redistribution.
5. Run `npm install`, `npm run lint`, `npm run test`, and `npm run build` before deployment.

## Research references

- FreeToGame API: https://www.freetogame.com/api-doc
- RAWG API: https://rawg.io/apidocs
- Google AdSense H5 Games Ads: https://support.google.com/adsense/answer/9959170
- Google EU consent requirements: https://support.google.com/adsense/answer/13554116
- CrazyGames SDK / ads: https://docs.crazygames.com/sdk/intro/
- Poki SDK / ads: https://developers.poki.com/guide/sdk-overview
- GameMonetize publisher FAQ: https://gamemonetize.com/faq
