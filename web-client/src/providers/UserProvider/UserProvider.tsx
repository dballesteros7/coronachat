import React, { ReactNode, useState } from 'react';
import { User } from '../../model/model';

export const UserContext = React.createContext({ user: { id: '', authToken: '' }, setUser: (_?: User) => {} });

const useLocalStorage = <T,>(key: string, defaultState: T): [T, (newValue?: T) => void] => {
  const initState = () => JSON.parse(window.localStorage.getItem(key) || JSON.stringify(defaultState)) as T;
  const [storageValue, setStorageInState] = useState(initState);
  const setStorageValue = (newValue?: T) => {
    setStorageInState(newValue ?? defaultState);
    newValue ? window.localStorage.setItem(key, JSON.stringify(newValue)) : window.localStorage.removeItem(key);
  };
  return [storageValue, setStorageValue];
};

const UserProvider = (props: { children: ReactNode }) => {
  let [user, setUser] = useLocalStorage('user', { id: '', authToken: '' });

  return <UserContext.Provider value={{ user: user, setUser: setUser }}>{props.children}</UserContext.Provider>;
};

export default UserProvider;
