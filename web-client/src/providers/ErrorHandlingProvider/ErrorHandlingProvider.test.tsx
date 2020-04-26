import React from 'react';
import ReactDOM from 'react-dom';
import ErrorHandlingProvider from './ErrorHandlingProvider';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ErrorHandlingProvider />, div);
  ReactDOM.unmountComponentAtNode(div);
});