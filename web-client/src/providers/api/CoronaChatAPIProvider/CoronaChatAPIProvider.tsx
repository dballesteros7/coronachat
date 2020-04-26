import React, { ReactNode, useContext, useRef } from 'react';
import { CoronaChatAPIContext } from '../CoronaChatAPIInterface';
import { ErrorHandlingContext, AppError } from '../../ErrorHandlingProvider/ErrorHandlingProvider';
import { Template, User } from '../../../model/model';

const baseURL = 'http://development.eba-4rmdgwec.eu-west-1.elasticbeanstalk.com';
// const baseURL = 'https://app.coronainfochat.org';

const getOrganizationURL = `${baseURL}/organization`;
const getTemplateURL = `${baseURL}/getTemplate`;
const getDefaultTemplateURL = `${baseURL}/getDefaultTemplate`;
const updateTemplateURL = `${baseURL}/updateTemplate`;
const loginURL = `${baseURL}/login`;
const logoutURL = `${baseURL}/logout`;

const parseResponse = (
  response: Response,
  requestStringURL: string,
  requestDescription: string,
  errorMsgLocalisationKey: string
) => {
  if (!response.ok) {
    const responseStatus = `Response status ${response.status} ${response.statusText}`;
    const reason = `Error occurred ${requestDescription} 
        ${requestStringURL}. ${responseStatus}`;
    return Promise.reject({
      reason: reason,
      appError: { errorMsgLocalisationKey: errorMsgLocalisationKey, statusCode: response.status },
    });
  } else {
    return response.json().catch((error) => {
      const reason = `Response json parsing error when ${requestDescription} 
        ${requestStringURL}: ${error}`;
      return Promise.reject({
        reason: reason,
        appError: { errorMsgLocalisationKey: errorMsgLocalisationKey },
      });
    });
  }
};

const getTemplateFromURL = (
  url: URL,
  errorMsgLocalisationKey: string,
  handleAppError: (_: AppError) => void
): Promise<Template> => {
  const performFetch = () => {
    return fetch(url.href, {
      credentials: 'include', // needed to set the cookie in cross site requests
    }).catch((error) => {
      const reason = `Error occurred when getting template from
        ${url}. Fetch rejected (for ex. network or CORS error): ${error}`;
      return Promise.reject({
        reason: reason,
        appError: { errorMsgLocalisationKey: errorMsgLocalisationKey },
      });
    });
  };

  const promise = new Promise<Template>((resolve, reject) => {
    performFetch()
      .then((response) =>
        parseResponse(response, url.toString(), 'when getting template from', errorMsgLocalisationKey)
      )
      .then((response: Template) => {
        if (response) {
          resolve(response);
        } else {
          const reason = `Unexpected response from server when getting template 
            from ${url}`;
          return Promise.reject({
            reason: reason,
            appError: { errorMsgLocalisationKey: errorMsgLocalisationKey },
          });
        }
      })
      .catch(({ reason, appError }) => {
        // reason contains specific error; appError is a more general msg shown to the user
        console.error(reason);
        reject(reason);
        handleAppError(appError);
      });
  });
  return promise;
};

