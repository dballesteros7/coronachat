import { useState } from 'react';

const useLocalStorage = <T>(key: string, defaultState?: T): [T | undefined, (newValue?: T) => void] => {
  const initState = () => {
    const storedState = window.localStorage.getItem(key);
    if (storedState) {
      return JSON.parse(storedState) as T;
    } else {
      return defaultState ? (JSON.parse(JSON.stringify(defaultState)) as T) : undefined;
    }
  };
  const [storageValue, setStorageInState] = useState<T | undefined>(initState);
  const setStorageValue = (newValue?: T) => {
    setStorageInState(newValue ?? defaultState);
    newValue ? window.localStorage.setItem(key, JSON.stringify(newValue)) : window.localStorage.removeItem(key);
  };
  return [storageValue, setStorageValue];
};

export default useLocalStorage;
