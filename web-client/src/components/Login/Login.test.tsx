import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login';
import { MemoryRouter } from 'react-router-dom';
import TrialCoronaChatAPIProvider from '../../providers/api/TrialCoronaChatAPIProvider/TrialCoronaChatAPIProvider';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <TrialCoronaChatAPIProvider>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </TrialCoronaChatAPIProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
