import React from 'react';
import './MainMessageForm.scss';
import { Template, MenuItem } from '../../model/model';
import { defaultTemplate } from '../../sampleData/defaultTemplate';
import { List, ListItem, ListItemText, Divider, Button } from '@material-ui/core';
import SmartTextArea from '../SmartTextArea/SmartTextArea';

type MainMessageFormProps = {
  template: Template,
  onMainHeaderChanged: (newText: string) => void,
  onPrefillMainHeaderClicked: () => void,
  onOpenMenuItem: (menuItem: MenuItem) => void,
  onAddMenuItemClicked: () => void
}

const MainMessageForm = (props: MainMessageFormProps) => {

  let menuListItems = props.template.menuItems.map((menuItem: MenuItem, idx: number) => {
    const itemText = (idx + 1) + '. ' + menuItem.title;
    const onItemClicked = () => props.onOpenMenuItem(menuItem);
    return (
        <ListItem button key={idx} dense>
          <ListItemText primary={itemText} onClick={onItemClicked}/>
        </ListItem>
      );
    }
  );

  return (
    <div className="MainMessageForm">
      {/* TODO(MB) is there a better way instead than passing same props up and down 
          in the components tree several times? (SmartTextArea -> MainMessageForm -> App) 
      */}
      <SmartTextArea 
        showPrefill={true}
        showEdit={true}
        label='Message header'
        value={props.template.header}
        prefillValue={defaultTemplate.header}
        rows={8}
        placeholder='Write here a custom description about this service or press PREFILL to get a standard message'
        onPrefillClicked={props.onPrefillMainHeaderClicked}
        onChange={props.onMainHeaderChanged}
        onSaveClicked={props.onMainHeaderChanged}
      />
      <Divider className="divider"/>
      <span className="covid-title-box">
        <h3 className="covid-title">Sub-message menu</h3>
        <span className="action-button-group">
          <Button size="small" color="primary"
            onClick={props.onAddMenuItemClicked}>ADD ITEM</Button>
        </span>
      </span>
      <List>
        {menuListItems}
      </List>
    </div>
  );
};

export default MainMessageForm;
