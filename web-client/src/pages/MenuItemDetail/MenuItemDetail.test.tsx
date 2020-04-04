import React from 'react';
import ReactDOM from 'react-dom';
import MenuItemDetail from './MenuItemDetail';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MenuItemDetail />, div);
  ReactDOM.unmountComponentAtNode(div);
});
