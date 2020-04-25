import React, { useContext } from 'react';
import './DashboardAuthCheck.scss';
import MainMessage from '../../pages/MainMessage/MainMessage';
import { Redirect } from 'react-router-dom';
import { Routes } from '../../App';
import { isUserLoggedIn } from '../../lib/utils';
import { UserContext } from '../../providers/UserProvider/UserProvider';

const DashboardAuthCheck = () => {
  const { user } = useContext(UserContext);

  return isUserLoggedIn(user) ? <MainMessage isTrial={false} /> : <Redirect to={Routes.Root}></Redirect>;
};

export default DashboardAuthCheck;
