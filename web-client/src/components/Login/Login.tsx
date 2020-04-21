import React from 'react';
import './Login.scss';
import { Dialog, IconButton, TextField, DialogActions, Button } from '@material-ui/core';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import { useTranslation } from 'react-i18next';

type LoginDialogProps = {
  onLoginClose: () => void;
};

const Login = (props: LoginDialogProps) => {
  const [t] = useTranslation();

  const onLoginClicked = () => {};
  return (
    <Dialog onClose={props.onLoginClose} aria-labelledby="simple-dialog-title" open={true}>
      <div className="covid-container">
        <span className="covid-title-box">
          <h3 className="covid-title">{t('LOGIN.USERNAME')}</h3>
        </span>
        <TextField
          fullWidth
          // error={isUsernameErrorEnabled && getIsTitleInvalid(props.menuItem.title)}
          error={false}
          helperText={t('LOGIN.USERNAME_CANT_BE_EMPTY')}
          placeholder={t('LOGIN.USERNAME')}
          value={''}
          variant="outlined"
          // onChange={(e) => onTitleChanged(e.target.value)}
        />

        <span className="covid-title-box">
          <h3 className="covid-title">{t('LOGIN.PASSWORD')}</h3>
        </span>
        <TextField
          fullWidth
          // error={isUsernameErrorEnabled && getIsTitleInvalid(props.menuItem.title)}
          error={false}
          helperText={t('LOGIN.PASSWORD_CANT_BE_EMPTY')}
          placeholder={t('LOGIN.PASSWORD')}
          value={''}
          variant="outlined"
          // onChange={(e) => onTitleChanged(e.target.value)}
        />
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
