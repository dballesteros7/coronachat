import React from 'react';
import ReactDOM from 'react-dom';
import MainMessage, { getEmptyTemplate } from './MainMessage';
import { MemoryRouter } from 'react-router-dom';
import TrialCoronaChatAPIProvider from '../../providers/api/TrialCoronaChatAPIProvider/TrialCoronaChatAPIProvider';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <TrialCoronaChatAPIProvider>
      <MemoryRouter>
        <MainMessage />
      </MemoryRouter>
    </TrialCoronaChatAPIProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it('should return an empty template', () => {
  const emptyTemplate = getEmptyTemplate();
  expect(emptyTemplate.header.length).toEqual(0);
  expect(emptyTemplate.menuItems.length).toEqual(0);
});
