import React, { useState, useEffect } from 'react';
import './MenuItemMessageForm.scss';
import { Dialog, AppBar, Toolbar, IconButton, Typography, Button, List, ListItem, ListItemText, Divider, makeStyles, Theme, createStyles, Slide, ListSubheader } from '@material-ui/core';
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
    console.error("To be implemented!");
    // let updatedMenuItem = JSON.parse(JSON.stringify(menuItem));
    // updatedMenuItem.content = defaultMenuItem?.content || '';
    // setMenuItem(updatedMenuItem);
  }

  let onContentChanged = (newText: string) => {
    let updatedMenuItem = JSON.parse(JSON.stringify(menuItem));
    updatedMenuItem.content = newText;
    setMenuItem(updatedMenuItem);
  }

  let footerListItems = menuItem.footerItems.map((footerItem: string, idx: number) => {
    return (
        <ListItem key={idx}>
          <ListItemText primary={footerItem}/>
        </ListItem>
      );
    }
  );

  return (
    <Dialog fullScreen disableBackdropClick={true} disableEscapeKeyDown={true}
      open={props.isVisible} className="MenuItemMessageForm" 
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
          label='Main content'
          value={menuItem.content}
          placeholder={'Write the main content of your message here. You can use some existing text by pressing the "Prefill button"'}
          rows={8}
          onPrefillClicked={onPrefillContentClicked}
          onChange={onContentChanged}
        />
        <Divider className="divider"/>
        <List subheader={<ListSubheader>Footer</ListSubheader>} component="nav">
        {footerListItems}
        </List>
      </List>
    </Dialog>
  )
};

export default MenuItemMessageForm;
