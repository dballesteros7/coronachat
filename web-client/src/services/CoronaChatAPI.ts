import { Template } from "../model/model";

export class CoronaChatAPI {
  
  // private static readonly getTemplateURL = "http://cors-anywhere.herokuapp.com/http://7bb4d846.ngrok.io/getTemplate";
  private static readonly getTemplateURL = "http://7bb4d846.ngrok.io/getTemplate";

  getTemplate(): Promise<Template> {
    var url = new URL(CoronaChatAPI.getTemplateURL);
    
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
}