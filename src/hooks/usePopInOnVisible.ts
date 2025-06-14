
import { useEffect, useRef } from "react";

/**
 * Hook to add a className when the element comes into view
 * @param showClass class to add when visible (e.g. 'show-fast-pop-in')
 * @returns ref to assign to the observed element
 */
const usePopInOnVisible = (showClass: string = "show-fast-pop-in") => {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          el.classList.add(showClass);
        } else {
          el.classList.remove(showClass);
        }
      });
    };

    const observer = new window.IntersectionObserver(onIntersect, {
      threshold: 0.18,
    });

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [showClass]);

  return ref;
};

export default usePopInOnVisible;
