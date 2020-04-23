import React, { useContext } from 'react';
import './DashboardAuthCheck.scss';
import MainMessage from '../../pages/MainMessage/MainMessage';
import { Redirect } from 'react-router-dom';
import { Routes } from '../../App';
import { isUserLoggedIn } from '../../lib/utils';
import { UserContext } from '../../providers/UserProvider/UserProvider';

const DashboardAuthCheck = () => {
  const { user } = useContext(UserContext);

  return !isUserLoggedIn(user) ? <Redirect to={Routes.Root}></Redirect> : <MainMessage isTrial={false} />;
};

export default DashboardAuthCheck;
