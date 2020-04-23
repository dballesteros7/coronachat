import React, { ReactNode, useState } from 'react';
import { User } from '../../model/model';

export const UserContext = React.createContext({
  user: { id: '', authToken: '' },
  onLogin: (_: User) => {},
  onLogout: () => {},
});

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

  const onLogin = (user: User) => {
    setUser(user);
  };
  const onLogout = () => {
    setUser(undefined);
  };

  return (
    <UserContext.Provider value={{ user: user, onLogin: onLogin, onLogout: onLogout }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
