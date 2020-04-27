import React from 'react';
import ReactDOM from 'react-dom';
import MenuItemDetail, { MenuItemDetailProps } from './MenuItemDetail';

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
  const menuItemDetailProps: MenuItemDetailProps = {
    menuItem: {
      id: -1,
      title: '',
      footerItems: [],
      content: '',
    },
    onCloseAndDiscardChanges: () => {},
    onDeleteMenuItem: () => {},
    onCloseAndSaveChanges: () => {},
  };
  ReactDOM.render(<MenuItemDetail {...menuItemDetailProps} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
