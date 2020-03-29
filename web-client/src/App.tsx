import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import MainMessageForm from './components/MainMessageForm/MainMessageForm';
import { defaultTemplate, defaultFooterItemBackToMenu } from './sampleData/defaultTemplate';
import { Template, MenuItem } from './model/model';
import MenuItemMessageForm from './components/MenuItemMessageForm/MenuItemMessageForm';
import { makeStyles, Theme, createStyles, AppBar, Toolbar, Typography, ThemeProvider, createMuiTheme } from '@material-ui/core';
import { CoronaChatAPI } from './services/CoronaChatAPI';
import MessagePreview from './components/MessagePreview/MessagePreview';
import SplitLayout from './components/SplitLayout/SplitLayout';

function getInitSelectedMenuItem(): MenuItem {
  // TODO(MB) could set initial value to null without compiler complaining
  return {
    id: -1,
    title: '',
    footerItems: [defaultFooterItemBackToMenu],
    content: ''
  };  
}

function getEmptyTemplate(): Template {
  return {
    header: '',
    menuItems: []
  }
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative'
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
      color: 'white'
    },
  }),
);

const theme = createMuiTheme({
  palette: {
    primary: {
      // Whatsapp top bar green
      main: '#1EBEA5',
    },
    secondary: {
      main: '#FFFFFF',
    },
  },
});

const App = () => {

  const coronaChatAPI = new CoronaChatAPI();

  const classes = useStyles();

  useEffect(() => {
    coronaChatAPI.getTemplate().then(template => {
      console.debug("Got template from server", template);
      setTemplate(template);
    }).catch(error => console.error(error));
  }, []);

  // TODO(MB) is this really the simplest way that allows using setState inside
  // an event handler? see https://medium.com/geographit/accessing-react-state-in-event-listeners-with-usestate-and-useref-hooks-8cceee73c559
  const [_template, _setTemplate] = useState(getEmptyTemplate());
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

  let mainForm = (
    <MainMessageForm 
    template={templateRef.current}
    onMainHeaderChanged={onMainHeaderChanged}
    onPrefillMainHeaderClicked={onPrefillMainHeaderClicked}
    onAddMenuItemClicked={onAddMenuItemClicked}
    onOpenMenuItem={openMenuItem}/>
  );

  let messagePreview = (
    <div className="msg-preview-box">
      <MessagePreview value="very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very long text"/>
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      {/* TODO(MB) create a custom appbar reusable component and use it everywhere */}
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="secondary" className={classes.title}>
            Initial message
          </Typography>
        </Toolbar>
      </AppBar>
      <div className="App covid-container">
        <MenuItemMessageForm 
          menuItem={getEditingMenuItemClone()}
          onCloseAndDiscardChanges={onCloseAndDiscardChanges}
          onCloseAndSaveChanges={onCloseAndSaveChanges}
          isVisible={isMenuItemDialogOpenRef.current}
        />
        <SplitLayout
          mainContent = {mainForm}
          optionalContent = {messagePreview}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
