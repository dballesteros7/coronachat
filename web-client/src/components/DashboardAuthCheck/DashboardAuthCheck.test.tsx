import React from 'react';
import ReactDOM from 'react-dom';
import DashboardAuthCheck from './DashboardAuthCheck';
import { MemoryRouter } from 'react-router-dom';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter>
      <DashboardAuthCheck />
    </MemoryRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
