import React, { useState } from 'react';
import './MenuItemDetail.scss';
import {
  makeStyles,
  Theme,
  createStyles,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Dialog,
  Slide,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core';
import MessagePreview from '../../components/MessagePreview/MessagePreview';
import SplitLayout from '../../components/SplitLayout/SplitLayout';
import Drawer from '@material-ui/core/Drawer';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CloseIcon from '@material-ui/icons/Close';
import { useTranslation } from 'react-i18next';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import { MenuItem } from '../../model/model';
import MenuItemMessageForm from '../../components/MenuItemMessageForm/MenuItemMessageForm';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
      padding: '3px 0',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
      color: 'white',
    },
    drawer: {
      // width: '100%',
      // backgroundColor: 'red'
    },
  })
);

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type MenuItemDetailProps = {
  menuItem: MenuItem;
  onCloseAndDiscardChanges: () => void;
  onCloseAndSaveChanges: (menuItem: MenuItem) => void;
  onDeleteMenuItem: (menuItem: MenuItem) => void;
};

const MenuItemDetail = (props: MenuItemDetailProps) => {
  const { t } = useTranslation();
  const classes = useStyles();

  // TODO menu item goes here because is shared between form (editing) and preview read only
  // otherwise the preview can't be live
  // form has to communicated out actions like delete, edit of each field
  const [menuItem, setMenuItem] = useState(JSON.parse(JSON.stringify(props.menuItem)));

  const [isDiscardChangesAlertShowing, setIsDiscardChangesAlertShowing] = useState(false);
  const [isMsgPreviewDrawerOpen, setMsgPreviewDrawerOpen] = useState(false);

  const onCloseMenuItemClicked = () => {
    setIsDiscardChangesAlertShowing(true);
  };

  const onSaveMenuItemClicked = () => {
    props.onCloseAndSaveChanges(menuItem);
  };

  const onDiscardChangesClicked = () => {
    props.onCloseAndDiscardChanges();
    setIsDiscardChangesAlertShowing(false);
  };

  const onMenuItemUpdatedInForm = (updatedMenuItem: MenuItem) => {
    setMenuItem(updatedMenuItem);
  };

  let messagePreview = (
    <div className="msg-preview-box">
      <MessagePreview bgColor="#F4F4F4" value={menuItem.content} />
    </div>
  );

  const menuItemForm = (
    <MenuItemMessageForm
      menuItem={menuItem}
      onDeleteMenuItem={props.onDeleteMenuItem}
      onMenuItemUpdatedInForm={onMenuItemUpdatedInForm}
      isVisible={true}
    />
  );

  return (
    <Dialog
      fullScreen
      disableBackdropClick={true}
      disableEscapeKeyDown={true}
      open={true}
      onClose={onCloseMenuItemClicked}
      TransitionComponent={Transition}
    >
      <React.Fragment key={'RIGHT'}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="secondary" onClick={onCloseMenuItemClicked} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {t('MENU.OPTION')}
            </Typography>
            <IconButton autoFocus id="preview-button" color="secondary" onClick={() => setMsgPreviewDrawerOpen(true)}>
              <VisibilityIcon></VisibilityIcon>
            </IconButton>
            <Button
              autoFocus
              // TODO(MB)
              // disabled={isTitleInvalid || isContentInvalid}
              color="secondary"
              onClick={onSaveMenuItemClicked}
            >
              {t('ACTIONS.SAVE')}
            </Button>
          </Toolbar>
        </AppBar>
        <div className="MenuItemDetail covid-container">
          <SplitLayout mainContent={menuItemForm} optionalContent={messagePreview} />
          <Drawer
            className={classes.drawer + ' MsgPreviewDrawer'}
            anchor={'right'}
            open={isMsgPreviewDrawerOpen}
            onClose={() => {}}
          >
            <div className="drawer-content">
              <div className="covid-title-box">
                <div className="covid-title">Vista preliminar del mensaje</div>
                <IconButton autoFocus size="medium" aria-label="close" onClick={() => setMsgPreviewDrawerOpen(false)}>
                  <CloseOutlinedIcon color="primary"></CloseOutlinedIcon>
                </IconButton>
              </div>
              {messagePreview}
            </div>
          </Drawer>
        </div>
      </React.Fragment>
      {/* TODO(MB) there must be a better way to show a dialog/aler/toast (that may rarely be opened) programmatically
          than keeping a variable in the state all the time*/}
      {isDiscardChangesAlertShowing && (
        <Dialog open={true} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">{t('UNSAVED_CHANGES_DIALOG.TITLE')}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">{t('UNSAVED_CHANGES_DIALOG.MESSAGE')}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={onDiscardChangesClicked} color="primary">
              {t('UNSAVED_CHANGES_DIALOG.YES_BUTTON')}
            </Button>
            <Button
              onClick={() => setIsDiscardChangesAlertShowing(false)}
              color="primary"
              style={{ fontWeight: 'bold' }}
              autoFocus
            >
              {t('UNSAVED_CHANGES_DIALOG.NO_BUTTON')}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Dialog>
  );
};

export default MenuItemDetail;
