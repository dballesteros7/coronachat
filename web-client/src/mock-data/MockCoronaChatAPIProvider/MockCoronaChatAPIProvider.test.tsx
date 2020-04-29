import React from 'react';
import ReactDOM from 'react-dom';
import MockCoronaChatAPI from './MockCoronaChatAPIProvider';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MockCoronaChatAPI />, div);
  ReactDOM.unmountComponentAtNode(div);
});
