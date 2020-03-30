import { Template } from "../model/model";
import { CoronaChatAPIInterface } from './CoronaChatAPIInterface';

export class TrialCoronaChatAPI implements CoronaChatAPIInterface {
  
  private static readonly getTemplateURL = "https://app.coronainfochat.org/getTemplate";

  getTemplate(): Promise<Template> {
    var url = new URL(TrialCoronaChatAPI.getTemplateURL);
    
    const promise = new Promise<Template>((resolve, reject) => {
      fetch(url.href)
      .then(res => {
        return res.json()
      })
      .then(
        (response: Template) => {
          if (response) {
            resolve(response);
          } else {
            console.warn(`Unexpected response from server when getting template 
              from ${url}`);
            reject(new Error("Unexpected response from server"));
          }
        },
        (error) => {
          console.error(`Error occurred when getting template from 
            ${url}:`, error);
          reject(error);
        }
      );
    });
    return promise;
  }

  updateTemplate(_: Template): Promise<void> {
    // Do nothing
    return Promise.resolve();
  }
}