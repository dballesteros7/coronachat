import { Template, User } from '../model/model';
import { CoronaChatAPIInterface } from './CoronaChatAPIInterface';
import { AppError } from '../providers/ErrorHandlingProvider/ErrorHandlingProvider';

export class CoronaChatAPI implements CoronaChatAPIInterface {
  private static readonly baseURL = 'http://development.eba-4rmdgwec.eu-west-1.elasticbeanstalk.com';
  // private static readonly baseURL = 'https://app.coronainfochat.org';

  private static readonly getTemplateURL = `${CoronaChatAPI.baseURL}/getTemplate`;
  private static readonly getDefaultTemplateURL = `${CoronaChatAPI.baseURL}/getDefaultTemplate`;
  private static readonly updateTemplateURL = `${CoronaChatAPI.baseURL}/updateTemplate`;
  private static readonly loginURL = `${CoronaChatAPI.baseURL}/login`;

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

  private getTemplateFromURL(url: URL, errorMsgLocalisationKey: string): Promise<Template> {
    const performFetch = () => {
      return fetch(url.href).catch((error) => {
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

    const performFetch = () => {
      return fetch(url.href, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      }).catch((error) => {
        const reason = `Error occurred when updating template to 
          ${url}. Fetch rejected (for ex. network or CORS error): ${error}`;
        return Promise.reject({
          reason: reason,
          appError: { errorMsgLocalisationKey: 'ERRORS.LOGIN_ERROR' },
        });
      });
    };

    const promise = new Promise<User>((resolve, reject) => {
      performFetch()
        .then((response) =>
          CoronaChatAPI.parseResponse(response, url.toString(), 'when logging in', 'ERRORS.LOGIN_ERROR')
        )
        .then((response: Response) => {
          if (response) {
            resolve({ id: '', isLoggedIn: true });
          } else {
            const reason = `Unexpected response from server when updating template 
              to ${url}`;
            return Promise.reject({
              reason: reason,
              appError: { errorMsgLocalisationKey: 'ERRORS.LOGIN_ERROR' },
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

    // return new Promise<User>((resolve, reject) => {
    //   setTimeout(() => {
    //     if (username === 'a' && password === 'a') {
    //       reject('Wrong credentials');
    //       this.handleAppError({ errorMsgLocalisationKey: 'ERRORS.WRONG_CREDENTIALS' });
    //     } else {
    //       resolve({
    //         id: '',
    //         isLoggedIn: true,
    //       });
    //     }
    //   }, 1_000);
    // });
  }
}
