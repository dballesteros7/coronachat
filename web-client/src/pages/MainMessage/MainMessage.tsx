import React, { useState, useRef, useEffect, useContext } from 'react';
import './MainMessage.scss';
import MainMessageForm from '../../components/MainMessageForm/MainMessageForm';
import { Template, MenuItem } from '../../model/model';
import { makeStyles, Theme, createStyles, AppBar, Toolbar, Typography, IconButton, Button } from '@material-ui/core';
import { CoronaChatAPI } from '../../services/CoronaChatAPI';
import MessagePreview from '../../components/MessagePreview/MessagePreview';
import SplitLayout from '../../components/SplitLayout/SplitLayout';
import { TrialCoronaChatAPI } from '../../services/TrialCoronaChatAPI';
import Drawer from '@material-ui/core/Drawer';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import VisibilityIcon from '@material-ui/icons/Visibility';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { useTranslation } from 'react-i18next';
import { Language } from '../../i18n';
import { getLocalDefaultTemplateForLanguage } from '../../utils/logic-utils';
import MenuItemDetail from '../MenuItemDetail/MenuItemDetail';
import IntroStepper from '../../components/IntroStepper/IntroStepper';
import { useLocation, useHistory } from 'react-router-dom';
import { UserContext } from '../../App';

export function getEmptyTemplate(): Template {
  return {
    header: '',
    menuItems: [],
  };
}

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

const introStepsCompletedKey = 'introStepsCompleted';

export type DashboardState = {
  isTrial: boolean;
};

