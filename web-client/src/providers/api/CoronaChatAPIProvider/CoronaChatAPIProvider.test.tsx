import React from 'react';
import ReactDOM from 'react-dom';
import CoronaChatAPIProvider from './CoronaChatAPIProvider';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CoronaChatAPIProvider />, div);
  ReactDOM.unmountComponentAtNode(div);
});