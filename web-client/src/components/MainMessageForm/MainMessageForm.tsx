import React, { useEffect } from 'react';
import './MainMessageForm.scss';
import { Template } from '../../model/model';
import TextField from '@material-ui/core/TextField';
import { defaultTemplate } from '../../sampleData/defaultTemplate';

type MainMessageFormProps = {
  template: Template,
  onPrefillMainHeaderClicked: () => void
}

const MainMessageForm = (props: MainMessageFormProps) => {

  let menuListItems = props.template.menuItems.map(menuItem => 
    <div key={menuItem.index}>{menuItem.index}. {menuItem.title}</div>);

  return (
    <div className="MainMessageForm">
      <TextField
        className="text-field"
        label="Header"
        multiline
        rows="8"
        value={props.template.header}
        placeholder={defaultTemplate.header}
        variant="outlined"
      />
      <button>Prefill</button>

      <h4>Menu</h4>
      <div>
        {menuListItems}
      </div>
    </div>
  );
};

export default MainMessageForm;
