import React, { useState, useEffect } from 'react';
import './MenuItemMessageForm.scss';
import { Dialog, AppBar, Toolbar, IconButton, Typography, Button, List, TextField, ListItem, ListItemText, Divider, makeStyles, Theme, createStyles, Slide } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close'
import { TransitionProps } from '@material-ui/core/transitions/transition';
import { MenuItem } from '../../model/model';
import SmartTextArea from '../SmartTextArea/SmartTextArea';

type MenuItemMessageFormProps = {
  menuItem: MenuItem,
  onCloseAndDiscardChanges: () => void,
  onCloseAndSaveChanges: (menuItem: MenuItem) => void,
  isVisible: boolean
}

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

const MenuItemMessageForm = (props: MenuItemMessageFormProps) => {

  const classes = useStyles();

  const [menuItem, setMenuItem] = useState(JSON.parse(JSON.stringify(props.menuItem)));
  useEffect(() => {
    // TODO (MB) Ideally, we don't want to update the state if props.menuItem chages
    // to avoid changing info while the user is editing; so this approach is not
    // good because it updates the state every time props.menuItem changes.
    // It is needed because this component gets constructed way before it's rendered
    // so when constructed props.menuItem is an empty object and so would remain
    // without this state update
    setMenuItem(JSON.parse(JSON.stringify(props.menuItem)));
  }, [props.menuItem])

  let onCloseMenuItemClicked = () => {
    // TODO(MB) ask discard changes
    props.onCloseAndDiscardChanges();
  };

  let onSaveMenuItemClicked = () => {
    console.debug("save pressed")
    // TODO(MB) validation
    props.onCloseAndSaveChanges(menuItem);
  };

  let onPrefillContentClicked = () => {
    let updatedMenuItem = JSON.parse(JSON.stringify(menuItem));
    updatedMenuItem.content = "Prefillleeeed";
    setMenuItem(updatedMenuItem);
  }

  let onContentChanged = (newText: string) => {
    let updatedMenuItem = JSON.parse(JSON.stringify(menuItem));
    updatedMenuItem.content = newText;
    setMenuItem(updatedMenuItem);
  }

  return (
    <Dialog fullScreen open={props.isVisible} className="MainMessageForm" 
      onClose={onCloseMenuItemClicked} TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" 
          onClick={onCloseMenuItemClicked} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Details
          </Typography>
          <Button autoFocus color="inherit" onClick={onSaveMenuItemClicked}>
            save
          </Button>
        </Toolbar>
      </AppBar>
      <List>
        <SmartTextArea 
          value={menuItem.content}
          // TODO(MB) get default value from defaultTemplate for prefilling
          placeholder={''}
          rows={8}
          onPrefillClicked={onPrefillContentClicked}
          onChange={onContentChanged}
        />
        <ListItem button>
          <ListItemText primary="Phone ringtone" secondary="Titania" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText primary="Default notification ringtone" secondary="Tethys" />
        </ListItem>
      </List>
    </Dialog>
  )
};

export default MenuItemMessageForm;
