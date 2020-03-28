import React from 'react';
import ReactDOM from 'react-dom';
import MenuItemMessageForm from './MenuItemMessageForm';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MenuItemMessageForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});