import React, { ReactNode } from 'react';
import { User } from '../../model/model';
import useLocalStorage from '../../hooks/useLocalStorage';

export const UserContext = React.createContext({
  user: { id: '', authToken: '' },
  onLogin: (_: User) => {},
  onLogout: () => {},
});

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
