import React from 'react';
import ReactDOM from 'react-dom';
import MenuItemMessageForm, { MenuItemMessageFormProps } from './MenuItemMessageForm';

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

  const menuItemMessageFormProps: MenuItemMessageFormProps = {
    menuItem: {
      id: -1,
      title: '',
      footerItems: [],
      content: '',
    },
    isVisible: true,
    onDeleteMenuItem: () => {},
    onMenuItemUpdatedInForm: () => {},
  };

  ReactDOM.render(<MenuItemMessageForm {...menuItemMessageFormProps} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
