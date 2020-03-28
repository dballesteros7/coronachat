import React from 'react';
import './MainMessageForm.scss';
import { Template } from '../../model/model';

type MainMessageFormProps = {
  template: Template
}

const MainMessageForm = (props: MainMessageFormProps) => {
  let menuListItems = props.template.menuItems.map(menuItem => 
    <div>{menuItem.index}. {menuItem.title}</div>);

  return (
    <div className="MainMessageForm">
      <h4>Header content</h4>
      <textarea rows={8} defaultValue={props.template.header}>
      </textarea>

      <h4>Menu</h4>
      <div>
        {menuListItems}
      </div>
    </div>
  );
};

export default MainMessageForm;
