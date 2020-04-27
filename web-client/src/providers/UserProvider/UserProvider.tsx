import React, { ReactNode, useState, useCallback } from 'react';
import { User } from '../../model/model';
import useLocalStorage from '../../hooks/useLocalStorage';

type UserContext = {
  user: User | undefined;
  hasSessionExpired: boolean;
  onLogin: (_: User) => void;
  onLogout: (_?: boolean) => void;
  setOrganizationId: (_: string) => void;
};

const initUserContext = {
  user: undefined,
  hasSessionExpired: false,
  onLogin: (_: User) => {},
  onLogout: (_: boolean = false) => {},
  setOrganizationId: (_: string) => {},
};

export const UserContext = React.createContext<UserContext>(initUserContext);

const UserProvider = (props: { children: ReactNode }) => {
  const [user, setUser] = useLocalStorage<User | undefined>('user', undefined);
  const [hasSessionExpired, setHasSessionExpired] = useState(false);

  // TODO(MB) useCallback for following functions

  const onLogin = (user: User) => {
    setHasSessionExpired(false);
    setUser(user);
  };
  const onLogout = (hasSessionExpired: boolean = false) => {
    setHasSessionExpired(hasSessionExpired);
    setUser(undefined);
  };

  const setOrganizationId = useCallback(
    (organizationId: string) => {
      // TODO(MB) why is user undefined if this callback gets executed after onLogin?
      // replace onLogin in coronaChatAPI.getOrganizationId().then((organizationId: string) => onLogin({ ...user, id: organizationId }));
      // with setOrganizationId and test
      return user ? setUser({ ...user, id: organizationId }) : null;
    },
    [user, setUser]
  );

  return (
    <UserContext.Provider
      value={{
        user: user,
        hasSessionExpired: hasSessionExpired,
        onLogin: onLogin,
        onLogout: onLogout,
        setOrganizationId: setOrganizationId,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
