import React, { useState, useRef } from 'react';
import './App.css';
import MainMessageForm from './components/MainMessageForm/MainMessageForm';
import { defaultTemplate, defaultFooterItemBackToMenu } from './sampleData/defaultTemplate';
import { Template, MenuItem } from './model/model';
import MenuItemMessageForm from './components/MenuItemMessageForm/MenuItemMessageForm';

function getInitSelectedMenuItem(): MenuItem {
  // TODO(MB) could set initial value to null without compiler complaining
  return {
    id: -1,
    title: '',
    footerItems: [defaultFooterItemBackToMenu],
    content: ''
  };  
}

const App = () => {
  // TODO(MB) is this really the simplest way that allows using setState inside
  // an event handler? see https://medium.com/geographit/accessing-react-state-in-event-listeners-with-usestate-and-useref-hooks-8cceee73c559
  const [_template, _setTemplate] = useState(JSON.parse(JSON.stringify(defaultTemplate)));
  var templateRef = useRef(_template);
  const setTemplate = (newTemplate: Template) => {
    templateRef.current = newTemplate;
    _setTemplate(newTemplate);
  }

  const [_isMenuItemDialogOpen, _setIsMenuItemDialogOpen] = useState(false);
  var isMenuItemDialogOpenRef = useRef(_isMenuItemDialogOpen);
  const setIsMenuItemDialogOpen = (newValue: boolean) => {
    isMenuItemDialogOpenRef.current = newValue;
    _setIsMenuItemDialogOpen(newValue);
  }

  // TODO(MB) Does not make sense to store this menuItem
  // find a way to pass it to MenuItemMessageForm directly from 'openMenuItem' handler
  const initSelectedMenuItem = getInitSelectedMenuItem();
  const [editingMenuItem, setEditingMenuItem] = useState(initSelectedMenuItem);

  const [newMenuItemLatestLocalIdx, setNewMenuItemLatestLocalIdx] = useState(-1);

  let updateTemplateHeaderInState = (headerText: string) => {
    // TODO(MB) check deep copy
    const updatedTemplate = JSON.parse(JSON.stringify(templateRef.current));
    updatedTemplate.header = headerText;
    setTemplate(updatedTemplate);
  }

  let onPrefillMainHeaderClicked = () => {
    updateTemplateHeaderInState(defaultTemplate.header);
  }

  let onMainHeaderChanged = (newText: string) => {
    updateTemplateHeaderInState(newText);
  }

  let openMenuItem = (menuItem: MenuItem) => {
    setEditingMenuItem(menuItem);
    setIsMenuItemDialogOpen(true);
  }

  let onAddMenuItemClicked = () => {
    let emptyMenuItem = getInitSelectedMenuItem();
    const newIdx = newMenuItemLatestLocalIdx - 1;
    emptyMenuItem.id = newIdx;
    setEditingMenuItem(emptyMenuItem);
    setIsMenuItemDialogOpen(true);
    setNewMenuItemLatestLocalIdx(newIdx);
  }

  let onCloseAndDiscardChanges = () => {
    setIsMenuItemDialogOpen(false);
    setEditingMenuItem(getInitSelectedMenuItem());
  };

  let onCloseAndSaveChanges = (menuItemToSave: MenuItem) => {
    setIsMenuItemDialogOpen(false);
    const updatedTemplate: Template = JSON.parse(JSON.stringify(templateRef.current));
    const menuItemIdx = updatedTemplate.menuItems.findIndex(menuItem => 
      menuItem.id === menuItemToSave.id);
    if (menuItemIdx > -1) {
      updatedTemplate.menuItems[menuItemIdx] = menuItemToSave;
    } else {
      // TODO(MB) send to server instead of pushing, then add when received success from server
      updatedTemplate.menuItems.push(menuItemToSave);
    }
    setTemplate(updatedTemplate);
  }

  let getEditingMenuItemClone = (): MenuItem => {
    return JSON.parse(JSON.stringify(editingMenuItem));
  }

  return (
    <div className="App covid-container">
      <h1>
        Main message
      </h1>
      <MainMessageForm 
        template={templateRef.current}
        onMainHeaderChanged={onMainHeaderChanged}
        onPrefillMainHeaderClicked={onPrefillMainHeaderClicked}
        onAddMenuItemClicked={onAddMenuItemClicked}
        onOpenMenuItem={openMenuItem}/>
      {/* {isMenuItemDialogOpenRef.current &&  */}
        <MenuItemMessageForm 
          menuItem={getEditingMenuItemClone()}
          onCloseAndDiscardChanges={onCloseAndDiscardChanges}
          onCloseAndSaveChanges={onCloseAndSaveChanges}
          isVisible={isMenuItemDialogOpenRef.current}
        />
      {/* } */}
    </div>
  );
}

export default App;
