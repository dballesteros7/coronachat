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

  getTemplate(): Promise<Template> {
    const promise = new Promise<Template>((resolve, _) => {
      resolve(getLocalDefaultTemplateForLanguage(this.selectedLanguage));
    });
    return promise;
  }

  getDefaultTemplate(): Promise<Template> {
    return this.getTemplate();
  }

  updateTemplate(_: Template): Promise<void> {
    // Do nothing
    return Promise.resolve();
  }
}
