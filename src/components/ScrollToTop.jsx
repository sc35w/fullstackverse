import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Scroll to the top when the route changes; in-page #anchors still work.
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}
