import React, { ReactNode, useCallback, useRef } from 'react';
import { Template } from '../../model/model';
import { CoronaChatAPIContextProvider } from '../../providers/api/CoronaChatAPIInterface';
import { defaultTemplateEN } from '../../locales/en/defaultTemplate';

type RejectConfiguration = {
  getDefaultTemplate: Boolean;
  getOrganization: Boolean;
  getTemplate: Boolean;
  updateTemplate: Boolean;
  login: Boolean;
  logout: Boolean;
};

type MockCoronaChatAPIProps = {
  children: ReactNode;
  rejectConfiguration: RejectConfiguration;
};

const MockCoronaChatAPIProvider = ({ children, rejectConfiguration: reject }: MockCoronaChatAPIProps) => {
  const APIs = useRef({
    getOrganizationId: () => {
      return reject.getOrganization
        ? Promise.reject('Testing reject case')
        : Promise.resolve<string>('MOCK-ORGANIZATION');
    },
    getTemplate: () =>
      reject.getTemplate ? Promise.reject('Testing reject case') : Promise.resolve(defaultTemplateEN),
    getDefaultTemplate: () =>
      reject.getDefaultTemplate ? Promise.reject('Testing reject case') : Promise.resolve(defaultTemplateEN),
    updateTemplate: (_: Template) => {
      return reject.updateTemplate ? Promise.reject('Testing reject update template') : Promise.resolve();
    },
    login: (_: string, __: string) => {
      return reject.login
        ? Promise.reject('Testing reject update template')
        : Promise.resolve({ id: '', isLoggedIn: true });
    },
    logout: () => {
      return reject.logout ? Promise.reject('Testing reject update template') : Promise.resolve();
    },
  });
  return <CoronaChatAPIContextProvider value={APIs.current}> {children} </CoronaChatAPIContextProvider>;
};

export default MockCoronaChatAPIProvider;
