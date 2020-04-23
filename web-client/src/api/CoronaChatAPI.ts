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

  private getTemplateFromURL(url: URL): Promise<Template> {
    const promise = new Promise<Template>((resolve, reject) => {
      fetch(url.href, {
        headers: new Headers({
          Authorization: this.authHeader,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then(
          (response: Template) => {
            if (response) {
              resolve(response);
            } else {
              console.warn(`Unexpected response from server when getting template 
              from ${url}`);
              reject(new Error('Unexpected response from server'));
            }
          },
          (error) => {
            console.error(
              `Error occurred when getting template from 
            ${url}:`,
              error
            );
            this.handleAppError({ errorMsgLocalisationKey: 'ERRORS.GET_TEMPLATE_ERROR' });
            reject(error);
          }
        );
    });
    return promise;
  }

  getTemplate(): Promise<Template> {
    var url = new URL(CoronaChatAPI.getTemplateURL);
    return this.getTemplateFromURL(url);
  }

  getDefaultTemplate(): Promise<Template> {
    var url = new URL(CoronaChatAPI.getDefaultTemplateURL);
    return this.getTemplateFromURL(url);
  }

  updateTemplate(template: Template): Promise<void> {
    var url = new URL(CoronaChatAPI.updateTemplateURL);

    const promise = new Promise<void>((resolve, reject) => {
      fetch(url.href, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: this.authHeader,
        },
        body: JSON.stringify(template),
      })
        .then((res) => {
          return res.json();
        })
        .then(
          (response: Template) => {
            if (response) {
              resolve();
            } else {
              console.warn(`Unexpected response from server when getting template 
              from ${url}`);
              reject(new Error('Unexpected response from server'));
            }
          },
          (error) => {
            console.error(
              `Error occurred when getting template from 
            ${url}:`,
              error
            );
            this.handleAppError({ errorMsgLocalisationKey: 'ERRORS.UPDATE_TEMPLATE_ERROR' });
            reject(error);
          }
        );
    });
    return promise;
  }

  login(username: string, password: string): Promise<User> {
    // TODO(MB) perform request to server when ready
    return new Promise<User>((resolve, reject) => {
      setTimeout(() => {
        resolve({
          id: 'dummy-org-id',
          authToken: 'dummy-token',
        });
      }, 1_000);
    });
  }
}
