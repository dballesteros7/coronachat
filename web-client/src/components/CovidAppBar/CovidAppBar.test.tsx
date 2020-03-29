import React from 'react';
import ReactDOM from 'react-dom';
import CovidAppBar from './CovidAppBar';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CovidAppBar />, div);
  ReactDOM.unmountComponentAtNode(div);
});