import React, { Component } from 'react';
import './App.css';
import MainMessageForm from './components/MainMessageForm/MainMessageForm';
import { defaultTemplate } from './sampleData/defaultTemplate';
import { Template, MenuItem } from './model/model';
import { Dialog, AppBar, Toolbar, IconButton, Typography, Button, List, ListItem, ListItemText, Divider, Slide } from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import CloseIcon from '@material-ui/icons/Close'

type AppState = {
  template: Template,
  isMenuItemDialogOpen: boolean
}

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class App extends Component<{}, AppState> {
  constructor(props: any) {
    super(props)
    //TODO(MB) deep clone is temporary - replace sample template with one 
    // returned by the server
    this.state = {
      template: JSON.parse(JSON.stringify(defaultTemplate)),
      isMenuItemDialogOpen: false
    }
  }

  updateTemplateHeaderInState(headerText: string) {
    const template = this.state.template;
    template.header = headerText;
    this.setState({
      template: template
    }, () => {
      console.log("Updated global template", this.state.template);
    });
  }

  onPrefillMainHeaderClicked() {
    this.updateTemplateHeaderInState(defaultTemplate.header);
  }

  onMainHeaderChanged(newText: string) {
    this.updateTemplateHeaderInState(newText);
  }

  openMenuItem(menuItem: MenuItem) {
    console.debug("need to open menu item", menuItem);
    this.setState({
      isMenuItemDialogOpen: true
    });
  }

  onCloseMenuItemClicked = () => {
    this.setState({
      isMenuItemDialogOpen: false
    });
  };

  render() {
    return (
      <div className="App">
        <h1>
          Main message
        </h1>
        <MainMessageForm 
          template={this.state.template}
          onMainHeaderChanged={(newText) => this.onMainHeaderChanged(newText)}
          onPrefillMainHeaderClicked={() => this.onPrefillMainHeaderClicked()}
          onOpenMenuItem={(menuItem) => this.openMenuItem(menuItem)}/>
          <Dialog fullScreen open={this.state.isMenuItemDialogOpen} onClose={this.onCloseMenuItemClicked} TransitionComponent={Transition}>
            <AppBar>
            {/* <AppBar className={classes.appBar}> */}
              <Toolbar>
                <IconButton edge="start" color="inherit" onClick={this.onCloseMenuItemClicked} aria-label="close">
                  <CloseIcon />
                </IconButton>
                <Typography variant="h6">
                {/* <Typography variant="h6" className={classes.title}> */}
                  Sound
                </Typography>
                <Button autoFocus color="inherit" onClick={this.onCloseMenuItemClicked}>
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
}

export default App;
