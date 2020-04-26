import React, { useContext } from 'react';
import './DashboardAuthCheck.scss';
import MainMessage from '../../pages/MainMessage/MainMessage';
import { Redirect } from 'react-router-dom';
import { Routes } from '../../App';
import { UserContext } from '../../providers/UserProvider/UserProvider';

const DashboardAuthCheck = () => {
  const { user } = useContext(UserContext);

  return user.isLoggedIn ? <MainMessage isTrial={false} /> : <Redirect to={Routes.Root}></Redirect>;
};

export default DashboardAuthCheck;
