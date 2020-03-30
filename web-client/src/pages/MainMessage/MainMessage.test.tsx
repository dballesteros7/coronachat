import React from 'react';
import ReactDOM from 'react-dom';
import MainMessage from "./MainMessage";

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MainMessage />, div);
  ReactDOM.unmountComponentAtNode(div);
});