import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import { MemoryRouter } from 'react-router-dom';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
