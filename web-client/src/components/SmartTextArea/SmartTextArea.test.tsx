import React from 'react';
import ReactDOM from 'react-dom';
import SmartTextArea from './SmartTextArea';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SmartTextArea />, div);
  ReactDOM.unmountComponentAtNode(div);
});