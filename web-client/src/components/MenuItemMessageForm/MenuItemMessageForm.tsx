import React, { useState, useEffect } from 'react';
import './MenuItemMessageForm.scss';
import { Dialog, AppBar, Toolbar, IconButton, Typography, Button, List, ListItem, ListItemText, Divider, makeStyles, Theme, createStyles, Slide, ListSubheader, TextField, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
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
      position: 'relative'
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
      color: 'white'
    },
  }),
);

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MenuItemMessageForm = (props: MenuItemMessageFormProps) => {

  const classes = useStyles();

  const [menuItem, setMenuItem] = useState(JSON.parse(JSON.stringify(props.menuItem)));
  const [isTitleInvalid, setIsTitleInvalid] = useState(false);
  const [isContentInvalid, setIsContentInvalid] = useState(false);
  const [isDiscardChangesShowing, setIsDiscardChangesShowing] = useState(false);

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
    setIsDiscardChangesShowing(true);
  };

  let onDiscardChangesClicked = () => {
    props.onCloseAndDiscardChanges();
    setIsDiscardChangesShowing(false);
  }

  let onSaveMenuItemClicked = () => {
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
    setIsContentInvalid(newText.length == 0);
  }

  let onTitleChanged = (newTitle: string) => {
    let updatedMenuItem = JSON.parse(JSON.stringify(menuItem));
    updatedMenuItem.title = newTitle;
    setMenuItem(updatedMenuItem);
    setIsTitleInvalid(newTitle.length == 0);
  }

  let footerListItems = menuItem.footerItems.map((footerItem: string, idx: number) => {
    return (
        <ListItem key={idx} dense>
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
          <IconButton edge="start" color="secondary" 
          onClick={onCloseMenuItemClicked} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Details
          </Typography>
          <Button autoFocus disabled={isTitleInvalid || isContentInvalid} color="secondary" onClick={onSaveMenuItemClicked}>
            save
          </Button>
        </Toolbar>
      </AppBar>
      <div className="covid-container">
        {/* <List> */}
          <h3 className="covid-title">Sub-message title</h3>
          <TextField fullWidth error={isTitleInvalid} helperText="The title cannot be empty." 
            placeholder="Write the text to show next to the menu item number" 
            value={menuItem.title} variant="outlined" 
            onChange={e => onTitleChanged(e.target.value)}/>
          <Divider className="divider"/>
          <SmartTextArea 
            error={isContentInvalid}
            helperText="The content cannot be empty." 
            showPrefill={false}
            showEdit={false}
            label='Main content'
            value={menuItem.content}
            rows={11}
            placeholder='Write here the main content of the sub-message'
            onPrefillClicked={onPrefillContentClicked}
            onChange={onContentChanged}
            onSaveClicked={onContentChanged}
          />
          <Divider className="divider"/>
          <h3 className="covid-title">Footer</h3>
          <List component="nav">{footerListItems}</List>
        {/* </List> */}
      </div>
      {isDiscardChangesShowing && 
        <Dialog
          open={true}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Are you sure to discard your changes?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              If you close you will lose any change that you may have made.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={onDiscardChangesClicked} color="primary">
              Yes, discard and close
            </Button>
            <Button onClick={() => setIsDiscardChangesShowing(false)} color="primary" style={{fontWeight: 'bold'}} autoFocus>
              No, continue editing
            </Button>
          </DialogActions>
        </Dialog>
      }
    </Dialog>
  )
};

export default MenuItemMessageForm;
