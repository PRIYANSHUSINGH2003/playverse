import { useEffect, useRef } from 'react';

const SCRIPT_ID = 'playverse-adsense-script';

function loadAdSense(client) {
  return new Promise((resolve, reject) => {
    if (!client) return reject(new Error('Missing AdSense client ID'));
    if (window.adsbygoogle) return resolve();
    const existing = document.getElementById(SCRIPT_ID);
    if (existing) {
      existing.addEventListener('load', resolve, { once: true });
      existing.addEventListener('error', reject, { once: true });
      return;
    }
    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(client)}`;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

export default function AdSlot({ slot, format = 'auto', responsive = true, label = 'Advertisement', className = '' }) {
  const ref = useRef(null);
  const client = import.meta.env.VITE_ADSENSE_CLIENT?.trim();
  const enabled = Boolean(client && slot);

  useEffect(() => {
    if (!enabled || !ref.current) return undefined;
    let cancelled = false;
    loadAdSense(client)
      .then(() => {
        if (cancelled || !ref.current || !window.adsbygoogle) return;
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (error) {
          console.warn('AdSense slot could not be initialized:', error);
        }
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [client, enabled, slot]);

  if (!enabled) {
    return (
      <aside className={`ad-slot ad-slot-placeholder ${className}`} aria-label={label}>
        <span>Advertisement</span>
        <small>Configure VITE_ADSENSE_CLIENT and VITE_ADSENSE_SLOT to enable production ads.</small>
      </aside>
    );
  }

  return (
    <aside className={`ad-slot ${className}`} aria-label={label}>
      <span className="ad-label">{label}</span>
      <ins
        ref={ref}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </aside>
  );
}
