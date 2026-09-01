const paths = {
  search: 'M11 19a8 8 0 1 1 5.29-14.01A8 8 0 0 1 11 19Zm0 0 8 4',
  heart: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z',
  sun: 'M12 3V1m0 22v-2M4.22 4.22 2.81 2.81m18.38 18.38-1.41-1.41M3 12H1m22 0h-2M4.22 19.78l-1.41 1.41M20.19 3.81l-1.41 1.41M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z',
  moon: 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z',
  menu: 'M4 6h16M4 12h16M4 18h16',
  x: 'M6 6l12 12M18 6 6 18',
  play: 'M8 5v14l11-7Z',
  share: 'M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 15a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM8.7 16.5l6.6-3.7M8.7 7.5l6.6 3.7',
  external: 'M14 3h7v7M10 14 21 3M21 14v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h6',
  arrow: 'M5 12h14m-6-6 6 6-6 6',
  filter: 'M4 5h16M7 12h10M10 19h4',
  star: 'm12 3 2.8 5.67 6.2.9-4.5 4.36 1.06 6.15L12 17.17l-5.56 2.91 1.06-6.15L3 9.57l6.2-.9L12 3Z',
  refresh: 'M20 11a8.1 8.1 0 0 0-14.7-4.7L3 9m0 0h6M4 13a8.1 8.1 0 0 0 14.7 4.7L21 15m0 0h-6',
  fullscreen: 'M8 3H5a2 2 0 0 0-2 2v3m13-5h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3m18 0v3a2 2 0 0 1-2 2h-3',
  back: 'M19 12H5m7 7-7-7 7-7',
};
export default function Icon({ name, size = 20, strokeWidth = 1.8 }) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"><path d={paths[name] || paths.play} /></svg>;
}
