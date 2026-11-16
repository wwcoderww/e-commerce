import { useEffect, useRef } from 'react';

export default function useOutsideClick(aCallBack: () => void) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent | TouchEvent) {
      if (!ref.current || ref.current.contains(e.target as Node)) return;
      aCallBack();
    }
    document.addEventListener('mouseup', handleClick);
    document.addEventListener('touchend', handleClick);
    return () => {
      document.removeEventListener('mouseup', handleClick);
      document.removeEventListener('touchend', handleClick);
    };
  }, [aCallBack]);

  return ref;
}
