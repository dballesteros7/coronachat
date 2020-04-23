import './ErrorHandlingProvider.scss';
import React, { ReactNode, useState } from 'react';

/**
 * @param autoclose default is false
 */
export type AppError = {
  errorMsgLocalisationKey: string;
  autoclose?: boolean;
};

const emptyMessage: AppError = { errorMsgLocalisationKey: '' };
export const ErrorHandlingContext = React.createContext({ error: emptyMessage, handleAppError: (_: AppError) => {} });

const ErrorHandlingProvider = (props: { children: ReactNode }) => {
  const [error, setError] = useState(emptyMessage);
  const handleAppError = (error: AppError) => {
    // Centralized error handling
    setError(error);
  };
  return (
    <ErrorHandlingContext.Provider value={{ error: error, handleAppError: handleAppError }}>
      {props.children}
    </ErrorHandlingContext.Provider>
  );
};

export default ErrorHandlingProvider;
