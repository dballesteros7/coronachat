import { Template, User } from '../model/model';
import { CoronaChatAPIInterface } from './CoronaChatAPIInterface';
import { AppError } from '../providers/ErrorHandlingProvider/ErrorHandlingProvider';

export class CoronaChatAPI implements CoronaChatAPIInterface {
  private static readonly baseURL = 'http://development.eba-4rmdgwec.eu-west-1.elasticbeanstalk.com';
  // private static readonly baseURL = 'https://app.coronainfochat.org';

  private static readonly getOrganizationURL = `${CoronaChatAPI.baseURL}/organization`;
  private static readonly getTemplateURL = `${CoronaChatAPI.baseURL}/getTemplate`;
  private static readonly getDefaultTemplateURL = `${CoronaChatAPI.baseURL}/getDefaultTemplate`;
  private static readonly updateTemplateURL = `${CoronaChatAPI.baseURL}/updateTemplate`;
  private static readonly loginURL = `${CoronaChatAPI.baseURL}/login`;
  private static readonly logoutURL = `${CoronaChatAPI.baseURL}/logout`;

  private handleAppError: (error: AppError) => void;

  constructor(handleAppError: (error: AppError) => void) {
    this.handleAppError = handleAppError;
  }

  private static parseResponse(
    response: Response,
    requestStringURL: string,
    requestDescription: string,
    errorMsgLocalisationKey: string
  ) {
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
  }

  getOrganizationId(): Promise<string> {
    var url = new URL(CoronaChatAPI.getOrganizationURL);

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
        .then((response) => CoronaChatAPI.parseResponse(response, url.toString(), 'when getting template from', ''))
        .then((response: string) => {
          if (response) {
            resolve(response);
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
          this.handleAppError(appError);
        });
    });
    return promise;
  }

  private getTemplateFromURL(url: URL, errorMsgLocalisationKey: string): Promise<Template> {
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
          CoronaChatAPI.parseResponse(response, url.toString(), 'when getting template from', errorMsgLocalisationKey)
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
          this.handleAppError(appError);
        });
    });
    return promise;
  }

  getTemplate(): Promise<Template> {
    var url = new URL(CoronaChatAPI.getTemplateURL);
    return this.getTemplateFromURL(url, 'ERRORS.GET_TEMPLATE_ERROR');
  }

  getDefaultTemplate(): Promise<Template> {
    var url = new URL(CoronaChatAPI.getDefaultTemplateURL);
    return this.getTemplateFromURL(url, 'ERRORS.GET_DEFAULT_TEMPLATE_ERROR');
  }

  updateTemplate(template: Template): Promise<void> {
    var url = new URL(CoronaChatAPI.updateTemplateURL);

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
          CoronaChatAPI.parseResponse(
            response,
            url.toString(),
            'when updating template to',
            'ERRORS.UPDATE_TEMPLATE_ERROR'
          )
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
          this.handleAppError(appError);
        });
    });
    return promise;
  }

  login(username: string, password: string): Promise<User> {
    var url = new URL(CoronaChatAPI.loginURL);

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
        this.handleAppError({ errorMsgLocalisationKey: errorMsgLocalisationKey });
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
  }

  logout(): Promise<void> {
    // Remove auth cookie locally
    document.cookie = 'cookiename=session; expires = Thu, 01 Jan 1970 00:00:00 GMT';

    var url = new URL(CoronaChatAPI.logoutURL);

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
  }
}
