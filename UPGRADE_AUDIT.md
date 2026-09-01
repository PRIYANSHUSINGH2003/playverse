# PlayVerse Upgrade Audit

## Original issues identified

1. **Credential exposure:** the original server source contained a RAWG API key directly in the repository.
2. **Data loading:** the home page simulated a delay and then made multiple provider requests sequentially, increasing time-to-content and making the UI depend on external services.
3. **Schema mismatch:** the FreeToGame and RAWG payloads were merged with different field names and assumptions.
4. **Broken link:** one curated game URL had an extra leading quote; another URL used plain HTTP.
5. **Duplicate theme state:** the app and individual pages each managed their own dark-mode state, causing inconsistent themes between routes.
6. **Contact form:** the original form only logged to the browser console and gave the user no durable success/error state.
7. **Iframe reliability:** the player assumed external pages would render inside an iframe. Modern response headers can intentionally block this.
8. **Accessibility:** game cards relied on a clickable `<div>` pattern; navigation and controls lacked consistent semantics and keyboard-first behavior.
9. **Responsive behavior:** layout styling was split across multiple component CSS files and did not provide a coherent mobile navigation model.
10. **State persistence:** favorites/search/theme/recent-play preferences were not treated as first-class user state.

## Real-world improvements

- Provider failures no longer make the whole product empty: curated titles remain available.
- The browser catalog is cached by the API for 5 minutes.
- URL normalization rejects unsupported schemes server-side.
- External game pages open with `noopener noreferrer`.
- Curated iframe embeds use a sandbox and no-referrer policy; non-embeddable titles use direct launch.
- Local preferences are stored under a PlayVerse v2 namespace, avoiding collisions with older localStorage keys.
- The app is usable at mobile widths down to small phones and supports reduced-motion preferences.

## Verification checklist

- [ ] `npm install`
- [ ] `npm run build`
- [ ] `npm run dev`
- [ ] `npm run server` after build
- [ ] Set `RAWG_API_KEY` only on the server when PC metadata is needed
- [ ] Verify every third-party game provider permits the intended embedding/distribution model before production release
