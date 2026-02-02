import { Suspense, useEffect, useRef, useState } from "react";

/**
 * LazyCanvas - Wraps Canvas components to only render when in viewport
 * This significantly improves performance by not rendering off-screen 3D scenes
 */
const LazyCanvas = ({
  children,
  fallback = null,
  threshold = 0.1,
  rootMargin = "50px",
}) => {
  const [inView, setInView] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            // Keep observing to handle re-entry
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin]);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
      {inView ? (
        <Suspense
          fallback={
            fallback || (
              <div
                style={{ width: "100%", height: "100%", background: "#000" }}
              />
            )
          }
        >
          {children}
        </Suspense>
      ) : (
        fallback || (
          <div style={{ width: "100%", height: "100%", background: "#000" }} />
        )
      )}
    </div>
  );
};

export default LazyCanvas;
