import { useEffect } from 'react';

export default function TrackingScripts() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    console.log('Google Analytics placeholder - Add your GA tracking ID');
    console.log('Meta Pixel placeholder - Add your Meta Pixel ID');
    console.log('TikTok Pixel placeholder - Add your TikTok Pixel ID');
  }, []);

  return null;
}
