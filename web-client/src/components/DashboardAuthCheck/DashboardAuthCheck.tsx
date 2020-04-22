import React, { useContext } from 'react';
import './DashboardAuthCheck.scss';
import MainMessage, { DashboardState } from '../../pages/MainMessage/MainMessage';
import { Redirect, useLocation } from 'react-router-dom';
import { UserContext, Routes } from '../../App';
import { isUserLoggedIn } from '../../lib/utils';

const DashboardAuthCheck = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const isTrial = (location.state as DashboardState)?.isTrial ?? false;

  return !isTrial && !isUserLoggedIn(user) ? <Redirect to={Routes.Root}></Redirect> : <MainMessage isTrial={isTrial} />;
};

export default DashboardAuthCheck;
