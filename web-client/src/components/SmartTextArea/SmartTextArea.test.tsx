import React from 'react';
import ReactDOM from 'react-dom';
import SmartTextArea from './SmartTextArea';

jest.mock('react-i18next', () => {
  return {
    useTranslation: (x: string) => {
      return {
        t: (y: string) => y,
      };
    },
    Trans: (children: any) => children,
  };
});

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SmartTextArea />, div);
  ReactDOM.unmountComponentAtNode(div);
});
