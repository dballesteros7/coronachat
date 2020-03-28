import React, { useState, useRef } from 'react';
import './App.css';
import MainMessageForm from './components/MainMessageForm/MainMessageForm';
import { defaultTemplate } from './sampleData/defaultTemplate';
import { Template, MenuItem } from './model/model';
import { Dialog, AppBar, Toolbar, IconButton, Typography, Button, List, ListItem, ListItemText, Divider, Slide, makeStyles, Theme, createStyles } from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  }),
);

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const App = () => {
  const classes = useStyles();

  // TODO(MB) is this really the simplest way that allows using setState inside
  // an event handler?
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
  }

  let onCloseMenuItemClicked = () => {
    setIsMenuItemDialogOpen(false);
  };

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
        <Dialog fullScreen open={isMenuItemDialogOpenRef.current} onClose={onCloseMenuItemClicked} TransitionComponent={Transition}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={onCloseMenuItemClicked} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Sound
              </Typography>
              <Button autoFocus color="inherit" onClick={onCloseMenuItemClicked}>
                save
              </Button>
            </Toolbar>
          </AppBar>
          <List>
            <ListItem button>
              <ListItemText primary="Phone ringtone" secondary="Titania" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary="Default notification ringtone" secondary="Tethys" />
            </ListItem>
          </List>
        </Dialog>
    </div>
  );
}

export default App;
