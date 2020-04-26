import React from 'react';
import ReactDOM from 'react-dom';
import UserProvider from './UserProvider';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UserProvider />, div);
  ReactDOM.unmountComponentAtNode(div);
});