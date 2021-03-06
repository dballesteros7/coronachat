import React, { useState, useContext } from 'react';
import './Login.scss';
import { Dialog, TextField, DialogActions, Button, LinearProgress } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Routes } from '../../App';
import { useHistory } from 'react-router-dom';
import { User } from '../../model/model';
import { UserContext } from '../../providers/UserProvider/UserProvider';
import { useCoronaChatAPIContext } from '../../providers/api/CoronaChatAPIInterface';

type LoginDialogProps = {
  onLoginClose: () => void;
};

const Login = (props: LoginDialogProps) => {
  const [t] = useTranslation();
  const { onLogin, setOrganizationId } = useContext(UserContext);
  const coronaChatAPI = useCoronaChatAPIContext();
  const history = useHistory();

  const [username, setUsername] = useState('');
  const [isUsernameErrorEnabled, setUsernameErrorEnabled] = useState(false);
  const [password, setPassword] = useState('');
  const [isPasswordErrorEnabled, setPasswordErrorEnabled] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const performLogin = () => {
    setIsLoggingIn(true);
    coronaChatAPI
      .login(username, password)
      .then((user: User) => {
        console.debug('Login successful', user);
        onLogin(user);
        // Clear the history when loggin in:
        // if user history was: home -> trial -> home -> login -> dashboard) and user pressed back
        // it would endup from their dashboard to the trial one and this could be confusing
        history.go(-history.length);
        history.replace(Routes.Dashboard);
        coronaChatAPI.getOrganizationId().then((organizationId: string) => onLogin({ ...user, id: organizationId }));
      })
      .finally(() => setIsLoggingIn(false));
  };

  const onUsernameChanged = (newValue: string) => {
    setUsername(newValue);
    setUsernameErrorEnabled(true);
  };
  const onPasswordChanged = (newValue: string) => {
    setPassword(newValue);
    setPasswordErrorEnabled(true);
  };
  const onKeyPressedOnPasswordField = (key: string) => {
    if (key === 'Enter') {
      performLogin();
    }
  };

  return (
    <Dialog className="Login" onClose={props.onLoginClose} aria-labelledby="simple-dialog-title" open={true}>
      {isLoggingIn && <LinearProgress />}
      <div className="covid-container">
        <span className="covid-title-box">
          <h3 className="covid-title">{t('LOGIN.USERNAME')}</h3>
        </span>
        <div className={isUsernameErrorEnabled && !username ? 'ErrorField' : ''}>
          <TextField
            fullWidth
            error={isUsernameErrorEnabled && !username}
            helperText={t('LOGIN.USERNAME_CANT_BE_EMPTY')}
            placeholder={t('LOGIN.USERNAME')}
            value={username}
            variant="outlined"
            onChange={(e) => onUsernameChanged(e.target.value)}
          />
        </div>

        <span className="covid-title-box">
          <h3 className="covid-title">{t('LOGIN.PASSWORD')}</h3>
        </span>
        <div className={isPasswordErrorEnabled && !password ? 'ErrorField' : ''}>
          <TextField
            fullWidth
            error={isPasswordErrorEnabled && !password}
            helperText={t('LOGIN.PASSWORD_CANT_BE_EMPTY')}
            placeholder={t('LOGIN.PASSWORD')}
            value={password}
            variant="outlined"
            type="password"
            onChange={(e) => onPasswordChanged(e.target.value)}
            onKeyPress={(e) => onKeyPressedOnPasswordField(e.key)}
          />
        </div>
      </div>
      <DialogActions>
        <Button onClick={props.onLoginClose} color="primary">
          {t('ACTIONS.CANCEL')}
        </Button>
        <Button
          onClick={performLogin}
          disabled={!username || !password}
          color="primary"
          style={{ fontWeight: 'bold' }}
          autoFocus
        >
          {t('LOGIN.LOG_IN')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Login;
