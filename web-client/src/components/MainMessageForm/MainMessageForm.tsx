import React from 'react';
import './MainMessageForm.scss';
import { Template, MenuItem } from '../../model/model';
import { List, ListItem, ListItemText, Divider, Button } from '@material-ui/core';
import SmartTextArea from '../SmartTextArea/SmartTextArea';
import { useTranslation } from 'react-i18next';

type MainMessageFormProps = {
  template: Template;
  onMainHeaderChanged: (newText: string) => void;
  onPrefillMainHeaderClicked: () => void;
  onOpenMenuItem: (menuItem: MenuItem) => void;
  onAddMenuItemClicked: () => void;
  onSaveMainHeaderClicked: (text: string) => void;
};

const MainMessageForm = (props: MainMessageFormProps) => {
  const { t } = useTranslation();
  let menuListItems = props.template?.menuItems.map((menuItem: MenuItem, idx: number) => {
    const itemText = idx + 1 + '. ' + menuItem.title;
    const onItemClicked = () => props.onOpenMenuItem(menuItem);
    return (
      <ListItem button key={idx} dense>
        <ListItemText primary={itemText} onClick={onItemClicked} />
      </ListItem>
    );
  });

  return (
    <div className="MainMessageForm">
      {/* TODO(MB) is there a better way instead than passing same props up and down 
          in the components tree several times? (SmartTextArea -> MainMessageForm -> App) 
      */}
      <SmartTextArea
        showPrefill={true}
        showEdit={true}
        label={t('MSG_HEADER')}
        value={props.template.header}
        rows={8}
        placeholder={t('MSG_HEADER_PLACEHOLDER')}
        onPrefillClicked={props.onPrefillMainHeaderClicked}
        onChange={props.onMainHeaderChanged}
        onSaveClicked={props.onSaveMainHeaderClicked}
      />
      <Divider className="divider" />
      <span className="covid-title-box">
        <h3 className="covid-title">{t('MENU.OPTIONS')}</h3>
        <span className="action-button-group">
          <Button size="small" color="primary" onClick={props.onAddMenuItemClicked}>
            {t('MENU.ADD_OPTION')}
          </Button>
        </span>
      </span>
      <List>{menuListItems}</List>
    </div>
  );
};

export default MainMessageForm;
