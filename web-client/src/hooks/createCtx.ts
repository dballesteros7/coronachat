import React, { Provider } from 'react';

/**
 * This is a wrapper arounf React.createContext that allows to set the initial context value to undefined.
 * It also allows to use the (unwrapped) context value without checking each time whether it is undefined.
 * @throws If calling useCtx (trying to use the context) when context value is undefined.
 * @returns Returns the function that returns the unwrapped context value, and the context provider.
 */
export const createCtx = <T>(): [() => T, Provider<T | undefined>] => {
  const ctx = React.createContext<T | undefined>(undefined);
  const useCtx = () => {
    const c = React.useContext(ctx);
    if (!c) {
      throw new Error(
        'useCtx must be called inside a Provider with a non undefined value. You may have forgot to set a value to the context which is still undefined.'
      );
    } else {
      return c;
    }
  };
  return [useCtx, ctx.Provider];
};
