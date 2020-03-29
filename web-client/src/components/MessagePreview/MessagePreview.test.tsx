import React from 'react';
import ReactDOM from 'react-dom';
import MessagePreview from './MessagePreview';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MessagePreview />, div);
  ReactDOM.unmountComponentAtNode(div);
});