const CoronaChatAPIProvider = (props: { children: ReactNode }) => {
  const { handleAppError } = useContext(ErrorHandlingContext);

  const APIs = useRef({
    getOrganizationId: () => {
      var url = new URL(getOrganizationURL);

      type OrganizationResponse = {
        name?: string;
      };

      const appError: AppError = { errorMsgLocalisationKey: '', silent: true };

      const performFetch = () => {
        return fetch(url.href, {
          credentials: 'include', // needed to set the cookie in cross site requests
        }).catch((error) => {
          const reason = `Error occurred when getting organization from
            ${url}. Fetch rejected (for ex. network or CORS error): ${error}`;
          return Promise.reject({
            reason: reason,
            appError: appError,
          });
        });
      };

      const promise = new Promise<string>((resolve, reject) => {
        performFetch()
          .then((response) => parseResponse(response, url.toString(), 'when getting template from', ''))
          .then((response: OrganizationResponse) => {
            if (response.name) {
              resolve(response.name);
            } else {
              const reason = `Unexpected response from server when getting template 
                from ${url}`;
              return Promise.reject({
                reason: reason,
                appError: appError,
              });
            }
          })
          .catch(({ reason, appError }) => {
            // reason contains specific error; appError is a more general msg shown to the user
            console.error(reason);
            reject(reason);
            // The errors occurring during this request should not be notfiied to the user
            appError.silent = true;
            handleAppError(appError);
          });
      });
      return promise;
    },
    getTemplate: () => {
      var url = new URL(getTemplateURL);
      return getTemplateFromURL(url, 'ERRORS.GET_TEMPLATE_ERROR', handleAppError);
    },
    getDefaultTemplate: () => {
      var url = new URL(getDefaultTemplateURL);
      return getTemplateFromURL(url, 'ERRORS.GET_DEFAULT_TEMPLATE_ERROR', handleAppError);
    },
    updateTemplate: (template: Template) => {
      var url = new URL(updateTemplateURL);

      const performFetch = () => {
        return fetch(url.href, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'include', // needed to set the cookie in cross site requests
          body: JSON.stringify(template),
        }).catch((error) => {
          const reason = `Error occurred when updating template to 
          ${url}. Fetch rejected (for ex. network or CORS error): ${error}`;
          return Promise.reject({
            reason: reason,
            appError: { errorMsgLocalisationKey: 'ERRORS.UPDATE_TEMPLATE_ERROR' },
          });
        });
      };

      const promise = new Promise<void>((resolve, reject) => {
        performFetch()
          .then((response) =>
            parseResponse(response, url.toString(), 'when updating template to', 'ERRORS.UPDATE_TEMPLATE_ERROR')
          )
          .then((response: Template) => {
            if (response) {
              resolve();
            } else {
              const reason = `Unexpected response from server when updating template 
              to ${url}`;
              return Promise.reject({
                reason: reason,
                appError: { errorMsgLocalisationKey: 'ERRORS.UPDATE_TEMPLATE_ERROR' },
              });
            }
          })
          .catch(({ reason, appError }) => {
            // reason contains specific error; appError is a more general msg shown to the user
            console.error(reason);
            reject(reason);
            handleAppError(appError);
          });
      });
      return promise;
    },
    login: (username: string, password: string) => {
      var url = new URL(loginURL);

      const promise = new Promise<User>((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open('POST', url.toString(), true);

        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.responseType = 'json';
        xhr.withCredentials = true;

        xhr.send(
          JSON.stringify({
            username: username,
            password: password,
          })
        );

        const onError = () => {
          const reason = `${xhr.status} ${xhr.statusText}`;
          console.error(`Error while logging in: ${reason}`);
          reject(reason);
          const errorMsgLocalisationKey = xhr.status === 401 ? 'ERRORS.WRONG_CREDENTIALS' : 'ERRORS.LOGIN_ERROR';
          handleAppError({ errorMsgLocalisationKey: errorMsgLocalisationKey });
        };

        xhr.onload = () => {
          if (xhr.status === 200) {
            resolve({ id: '', isLoggedIn: true });
          } else {
            onError();
          }
        };

        xhr.onerror = () => {
          onError();
        };
      });
      return promise;
    },
    logout: () => {
      // Remove auth cookie locally
      document.cookie = 'cookiename=session; expires = Thu, 01 Jan 1970 00:00:00 GMT';

      var url = new URL(logoutURL);

      const promise = new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open('POST', url.toString(), true);

        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.responseType = 'json';
        xhr.withCredentials = true;

        xhr.send();

        const onError = () => {
          const reason = `Error while logging out: ${xhr.status} ${xhr.statusText}`;
          console.error(reason);
          reject(reason);
        };

        xhr.onload = () => {
          if (xhr.status === 200) {
            resolve();
          } else {
            onError();
          }
        };

        xhr.onerror = () => {
          onError();
        };
      });
      return promise;
    },
  });
  return <CoronaChatAPIContext.Provider value={APIs.current}> {props.children} </CoronaChatAPIContext.Provider>;
};

export default CoronaChatAPIProvider;
