import { useState } from 'react';

const useLocalStorage = <T>(key: string, defaultState: T): [T, (newValue?: T) => void] => {
  const initState = () => JSON.parse(window.localStorage.getItem(key) || JSON.stringify(defaultState)) as T;
  const [storageValue, setStorageInState] = useState(initState);
  const setStorageValue = (newValue?: T) => {
    setStorageInState(newValue ?? defaultState);
    newValue ? window.localStorage.setItem(key, JSON.stringify(newValue)) : window.localStorage.removeItem(key);
  };
  return [storageValue, setStorageValue];
};

export default useLocalStorage;
