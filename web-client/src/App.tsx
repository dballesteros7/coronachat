import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import MainMessageForm from './components/MainMessageForm/MainMessageForm';
import { defaultTemplate } from './sampleData/defaultTemplate';
import { Template, MenuItem } from './model/model';
import MenuItemMessageForm from './components/MenuItemMessageForm/MenuItemMessageForm';

function getInitSelectedMenuItem(): MenuItem {
    // TODO(MB) could set initial value to null without compiler complaining
  return {
    title: '',
    index: -1,
    footerItems: [],
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

  useEffect(() => {
    console.debug("editing item", editingMenuItem);
  });

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
    setIsMenuItemDialogOpen(true);
    setEditingMenuItem(menuItem);
  }

  let onCloseAndDiscardChanges = () => {
    setIsMenuItemDialogOpen(false);
    setEditingMenuItem(getInitSelectedMenuItem());
  };

  let onCloseAndSaveChanges = (menuItemToSave: MenuItem) => {
    setIsMenuItemDialogOpen(false);
    const updatedTemplate: Template = JSON.parse(JSON.stringify(templateRef.current));
    // TODO(MB) assuming index (ordering position unique and not changing
    // while user its editing its details)
    const menuItemIdx = updatedTemplate.menuItems.findIndex(menuItem => 
      menuItem.index === menuItemToSave.index);
    updatedTemplate.menuItems[menuItemIdx] = menuItemToSave;
    setTemplate(updatedTemplate);
  }

  let getEditingMenuItemClone = (): MenuItem => {
    return JSON.parse(JSON.stringify(editingMenuItem));
  }

  return (
    <div className="App">
      <h1>
        Main message
      </h1>
      <MainMessageForm 
        template={templateRef.current}
        onMainHeaderChanged={(newText) => onMainHeaderChanged(newText)}
        onPrefillMainHeaderClicked={() => onPrefillMainHeaderClicked()}
        onOpenMenuItem={(menuItem) => openMenuItem(menuItem)}/>
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
