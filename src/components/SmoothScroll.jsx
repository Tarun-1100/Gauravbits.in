import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
  const mainRef = useRef(null);
  const scrollerRef = useRef(null);
  const dataRef = useRef({
    ease: 0.1,
    current: 0,
    previous: 0,
    rounded: 0
  });

  useEffect(() => {
    // Set CSS for smooth scrolling
    if (mainRef.current) {
      requestAnimationFrame(() => skewScrolling());
    }

    // Setup ScrollTrigger
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const skewScrolling = () => {
    const data = dataRef.current;
    data.current = window.scrollY;
    data.previous += (data.current - data.previous) * data.ease;
    data.rounded = Math.round(data.previous * 100) / 100;

    if (scrollerRef.current) {
      scrollerRef.current.style.transform = `translate3d(0, -${data.rounded}px, 0)`;
    }

    requestAnimationFrame(() => skewScrolling());
  };

  useEffect(() => {
    const setBodyHeight = () => {
      if (scrollerRef.current) {
        document.body.style.height = `${scrollerRef.current.getBoundingClientRect().height}px`;
      }
    };
    setBodyHeight();
    window.addEventListener('resize', setBodyHeight);
    return () => window.removeEventListener('resize', setBodyHeight);
  }, []);

  return (
    <div ref={mainRef} className="smooth-scroll-container">
      <div
        ref={scrollerRef}
        className="smooth-scroller"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          willChange: 'transform'
        }}
      >
        {children}
      </div>
    </div>
  );
}
