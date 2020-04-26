import React, { ReactNode, useContext, useRef, useCallback } from 'react';
import { CoronaChatAPIContext } from '../CoronaChatAPIInterface';
import { Template } from '../../../model/model';
import { useTranslation } from 'react-i18next';
import { getLocalDefaultTemplateForLanguage } from '../../../lib/utils';
import { LanguageContext } from '../../LanguageProvider/LanguageProvider';

const TrialCoronaChatAPIProvider = (props: { children: ReactNode }) => {
  const [t] = useTranslation();
  // todo(MB) selectedLanguage was: i18n.language as Language
  const { selectedLanguage } = useContext(LanguageContext);

  const getTemplate = useCallback(() => {
    const promise = new Promise<Template>((resolve, _) => {
      resolve(getLocalDefaultTemplateForLanguage(selectedLanguage));
    });
    return promise;
  }, [selectedLanguage]);

  const APIs = useRef({
    getOrganizationId: () => {
      return Promise.resolve<string>(t('TRIAL_ACCOUNT'));
    },
    getTemplate: getTemplate,
    getDefaultTemplate: getTemplate,
    updateTemplate: (_: Template) => {
      // Do nothing
      return Promise.resolve();
    },
    login: (_: string, __: string) => {
      return Promise.reject('You cannot log into the trial version');
    },
    logout: () => {
      return Promise.resolve();
    },
  });
  return <CoronaChatAPIContext.Provider value={APIs.current}> {props.children} </CoronaChatAPIContext.Provider>;
};

export default TrialCoronaChatAPIProvider;
