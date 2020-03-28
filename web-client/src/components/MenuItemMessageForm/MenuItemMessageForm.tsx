import React from 'react';
import './MenuItemMessageForm.scss';
import { Dialog, AppBar, Toolbar, IconButton, Typography, Button, List, TextField, ListItem, ListItemText, Divider, makeStyles, Theme, createStyles, Slide } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close'
import { TransitionProps } from '@material-ui/core/transitions/transition';
import { MenuItem } from '../../model/model';

type MenuItemMessageFormProps = {
  menuItem: MenuItem,
  onCloseAndDiscardChanges: () => void,
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
  
  let onCloseMenuItemClicked = () => {
    console.debug("close pressed")
    // TODO(MB) validation
    props.onCloseAndDiscardChanges();
  };

  return (
    <Dialog fullScreen open={props.isVisible} className="MainMessageForm" onClose={onCloseMenuItemClicked} TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={onCloseMenuItemClicked} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Details
          </Typography>
          <Button autoFocus color="inherit" onClick={onCloseMenuItemClicked}>
            save
          </Button>
        </Toolbar>
      </AppBar>
      <List>
        <TextField
          className="text-field"
          label="Header"
          multiline
          rows="8"
          value={props.menuItem.content}
          placeholder={''}
          variant="outlined"
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
