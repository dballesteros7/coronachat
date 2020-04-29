import { Language, Languages } from '../i18n';
import { ReadOnlyTemplate } from '../model/model';
import { defaultTemplateEN } from '../locales/en/defaultTemplate';
import { defaultTemplateES } from '../locales/es/defaultTemplate';
import { defaultTemplateIT } from '../locales/it/defaultTemplate';

export function getLocalDefaultTemplateForLanguage(language: Language): ReadOnlyTemplate {
  switch (language) {
    case Languages.es:
      return defaultTemplateES;
    case Languages.it:
      return defaultTemplateIT;
    default:
      return defaultTemplateEN;
  }
}
