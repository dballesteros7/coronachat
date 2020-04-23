import './ErrorHandlingProvider.scss';
import { SnackbarProvider, useSnackbar } from 'notistack';
import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * @param autoclose default is false
 */
export type AppError = {
  errorMsgLocalisationKey: string;
  autoclose?: boolean;
};

export const ErrorHandlingContext = React.createContext({ handleAppError: (_: AppError) => {} });

const ErrorHandler = (props: { children: ReactNode }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const handleAppError = (error: AppError) => {
    // Centralized error handling

    enqueueSnackbar(t(error.errorMsgLocalisationKey), {
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
