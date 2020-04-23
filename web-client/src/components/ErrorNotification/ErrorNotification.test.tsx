import React from 'react';
import ReactDOM from 'react-dom';
import ErrorNotification from './ErrorNotification';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ErrorNotification />, div);
  ReactDOM.unmountComponentAtNode(div);
});