import React, { useState, useRef, useContext } from 'react';
import './Login.scss';
import {
  Dialog,
  TextField,
  DialogActions,
  Button,
  LinearProgress,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { CoronaChatAPI } from '../../services/CoronaChatAPI';
import { UserContext } from '../../App';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    errorMessage: {
      color: theme.palette.error.main,
    },
  })
);

type LoginDialogProps = {
  onLoginClose: () => void;
};

const Login = (props: LoginDialogProps) => {
  const [t] = useTranslation();
  const classes = useStyles();
  const { setUser } = useContext(UserContext);

  const [username, setUsername] = useState('');
  const [isUsernameErrorEnabled, setUsernameErrorEnabled] = useState(false);
  const [password, setPassword] = useState('');
  const [isPasswordErrorEnabled, setPasswordErrorEnabled] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const coronaChatAPI = useRef(new CoronaChatAPI());

  const onLoginClicked = () => {
    setIsLoggingIn(true);
    coronaChatAPI.current
      .login(username, password)
      .then((user) => {
        console.debug('Login successful', user);
        setUser(user);
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage(error);
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
          />
        </div>
        {errorMessage && <div className={classes.errorMessage}>{errorMessage}</div>}
      </div>
      <DialogActions>
        <Button onClick={props.onLoginClose} color="primary">
          {t('ACTIONS.CANCEL')}
        </Button>
        <Button
          onClick={onLoginClicked}
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
