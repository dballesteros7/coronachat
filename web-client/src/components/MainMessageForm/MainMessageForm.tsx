import React from 'react';
import './MainMessageForm.scss';
import { Template, MenuItem } from '../../model/model';
import { defaultTemplate } from '../../sampleData/defaultTemplate';
import { List, ListItem, ListItemText, ListSubheader } from '@material-ui/core';
import SmartTextArea from '../SmartTextArea/SmartTextArea';

type MainMessageFormProps = {
  template: Template,
  onMainHeaderChanged: (newText: string) => void,
  onPrefillMainHeaderClicked: () => void,
  onOpenMenuItem: (menuItem: MenuItem) => void
}

const MainMessageForm = (props: MainMessageFormProps) => {

  let menuListItems = props.template.menuItems.map(menuItem => {
    const itemText = menuItem.index + '. ' + menuItem.title;
    const onItemClicked = () => props.onOpenMenuItem(menuItem);
    return (
        <ListItem button key={menuItem.index}>
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
        label='Message header'
        value={props.template.header}
        placeholder={defaultTemplate.header}
        rows={8}
        onPrefillClicked={props.onPrefillMainHeaderClicked}
        onChange={props.onMainHeaderChanged}
      />
      <List subheader={<ListSubheader>Menu</ListSubheader>} component="nav">
        {menuListItems}
      </List>
    </div>
  );
};

export default MainMessageForm;
