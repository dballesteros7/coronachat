import { Template } from '../model/model';
import { CoronaChatAPIInterface } from './CoronaChatAPIInterface';
import { Language } from '../i18n';
import { getLocalDefaultTemplateForLanguage } from '../utils/logic-utils';

export class TrialCoronaChatAPI implements CoronaChatAPIInterface {
  // TODO(MB) not great approach because if language changes in MainMessage (i18n instance),
  // it gets not updated here. Should use hooks somehow and useTranslation here too
  selectedLanguage: Language;

  constructor(language: Language) {
    this.selectedLanguage = language;
  }

  private static readonly getTemplateURL = 'https://app.coronainfochat.org/getTemplate';

  getTemplate(): Promise<Template> {
    var url = new URL(TrialCoronaChatAPI.getTemplateURL);

    const promise = new Promise<Template>((resolve, reject) => {
      resolve(getLocalDefaultTemplateForLanguage(this.selectedLanguage));
    });
    return promise;
  }

  updateTemplate(_: Template): Promise<void> {
    // Do nothing
    return Promise.resolve();
  }
}
