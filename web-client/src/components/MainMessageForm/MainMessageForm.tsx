import React, { useEffect } from 'react';
import './MainMessageForm.scss';
import { Template, MenuItem } from '../../model/model';
import TextField from '@material-ui/core/TextField';
import { defaultTemplate } from '../../sampleData/defaultTemplate';
import { List, ListItem, ListItemText, ListSubheader } from '@material-ui/core';

type MainMessageFormProps = {
  template: Template,
  onMainHeaderChanged: (newText: string) => void,
  onPrefillMainHeaderClicked: () => void,
  onOpenMenuItem: (menuItem: MenuItem) => void
}

const MainMessageForm = (props: MainMessageFormProps) => {

  var prefillHeaderRef = React.useRef<HTMLButtonElement>(null);
  var searchBarRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onPrefillHeaderClicked = function(_: Event) {
      props.onPrefillMainHeaderClicked();
    }
    prefillHeaderRef?.current?.addEventListener("click", onPrefillHeaderClicked);

    const onHeaderTxtFieldInputChanged = function(e: Event) {
      props.onMainHeaderChanged((e.target as HTMLInputElement).value || '');
    }
    searchBarRef?.current?.addEventListener("input", onHeaderTxtFieldInputChanged);
  }, []);

  let menuListItems = props.template.menuItems.map(menuItem => {
    const itemText = menuItem.index + '. ' + menuItem.title;
    const onItemClicked = () => props.onOpenMenuItem(menuItem);
    return (
        <ListItem button>
          <ListItemText primary={itemText} onClick={onItemClicked}/>
        </ListItem>
      );
    }
  );

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
        ref={searchBarRef}
      />
      <button ref={prefillHeaderRef}>Prefill</button>

      <List subheader={<ListSubheader>Menu</ListSubheader>} component="nav">
        {menuListItems}
      </List>
    </div>
  );
};

export default MainMessageForm;