const MainMessage = () => {
  const { t, i18n } = useTranslation();
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const { setUser } = useContext(UserContext);

  const [isMsgPreviewDrawerOpen, setMsgPreviewDrawerOpen] = useState(false);
  const [isIntroStepperOpen, setIsIntroStepperOpen] = useState(false);

  const coronaChatAPI = useRef(
    // TODO(MB) this is not very readable; const isTrial = (location.state as DashboardState)?.isTrial ?? true
    // would be better, but looks like I cannot assign an init function to useRef to compute initial value
    // if I define isTrial outside useRef, the check in its definition is performed at every render.
    (location.state as DashboardState)?.isTrial ?? true
      ? new TrialCoronaChatAPI(i18n.language as Language)
      : new CoronaChatAPI()
  );

  // TODO(MB) is this really the simplest way that allows using setState inside
  // an event handler? see https://medium.com/geographit/accessing-react-state-in-event-listeners-with-usestate-and-useref-hooks-8cceee73c559
  const [_template, _setTemplate] = useState(getEmptyTemplate());
  var templateRef = useRef(_template);
  const setTemplate = (newTemplate: Template) => {
    templateRef.current = newTemplate;
    _setTemplate(newTemplate);
  };

  const [defaultTemplate, setDefaultTemplate] = useState(getLocalDefaultTemplateForLanguage(i18n.language as Language));

  const [_isMenuItemDialogOpen, _setIsMenuItemDialogOpen] = useState(false);
  var isMenuItemDialogOpenRef = useRef(_isMenuItemDialogOpen);
  const setIsMenuItemDialogOpen = (newValue: boolean) => {
    isMenuItemDialogOpenRef.current = newValue;
    _setIsMenuItemDialogOpen(newValue);
  };

  useEffect(() => {
    // TODO(MB) add some loading UI
    coronaChatAPI.current
      .getTemplate()
      .then((template) => {
        console.debug('Got template from server', template);
        setTemplate(template);
      })
      .catch((error) => {
        // TODO(MB) notify user
        console.error(error);
      })
      .finally(() => {
        coronaChatAPI.current
          .getDefaultTemplate()
          .then((defaultTemplate) => {
            console.debug('Got default template from server', defaultTemplate);
            setDefaultTemplate(defaultTemplate);
          })
          .catch((error) => {
            // TODO(MB) notify user
            console.error(error);
          });
      });

    setIsIntroStepperOpen(localStorage.getItem(introStepsCompletedKey) !== 'true');
  }, []);

  const getDefaultFooterItemBackToMenu = (): string => {
    return defaultTemplate.menuItems[0]?.footerItems[0] ?? '';
  };

  const getEmptyDefaultMenuItem = (): MenuItem => {
    // TODO(MB) could set initial value to null without compiler complaining
    return {
      id: -1,
      title: '',
      footerItems: [getDefaultFooterItemBackToMenu()],
      content: '',
    };
  };

  // TODO(MB) Does not make sense to store this menuItem
  // find a way to pass it to MenuItemMessageForm directly from 'openMenuItem' handler
  const initSelectedMenuItem = getEmptyDefaultMenuItem();
  const [editingMenuItem, setEditingMenuItem] = useState(initSelectedMenuItem);

  const newMenuItemLatestLocalIdx = useRef(-1);

  let updateTemplateHeaderInState = (headerText: string) => {
    // TODO(MB) check deep copy
    const updatedTemplate = JSON.parse(JSON.stringify(templateRef.current));
    updatedTemplate.header = headerText;
    setTemplate(updatedTemplate);
  };

  let onPrefillMainHeaderClicked = () => {
    updateTemplateHeaderInState(defaultTemplate.header);
  };

  let onMainHeaderChanged = (newText: string) => {
    updateTemplateHeaderInState(newText);
  };

  let onSaveMainHeaderClicked = (_: string) => {
    coronaChatAPI.current
      .updateTemplate(templateRef.current)
      .then(() => {
        console.debug('Template updated successfully');
      })
      .catch((error) => {
        // TODO(MB) notify user
        console.error('Update template server request failed with error', error);
      });
  };

  let openMenuItem = (menuItem: MenuItem) => {
    setEditingMenuItem(menuItem);
    setIsMenuItemDialogOpen(true);
  };

  let onAddMenuItemClicked = () => {
    let emptyMenuItem = getEmptyDefaultMenuItem();
    const newIdx = newMenuItemLatestLocalIdx.current - 1;
    emptyMenuItem.id = newIdx;
    setEditingMenuItem(emptyMenuItem);
    setIsMenuItemDialogOpen(true);
    newMenuItemLatestLocalIdx.current = newIdx;
  };

  let onCloseAndDiscardChanges = () => {
    setIsMenuItemDialogOpen(false);
    setEditingMenuItem(getEmptyDefaultMenuItem());
  };

  let onCloseAndSaveChanges = (menuItem: MenuItem, deleteItem: boolean = false) => {
    setIsMenuItemDialogOpen(false);
    const updatedTemplate: Template = JSON.parse(JSON.stringify(templateRef.current));
    const menuItemIdx = updatedTemplate.menuItems.findIndex((item) => item.id === menuItem.id);
    if (deleteItem && menuItemIdx > -1) {
      updatedTemplate.menuItems.splice(menuItemIdx, 1);
    } else if (!deleteItem && menuItemIdx > -1) {
      updatedTemplate.menuItems[menuItemIdx] = menuItem;
    } else if (!deleteItem) {
      // menuItem not found in existing array and must be saved (i.e. !delete)

      // TODO(MB) add them to the list only when received success from server
      // when post of single menu item is ready
      updatedTemplate.menuItems.push(menuItem);
    }
    coronaChatAPI.current
      .updateTemplate(updatedTemplate)
      .then(() => {
        console.debug('Template updated successfully');
      })
      .catch((error) => {
        // TODO(MB) notify user
        console.error('Update template server request failed with error', error);
      });
    setTemplate(updatedTemplate);
    setEditingMenuItem(getEmptyDefaultMenuItem());
  };

  const getEditingMenuItemClone = (): MenuItem => {
    return JSON.parse(JSON.stringify(editingMenuItem));
  };

  const getMessagePreviewText = (): string => {
    const menuText = templateRef.current.menuItems
      .reduce((titlesArray, item, idx) => titlesArray.concat(`${idx + 1}. ${item.title}`), [] as string[])
      .join('\n');
    const text = templateRef.current.header + '\n' + menuText;
    return text;
  };

  const onIntroStepsCompleted = () => {
    setIsIntroStepperOpen(false);
    localStorage.setItem(introStepsCompletedKey, 'true');
  };

  const onLogoutClicked = () => {
    setUser(undefined);
    history.replace('/');
  };

  let mainForm = (
    <MainMessageForm
      template={templateRef.current}
      onMainHeaderChanged={onMainHeaderChanged}
      onPrefillMainHeaderClicked={onPrefillMainHeaderClicked}
      onAddMenuItemClicked={onAddMenuItemClicked}
      onSaveMainHeaderClicked={onSaveMainHeaderClicked}
      onOpenMenuItem={openMenuItem}
    />
  );

  const messagePreview = (
    <div className="msg-preview-box">
      <MessagePreview bgColor="#F4F4F4" value={getMessagePreviewText()} />
    </div>
  );

  return (
    <>
      {/* TODO(MB) create a custom appbar reusable component and use it everywhere */}
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="secondary" className={classes.title}>
            {t('DASHBOARD_TITLE')}
          </Typography>
          <IconButton autoFocus color="secondary" onClick={() => setIsIntroStepperOpen(true)}>
            <HelpOutlineIcon></HelpOutlineIcon>
          </IconButton>
          <IconButton autoFocus id="preview-button" color="secondary" onClick={() => setMsgPreviewDrawerOpen(true)}>
            <VisibilityIcon></VisibilityIcon>
          </IconButton>
          <Button color="secondary" onClick={onLogoutClicked}>
            {t('ACTIONS.LOGOUT')}
          </Button>
        </Toolbar>
      </AppBar>
      <React.Fragment key={'RIGHT'}>
        <div className="MainMessage covid-container">
          {isMenuItemDialogOpenRef.current && (
            <MenuItemDetail
              menuItem={getEditingMenuItemClone()}
              onDeleteMenuItem={(menuItem) => {
                onCloseAndSaveChanges(menuItem, true);
              }}
              onCloseAndDiscardChanges={onCloseAndDiscardChanges}
              onCloseAndSaveChanges={onCloseAndSaveChanges}
            />
          )}
          <SplitLayout mainContent={mainForm} optionalContent={messagePreview} />
          {isIntroStepperOpen && <IntroStepper onIntroFinished={onIntroStepsCompleted} />}
          <Drawer
            className={classes.drawer + ' MsgPreviewDrawer'}
            anchor={'right'}
            open={isMsgPreviewDrawerOpen}
            onClose={() => {}}
          >
            <div className="drawer-content">
              <div className="covid-title-box">
                <div className="covid-title">{t('INTRO.MESSAGE_PREVIEW')}</div>
                <IconButton autoFocus size="medium" aria-label="close" onClick={() => setMsgPreviewDrawerOpen(false)}>
                  <CloseOutlinedIcon color="primary"></CloseOutlinedIcon>
                </IconButton>
              </div>
              {messagePreview}
            </div>
          </Drawer>
        </div>
      </React.Fragment>
    </>
  );
};

export default MainMessage;
