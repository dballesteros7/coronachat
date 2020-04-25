import React from 'react';
import ReactDOM from 'react-dom';
import ThreeDotsMenu from './ThreeDotsMenu';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ThreeDotsMenu />, div);
  ReactDOM.unmountComponentAtNode(div);
});