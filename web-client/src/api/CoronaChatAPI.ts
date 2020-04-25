import { Template, User } from '../model/model';
import { CoronaChatAPIInterface } from './CoronaChatAPIInterface';
import { AppError } from '../providers/ErrorHandlingProvider/ErrorHandlingProvider';

export class CoronaChatAPI implements CoronaChatAPIInterface {
  private static readonly getTemplateURL = 'https://app.coronainfochat.org/getTemplate';
  private static readonly getDefaultTemplateURL = 'https://app.coronainfochat.org/getDefaultTemplate';
  private static readonly updateTemplateURL = 'https://app.coronainfochat.org/updateTemplate';

  private authHeader: string;
  private handleAppError: (error: AppError) => void;

  private static getAuthHeaderFromToken(authToken: string): string {
    return 'Bearer ' + authToken;
  }

  constructor(authToken: string, handleAppError: (error: AppError) => void) {
    this.authHeader = CoronaChatAPI.getAuthHeaderFromToken(authToken);
    this.handleAppError = handleAppError;
  }

  setAuthToken(authToken: string) {
    this.authHeader = CoronaChatAPI.getAuthHeaderFromToken(authToken);
  }

  private getTemplateFromURL(url: URL, errorMsgLocalisationKey: string): Promise<Template> {
    const performFetch = () => {
      return fetch(url.href, {
        headers: new Headers({
          Authorization: this.authHeader,
        }),
      }).catch((error) => {
        const reason = `Error occurred when updating template to 
          ${url}. Fetch rejected (for ex. network or CORS error): ${error}`;
        return Promise.reject({
          reason: reason,
          appError: { errorMsgLocalisationKey: errorMsgLocalisationKey },
        });
      });
    };

    const parseResponse = (response: Response) => {
      if (!response.ok) {
        const responseStatus = `Response status ${response.status} ${response.statusText}`;
        const reason = `Error occurred when updating template to 
            ${url}. ${responseStatus}`;
        return Promise.reject({
          reason: reason,
          appError: { errorMsgLocalisationKey: errorMsgLocalisationKey, statusCode: response.status },
        });
      } else {
        return response.json().catch((error) => {
          const reason = `Response json parsing error when updating template to 
            ${url}: ${error}`;
          return Promise.reject({
            reason: reason,
            appError: { errorMsgLocalisationKey: errorMsgLocalisationKey },
          });
        });
      }
    };

    const promise = new Promise<Template>((resolve, reject) => {
      performFetch()
        .then(parseResponse)
        .then((response: Template) => {
          if (response) {
            resolve(response);
          } else {
            const reason = `Unexpected response from server when updating template 
              to ${url}`;
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
          Authorization: this.authHeader,
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

    const parseResponse = (response: Response) => {
      if (!response.ok) {
        const responseStatus = `Response status ${response.status} ${response.statusText}`;
        const reason = `Error occurred when updating template to 
            ${url}. ${responseStatus}`;
        return Promise.reject({
          reason: reason,
          appError: { errorMsgLocalisationKey: 'ERRORS.UPDATE_TEMPLATE_ERROR', statusCode: response.status },
        });
      } else {
        return response.json().catch((error) => {
          const reason = `Response json parsing error when updating template to 
            ${url}: ${error}`;
          return Promise.reject({
            reason: reason,
            appError: { errorMsgLocalisationKey: 'ERRORS.UPDATE_TEMPLATE_ERROR' },
          });
        });
      }
    };

    const promise = new Promise<void>((resolve, reject) => {
      performFetch()
        .then(parseResponse)
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
    // TODO(MB) perform request to server when ready
    return new Promise<User>((resolve, reject) => {
      setTimeout(() => {
        if (username === 'a' && password === 'a') {
          reject('Wrong credentials');
          this.handleAppError({ errorMsgLocalisationKey: 'ERRORS.WRONG_CREDENTIALS' });
        } else {
          resolve({
            id: 'dummy-org-id',
            authToken: 'dummy-token',
          });
        }
      }, 1_000);
    });
  }
}
