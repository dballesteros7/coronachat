import React, { useState } from 'react';
import './MenuItemMessageForm.scss';
import {
  Dialog,
  Button,
  Divider,
  makeStyles,
  Theme,
  createStyles,
  TextField,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { MenuItem, getIsTitleInvalid, getIsContentInvalid } from '../../model/model';
import SmartTextArea from '../SmartTextArea/SmartTextArea';
import { useTranslation } from 'react-i18next';

type MenuItemMessageFormProps = {
  menuItem: MenuItem;
  onDeleteMenuItem: (menuItem: MenuItem) => void;
  onMenuItemUpdatedInForm: (updatedMenuItem: MenuItem) => void;
  isVisible: boolean;
};

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
    deleteButton: {
      marginTop: 30,
      marginLeft: 0,
      marginBottm: theme.spacing(1),
      marginRight: theme.spacing(1),
      borderColor: theme.palette.error.main,
      color: theme.palette.error.main,
    },
  })
);

const MenuItemMessageForm = (props: MenuItemMessageFormProps) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const [isDeleteItemAlertShowing, setIsDeleteItemAlertShowing] = useState(false);
  // State used to avoid showing fields as wrong (red) when a new item open (of course empty)
  const [isTitleErrorEnabled, setIsTitleErrorEnabled] = useState(props.menuItem.id > 0);
  const [isContentErrorEnabled, setIsContentErrorEnabled] = useState(props.menuItem.id > 0);

  // useEffect(() => {
  //   // TODO (MB) Ideally, we don't want to update the state if props.menuItem chages
  //   // to avoid changing info while the user is editing; so this approach is not
  //   // good because it updates the state every time props.menuItem changes.
  //   // It is needed because this component gets constructed way before it's rendered
  //   // so when constructed props.menuItem is an empty object and so would remain
  //   // without this state update
  //   setMenuItem(JSON.parse(JSON.stringify(props.menuItem)));
  //   setIsTitleInvalid(checkIfTitleIsInvalid(props.menuItem.title));
  //   setIsContentInvalid(checkIfContentIsInvalid(props.menuItem.content));
  // }, [props.menuItem]);

  const onDeleteItemAskForConfirmClicked = () => {
    setIsDeleteItemAlertShowing(true);
  };

  const onDeleteItemClicked = () => {
    props.onDeleteMenuItem(props.menuItem);
    setIsDeleteItemAlertShowing(false);
  };

  const onPrefillContentClicked = () => {
    console.error('To be implemented!');
    // let updatedMenuItem = JSON.parse(JSON.stringify(menuItem));
    // updatedMenuItem.content = defaultMenuItem?.content || '';
    // setMenuItem(updatedMenuItem);
  };

  const onContentChanged = (newText: string) => {
    let updatedMenuItem = JSON.parse(JSON.stringify(props.menuItem));
    updatedMenuItem.content = newText;
    props.onMenuItemUpdatedInForm(updatedMenuItem);
    setIsContentErrorEnabled(true);
  };

  const onTitleChanged = (newTitle: string) => {
    let updatedMenuItem = JSON.parse(JSON.stringify(props.menuItem));
    updatedMenuItem.title = newTitle;
    props.onMenuItemUpdatedInForm(updatedMenuItem);
    setIsTitleErrorEnabled(true);
  };

  // const footerListItems = props.menuItem.footerItems.map((footerItem: string, idx: number) => {
  //   return (
  //     <ListItem key={idx} dense>
  //       <ListItemText primary={footerItem} />
  //     </ListItem>
  //   );
  // });

  return (
    <>
      <div className="MenuItemMessageForm">
        <span className="covid-title-box">
          <h3 className="covid-title">{t('MENU.OPTION_TITLE')}</h3>
        </span>
        <TextField
          fullWidth
          error={isTitleErrorEnabled && getIsTitleInvalid(props.menuItem.title)}
          helperText={t('TITLE_CANT_BE_EMPTY')}
          placeholder={t('MENU.OPTION_TITLE_PLACEHOLDER')}
          value={props.menuItem.title}
          variant="outlined"
          onChange={(e) => onTitleChanged(e.target.value)}
        />
        <Divider className="divider" />
        <SmartTextArea
          error={isContentErrorEnabled && getIsContentInvalid(props.menuItem.content)}
          helperText={t('CONTENT_CANT_BE_EMPTY')}
          showPrefill={false}
          showEdit={false}
          label={t('CONTENT')}
          value={props.menuItem.content}
          rows={11}
          placeholder={t('MENU.OPTION_CONTENT_PLACEHOLDER')}
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
          {t('MENU.DELETE_OPTION')}
        </Button>
      </div>

      {isDeleteItemAlertShowing && (
        <Dialog open={true} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">{t('MENU.DELETE_OPTION_DIALOG.TITLE')}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {t('MENU.DELETE_OPTION_DIALOG.MESSAGE')}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={onDeleteItemClicked} color="primary">
              {t('MENU.DELETE_OPTION_DIALOG.YES_BUTTON')}
            </Button>
            <Button
              onClick={() => setIsDeleteItemAlertShowing(false)}
              color="primary"
              style={{ fontWeight: 'bold' }}
              autoFocus
            >
              {t('MENU.DELETE_OPTION_DIALOG.NO_BUTTON')}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default MenuItemMessageForm;
