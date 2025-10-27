import { useCallback, useState } from 'react';

export function useToggle(initialValue) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue((prevValue) => !prevValue);
  }, []);

  return [value, toggle];
}
