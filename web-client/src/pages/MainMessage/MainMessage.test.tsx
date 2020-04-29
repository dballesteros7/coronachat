import React from 'react';
import ReactDOM from 'react-dom';
import MainMessage, { getEmptyTemplate } from './MainMessage';
import { MemoryRouter } from 'react-router-dom';
import MockCoronaChatAPIProvider, {
  RejectConfiguration,
} from '../../mock-data/MockCoronaChatAPIProvider/MockCoronaChatAPIProvider';

function testMountWithRejectConfiguration(rejectConfiguration: RejectConfigurwation) {
  const div = document.createElement('div');
  ReactDOM.render(
    <MockCoronaChatAPIProvider rejectConfiguration={rejectConfiguration}>
      <MemoryRouter>
        <MainMessage />
      </MemoryRouter>
    </MockCoronaChatAPIProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
}

it('It should mount when resolving all API calls to the Coronainfochat server', () => {
  testMountWithRejectConfiguration({
    getDefaultTemplate: false,
    getOrganization: false,
    getTemplate: false,
    updateTemplate: false,
    login: false,
    logout: false,
  });
});

it('It should mount when rejecting getDefaultTemplate API call to the Coronainfochat server', () => {
  testMountWithRejectConfiguration({
    getDefaultTemplate: true,
    getOrganization: false,
    getTemplate: false,
    updateTemplate: false,
    login: false,
    logout: false,
  });
});

it('It should mount when rejecting getTemplate API call to the Coronainfochat server', () => {
  testMountWithRejectConfiguration({
    getDefaultTemplate: false,
    getOrganization: false,
    getTemplate: true,
    updateTemplate: false,
    login: false,
    logout: false,
  });
});

it('It should mount when rejecting all API calls to the Coronainfochat server', () => {
  testMountWithRejectConfiguration({
    getDefaultTemplate: true,
    getOrganization: true,
    getTemplate: true,
    updateTemplate: true,
    login: true,
    logout: true,
  });
});

it('should return an empty template', () => {
  const emptyTemplate = getEmptyTemplate();
  expect(emptyTemplate.header.length).toEqual(0);
  expect(emptyTemplate.menuItems.length).toEqual(0);
});
