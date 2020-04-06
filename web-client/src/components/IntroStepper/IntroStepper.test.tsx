import React from 'react';
import ReactDOM from 'react-dom';
import IntroStepper from './IntroStepper';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<IntroStepper />, div);
  ReactDOM.unmountComponentAtNode(div);
});