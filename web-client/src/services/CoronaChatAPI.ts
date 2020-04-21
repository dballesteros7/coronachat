import { Template, User } from '../model/model';
import { CoronaChatAPIInterface } from './CoronaChatAPIInterface';

export class CoronaChatAPI implements CoronaChatAPIInterface {
  private static readonly getTemplateURL = 'https://app.coronainfochat.org/getTemplate';
  private static readonly getDefaultTemplateURL = 'https://app.coronainfochat.org/getDefaultTemplate';
  private static readonly updateTemplateURL = 'https://app.coronainfochat.org/updateTemplate';

  private getTemplateFromURL(url: URL): Promise<Template> {
    const promise = new Promise<Template>((resolve, reject) => {
      fetch(url.href)
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
      }, 2_000);
    });
  }
}
