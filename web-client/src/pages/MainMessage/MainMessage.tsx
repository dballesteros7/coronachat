import React, { useState, useRef, useEffect } from "react";
import "./MainMessage.scss";
import MainMessageForm from "../../components/MainMessageForm/MainMessageForm";
import {
  defaultTemplate,
  defaultFooterItemBackToMenu
} from "../../sampleData/defaultTemplate";
import { Template, MenuItem } from "../../model/model";
import MenuItemMessageForm from "../../components/MenuItemMessageForm/MenuItemMessageForm";
import {
  makeStyles,
  Theme,
  createStyles,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton
} from "@material-ui/core";
import { CoronaChatAPI } from "../../services/CoronaChatAPI";
import MessagePreview from "../../components/MessagePreview/MessagePreview";
import SplitLayout from "../../components/SplitLayout/SplitLayout";
import { TrialCoronaChatAPI } from "../../services/TrialCoronaChatAPI";
import { CoronaChatAPIInterface } from "../../services/CoronaChatAPIInterface";
import Drawer from "@material-ui/core/Drawer";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { useTranslation } from "react-i18next";

function getInitSelectedMenuItem(): MenuItem {
  // TODO(MB) could set initial value to null without compiler complaining
  return {
    id: -1,
    title: "",
    footerItems: [defaultFooterItemBackToMenu],
    content: ""
  };
}

function getEmptyTemplate(): Template {
  return {
    header: "",
    menuItems: []
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: "relative"
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
      color: "white"
    },
    drawer: {
      // width: '100%',
      // backgroundColor: 'red'
    }
  })
);

const MainMessage = (props: { isTrial?: boolean }) => {
  const { t } = useTranslation();

  let coronaChatAPI: CoronaChatAPIInterface;
  if (props.isTrial) {
    coronaChatAPI = new TrialCoronaChatAPI();
  } else {
    coronaChatAPI = new CoronaChatAPI();
  }

  const classes = useStyles();

  const [isMsgPreviewDrawerOpen, setMsgPreviewDrawerOpen] = useState(false);

  useEffect(() => {
    // TODO(MB) add some loading UI
    coronaChatAPI
      .getTemplate()
      .then(template => {
        console.debug("Got template from server", template);
        setTemplate(template);
      })
      .catch(error => {
        // TODO(MB) notify user
        console.error(error);
      });
  }, []);

  // TODO(MB) is this really the simplest way that allows using setState inside
  // an event handler? see https://medium.com/geographit/accessing-react-state-in-event-listeners-with-usestate-and-useref-hooks-8cceee73c559
  const [_template, _setTemplate] = useState(getEmptyTemplate());
  var templateRef = useRef(_template);
  const setTemplate = (newTemplate: Template) => {
    templateRef.current = newTemplate;
    _setTemplate(newTemplate);
  };

  const [_isMenuItemDialogOpen, _setIsMenuItemDialogOpen] = useState(false);
  var isMenuItemDialogOpenRef = useRef(_isMenuItemDialogOpen);
  const setIsMenuItemDialogOpen = (newValue: boolean) => {
    isMenuItemDialogOpenRef.current = newValue;
    _setIsMenuItemDialogOpen(newValue);
  };

  // TODO(MB) Does not make sense to store this menuItem
  // find a way to pass it to MenuItemMessageForm directly from 'openMenuItem' handler
  const initSelectedMenuItem = getInitSelectedMenuItem();
  const [editingMenuItem, setEditingMenuItem] = useState(initSelectedMenuItem);

  const [newMenuItemLatestLocalIdx, setNewMenuItemLatestLocalIdx] = useState(
    -1
  );

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
    coronaChatAPI
      .updateTemplate(templateRef.current)
      .then(() => {
        console.debug("Template updated successfully");
      })
      .catch(error => {
        // TODO(MB) notify user
        console.error(
          "Update template server request failed with error",
          error
        );
      });
  };

  let openMenuItem = (menuItem: MenuItem) => {
    setEditingMenuItem(menuItem);
    setIsMenuItemDialogOpen(true);
  };

  let onAddMenuItemClicked = () => {
    let emptyMenuItem = getInitSelectedMenuItem();
    const newIdx = newMenuItemLatestLocalIdx - 1;
    emptyMenuItem.id = newIdx;
    setEditingMenuItem(emptyMenuItem);
    setIsMenuItemDialogOpen(true);
    setNewMenuItemLatestLocalIdx(newIdx);
  };

  let onCloseAndDiscardChanges = () => {
    setIsMenuItemDialogOpen(false);
    setEditingMenuItem(getInitSelectedMenuItem());
  };

  let onCloseAndSaveChanges = (
    menuItem: MenuItem,
    deleteItem: boolean = false
  ) => {
    setIsMenuItemDialogOpen(false);
    const updatedTemplate: Template = JSON.parse(
      JSON.stringify(templateRef.current)
    );
    const menuItemIdx = updatedTemplate.menuItems.findIndex(
      item => item.id === menuItem.id
    );
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
    coronaChatAPI
      .updateTemplate(updatedTemplate)
      .then(() => {
        console.debug("Template updated successfully");
      })
      .catch(error => {
        // TODO(MB) notify user
        console.error(
          "Update template server request failed with error",
          error
        );
      });
    setTemplate(updatedTemplate);
    setEditingMenuItem(getInitSelectedMenuItem());
  };

  const getEditingMenuItemClone = (): MenuItem => {
    return JSON.parse(JSON.stringify(editingMenuItem));
  };

  const getMessagePreviewText = (): string => {
    const menuText = templateRef.current.menuItems
      .reduce(
        (titlesArray, item, idx) =>
          titlesArray.concat(`${idx + 1}. ${item.title}`),
        [] as string[]
      )
      .join("\n");
    const text = templateRef.current.header + "\n" + menuText;
    return text;
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

  let messagePreview = (
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
            {t("Main_message")}
          </Typography>
          <IconButton
            autoFocus
            id="preview-button"
            color="secondary"
            onClick={() => setMsgPreviewDrawerOpen(true)}
          >
            <VisibilityIcon></VisibilityIcon>
          </IconButton>
        </Toolbar>
      </AppBar>
      <React.Fragment key={"RIGHT"}>
        <div className="MainMessage covid-container">
          <MenuItemMessageForm
            menuItem={getEditingMenuItemClone()}
            onCloseAndDiscardChanges={onCloseAndDiscardChanges}
            onCloseAndSaveChanges={onCloseAndSaveChanges}
            onDeleteMenuItem={menuItem => {
              onCloseAndSaveChanges(menuItem, true);
            }}
            isVisible={isMenuItemDialogOpenRef.current}
          />
          <SplitLayout
            mainContent={mainForm}
            optionalContent={messagePreview}
          />
          <Drawer
            className={classes.drawer + " MsgPreviewDrawer"}
            anchor={"right"}
            open={isMsgPreviewDrawerOpen}
            onClose={() => {}}
          >
            <div className="drawer-content">
              <div className="covid-title-box">
                <div className="covid-title">Vista preliminar del mensaje</div>
                <IconButton
                  autoFocus
                  size="medium"
                  aria-label="close"
                  onClick={() => setMsgPreviewDrawerOpen(false)}
                >
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
