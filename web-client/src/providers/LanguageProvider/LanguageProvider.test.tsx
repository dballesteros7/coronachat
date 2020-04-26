import React from 'react';
import ReactDOM from 'react-dom';
import LanguageProvider from './LanguageProvider';
import { MemoryRouter } from 'react-router-dom';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter>
      <LanguageProvider />
    </MemoryRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
