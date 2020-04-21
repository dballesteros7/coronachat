import React, { useState } from 'react';
import './Login.scss';
import { Dialog, TextField, DialogActions, Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

type LoginDialogProps = {
  onLoginClose: () => void;
};

const Login = (props: LoginDialogProps) => {
  const [t] = useTranslation();
  const [username, setUsername] = useState('');
  const [isUsernameErrorEnabled, setUsernameErrorEnabled] = useState(false);
  const [password, setPassword] = useState('');
  const [isPasswordErrorEnabled, setPasswordErrorEnabled] = useState(false);

  const onLoginClicked = () => {};
  const onUsernameChanged = (newValue: string) => {
    setUsername(newValue);
    setUsernameErrorEnabled(true);
  };
  const onPasswordChanged = (newValue: string) => {
    setPassword(newValue);
    setPasswordErrorEnabled(true);
  };

  return (
    <Dialog className="Login" onClose={props.onLoginClose} aria-labelledby="simple-dialog-title" open={true}>
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
          />
        </div>
      </div>
      <DialogActions>
        <Button onClick={props.onLoginClose} color="primary">
          {t('ACTIONS.CANCEL')}
        </Button>
        <Button onClick={onLoginClicked} color="primary" style={{ fontWeight: 'bold' }} autoFocus>
          {t('LOGIN.LOG_IN')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Login;
