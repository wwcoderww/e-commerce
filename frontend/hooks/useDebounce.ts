import { useEffect, useState } from 'react';

export default function useDebounce(
  userInput: string,
  delay: number = 300,
): string {
  const [debounceValue, setDebounceValue] = useState<string>(userInput);
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setDebounceValue(userInput);
    }, delay);
    return () => clearTimeout(timeOut);
  }, [userInput, delay]);
  return debounceValue;
}
