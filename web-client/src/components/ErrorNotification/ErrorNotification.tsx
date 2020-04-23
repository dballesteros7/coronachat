import React, { useContext, useEffect, useState } from 'react';
import './ErrorNotification.scss';
import { ErrorHandlingContext } from '../../providers/ErrorHandlingProvider/ErrorHandlingProvider';
import { Snackbar, makeStyles, Theme } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { useTranslation } from 'react-i18next';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const ErrorNotification = () => {
  const { t } = useTranslation();
  const { error } = useContext(ErrorHandlingContext);
  const classes = useStyles();
  const [shownError, setShownError] = useState(error);

  useEffect(() => {
    setShownError(error);
  }, [error]);

  const onSnackbarClosed = () => {
    setShownError({ errorMsgLocalisationKey: '' });
  };

  return (
    <div className={classes.root}>
      <Snackbar
        open={shownError.errorMsgLocalisationKey?.length > 0}
        autoHideDuration={shownError.autoclose ? 5_000 : null}
        onClose={onSnackbarClosed}
      >
        <Alert severity="error" onClose={onSnackbarClosed}>
          {t(error.errorMsgLocalisationKey)}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ErrorNotification;
