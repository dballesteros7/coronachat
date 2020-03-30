import React, { useState, useEffect } from 'react';
import './MenuItemMessageForm.scss';
import { Dialog, AppBar, Toolbar, IconButton, Typography, Button, ListItem, ListItemText, Divider, makeStyles, Theme, createStyles, Slide, TextField, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close'
import DeleteIcon from '@material-ui/icons/Delete'
import { TransitionProps } from '@material-ui/core/transitions/transition';
import { MenuItem } from '../../model/model';
import SmartTextArea from '../SmartTextArea/SmartTextArea';

type MenuItemMessageFormProps = {
  menuItem: MenuItem,
  onCloseAndDiscardChanges: () => void,
  onCloseAndSaveChanges: (menuItem: MenuItem) => void,
  onDeleteMenuItem: (menuItem: MenuItem) => void,
  isVisible: boolean
}

function checkIfTitleIsInvalid(title: string): boolean {
  return title.length === 0;
}

function checkIfContentIsInvalid(content: string): boolean {
  return content.length === 0;
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
    deleteButton: {
      marginTop: 30,
      marginLeft: 0,
      marginBottm: theme.spacing(1),
      marginRight: theme.spacing(1),
      borderColor: theme.palette.error.main,
      color: theme.palette.error.main
    }
  }),
);

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MenuItemMessageForm = (props: MenuItemMessageFormProps) => {

  const classes = useStyles();

  const [menuItem, setMenuItem] = useState(JSON.parse(JSON.stringify(props.menuItem)));
  const [isTitleInvalid, setIsTitleInvalid] = useState(checkIfTitleIsInvalid(menuItem.title));
  const [isContentInvalid, setIsContentInvalid] = useState(checkIfContentIsInvalid(menuItem.content));
  const [isDiscardChangesAlertShowing, setIsDiscardChangesAlertShowing] = useState(false);
  const [isDeleteItemAlertShowing, setIsDeleteItemAlertShowing] = useState(false);
  // State used to avoid showing fields as wrong (red) when a new item open (of course empty)
  const [isTitleErrorEnabled, setIsTitleErrorEnabled] = useState(props.menuItem.id > 0);
  const [isContentErrorEnabled, setIsContentErrorEnabled] = useState(props.menuItem.id > 0);

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
    setIsDiscardChangesAlertShowing(true);
  };

  let onDeleteItemAskForConfirmClicked = () => {
    setIsDeleteItemAlertShowing(true);
  }

  let onDeleteItemClicked = () => {
    props.onDeleteMenuItem(props.menuItem);
    setIsDeleteItemAlertShowing(false);
  }

  let onDiscardChangesClicked = () => {
    props.onCloseAndDiscardChanges();
    setIsDiscardChangesAlertShowing(false);
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
    setIsContentInvalid(checkIfContentIsInvalid(newText));
    setIsContentErrorEnabled(true);
  }

  let onTitleChanged = (newTitle: string) => {
    let updatedMenuItem = JSON.parse(JSON.stringify(menuItem));
    updatedMenuItem.title = newTitle;
    setMenuItem(updatedMenuItem);
    setIsTitleInvalid(checkIfTitleIsInvalid(newTitle));
    setIsTitleErrorEnabled(true);
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
            Opción del menú
          </Typography>
          <Button autoFocus disabled={isTitleInvalid || isContentInvalid} color="secondary" onClick={onSaveMenuItemClicked}>
            Guardar
          </Button>
        </Toolbar>
      </AppBar>
      <div className="covid-container">
        <h3 className="covid-title">Título de la opción (visible en el menú principal)</h3>
        <TextField fullWidth error={isTitleErrorEnabled && isTitleInvalid} helperText="El título no puede estar vacío." 
          placeholder="Escribe el texto que se ve en la opción del menu principal" 
          value={menuItem.title} variant="outlined" 
          onChange={e => onTitleChanged(e.target.value)}/>
        <Divider className="divider"/>
        <SmartTextArea 
          error={isContentErrorEnabled && isContentInvalid}
          helperText="El contenido no puede estar vacío." 
          showPrefill={false}
          showEdit={false}
          label='Contenido'
          value={menuItem.content}
          rows={11}
          placeholder='Escriba aquí el contenido del mensaje enviado cuando se selecciona esta opción.'
          onPrefillClicked={onPrefillContentClicked}
          onChange={onContentChanged}
          onSaveClicked={onContentChanged}
        />
        {/* <Divider className="divider"/>
        <h3 className="covid-title">Footer</h3>
        <List component="nav">{footerListItems}</List> */}
        <Button
          variant="outlined"
          className={classes.deleteButton}
          startIcon={<DeleteIcon />}
          onClick={onDeleteItemAskForConfirmClicked}
        >
          Borrar esta opción
        </Button>
      </div>
      {/* TODO(MB) there must be a better way to show a dialog/aler/toast (that may rarely be opened) programmatically 
          than keeping a variable in the state all the time*/}
      {isDiscardChangesAlertShowing && 
        <Dialog
          open={true}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Tiene cambios no guardados"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Si cierra esta vista, perderá los cambios no guardados. ¿Está seguro?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={onDiscardChangesClicked} color="primary">
              Sí, cerrar y descartar cambios
            </Button>
            <Button onClick={() => setIsDiscardChangesAlertShowing(false)} color="primary" style={{fontWeight: 'bold'}} autoFocus>
              No, seguir editando
            </Button>
          </DialogActions>
        </Dialog>
      }
      {isDeleteItemAlertShowing && 
        <Dialog
          open={true}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Borrar esta opción"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Si borra esta opción, se eliminará del menú principal y se perderá su contenido. ¿Está seguro?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={onDeleteItemClicked} color="primary">
              Sí, borrar la opción
            </Button>
            <Button onClick={() => setIsDeleteItemAlertShowing(false)} color="primary" style={{fontWeight: 'bold'}} autoFocus>
              No, seguir editando
            </Button>
          </DialogActions>
        </Dialog>
      }
    </Dialog>
  )
};

export default MenuItemMessageForm;
