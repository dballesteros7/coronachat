import { SnackbarProvider, useSnackbar } from 'notistack';
import React, { ReactNode, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { UserContext } from '../UserProvider/UserProvider';

/**
 * @param autoclose default is false
 */
export type AppError = {
  errorMsgLocalisationKey: string;
  autoclose?: boolean;
  statusCode?: number;
};

export const ErrorHandlingContext = React.createContext({ handleAppError: (_: AppError) => {} });

const ErrorHandler = (props: { children: ReactNode }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const { onLogout } = useContext(UserContext);

  const handleAppError = (error: AppError) => {
    // Centralized error handling
    let errorMsg;
    switch (error.statusCode) {
      case 401:
        errorMsg = t('ERRORS.EXPIRED_LOGIN_SESSION');
        onLogout(true);
        break;
      default:
        errorMsg = t(error.errorMsgLocalisationKey);
    }

    enqueueSnackbar(errorMsg, {
      variant: 'error',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center',
      },
    });
  };

  return (
    <ErrorHandlingContext.Provider value={{ handleAppError: handleAppError }}>
      {props.children}
    </ErrorHandlingContext.Provider>
  );
};

const ErrorHandlingProvider = (props: { children: ReactNode }) => {
  return (
    <SnackbarProvider maxSnack={3}>
      <ErrorHandler {...props} />
    </SnackbarProvider>
  );
};

export default ErrorHandlingProvider;
