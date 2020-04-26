import { Template, User } from '../model/model';
import { CoronaChatAPIInterface } from './CoronaChatAPIInterface';
import { Language, Languages } from '../i18n';
import { getLocalDefaultTemplateForLanguage } from '../lib/utils';

export class TrialCoronaChatAPI implements CoronaChatAPIInterface {
  // TODO(MB) not great approach because if language changes in MainMessage (i18n instance),
  // it gets not updated here. Should use hooks somehow and useTranslation here too
  selectedLanguage: Language;

  constructor(language: Language) {
    this.selectedLanguage = language;
  }

  getOrganizationId(): Promise<string> {
    let trialAccount = '';
    // TODO(MB) not nice to have translations here; improve this
    switch (this.selectedLanguage) {
      case Languages.en:
        trialAccount = 'Trial account';
        break;
      case Languages.it:
        trialAccount = 'Account di prova';
        break;
      case Languages.es:
        trialAccount = 'Cuenta de prueba';
        break;
    }
    return Promise.resolve(trialAccount);
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

  login(_: string, __: string): Promise<User> {
    return Promise.reject('You cannot log into the trial version');
  }

  logout(): Promise<void> {
    return Promise.reject('You cannot log out the trial version');
  }
}
