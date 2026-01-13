import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
  const mainRef = useRef(null);

  useEffect(() => {
    // Refresh ScrollTrigger when component mounts
    ScrollTrigger.refresh();

    // Optional: Add smooth scroll behavior
    const handleWheel = (e) => {
      if (e.ctrlKey) return; // Allow browser zoom
    };

    window.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="smooth-scroll-container">
      {children}
    </div>
  );
}
