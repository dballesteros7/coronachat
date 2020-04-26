import React from 'react';
import ReactDOM from 'react-dom';
import TrialCoronaChatAPIProvider from './TrialCoronaChatAPIProvider';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TrialCoronaChatAPIProvider />, div);
  ReactDOM.unmountComponentAtNode(div);
});