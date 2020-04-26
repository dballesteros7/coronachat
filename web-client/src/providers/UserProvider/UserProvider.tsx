import React, { ReactNode, useState } from 'react';
import { User } from '../../model/model';
import useLocalStorage from '../../hooks/useLocalStorage';

export const UserContext = React.createContext({
  user: { id: '', isLoggedIn: false },
  hasSessionExpired: false,
  onLogin: (_: User) => {},
  onLogout: (_: boolean = false) => {},
});

const UserProvider = (props: { children: ReactNode }) => {
  let [user, setUser] = useLocalStorage('user', { id: '', isLoggedIn: false });
  let [hasSessionExpired, setHasSessionExpired] = useState(false);

  const onLogin = (user: User) => {
    setHasSessionExpired(false);
    setUser(user);
  };
  const onLogout = (hasSessionExpired: boolean = false) => {
    setHasSessionExpired(hasSessionExpired);
    setUser(undefined);
  };

  return (
    <UserContext.Provider
      value={{ user: user, hasSessionExpired: hasSessionExpired, onLogin: onLogin, onLogout: onLogout }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
