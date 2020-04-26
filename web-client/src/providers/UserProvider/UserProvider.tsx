import React, { ReactNode, useState, useContext } from 'react';
import { User } from '../../model/model';
import useLocalStorage from '../../hooks/useLocalStorage';
import { CoronaChatAPIContext } from '../api/CoronaChatAPIInterface';

type UserContext = {
  user: User | undefined;
  hasSessionExpired: boolean;
  onLogin: (_: User) => void;
  onLogout: (_?: boolean) => void;
};

const initUserContext = {
  user: undefined,
  hasSessionExpired: false,
  onLogin: (_: User) => {},
  onLogout: (_: boolean = false) => {},
};

export const UserContext = React.createContext<UserContext>(initUserContext);

const UserProvider = (props: { children: ReactNode }) => {
  const [user, setUser] = useLocalStorage<User | undefined>('user', undefined);
  const [hasSessionExpired, setHasSessionExpired] = useState(false);
  const coronaChatAPI = useContext(CoronaChatAPIContext);

  const onLogin = (user: User) => {
    setHasSessionExpired(false);
    setUser(user);
    coronaChatAPI
      ?.getOrganizationId()
      .then((organizationId) => (user ? setUser({ ...user, id: organizationId }) : null));
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
