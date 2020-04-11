import React, { useContext } from 'react';
import './LanguageSelector.scss';
import { Languages, Language, LanguageContext } from '../../i18n';
import { Button, Menu, makeStyles, Theme, createStyles, MenuItem } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    langMenuButton: {
      position: 'fixed',
      top: 0,
      right: 0,
      zIndex: 10,
    },
    langMenu: {
      zIndex: 10,
    },
    langMenuItem: {
      color: theme.palette.primary.main,
    },
  })
);

const LanguageSelector = () => {
  const classes = useStyles();
  const { selectedLanguage, onLanguageSelected } = useContext(LanguageContext);
  const [languageMenuAnchorEl, setLanguageMenuAnchorEl] = React.useState<null | HTMLElement>(null);

  const onLanguageButtonClicked = (event: React.MouseEvent<HTMLButtonElement>) => {
    setLanguageMenuAnchorEl(event.currentTarget);
  };

  const onLanguageMenuClosed = () => {
    setLanguageMenuAnchorEl(null);
  };

  const onLanguageItemClicked = (language: Language) => {
    // TODO (MB) why do I get the following error if I set i18n from here?
    // cannot change i18n here due to this error:
    // index.js:1 Warning: Cannot update a component (`LanguageSelector`) while rendering a different component (`LanguageWrapper`).
    // To locate the bad setState() call inside `LanguageWrapper`, follow the stack trace as described in https://fb.me/setstate-in-render
    // i18n.changeLanguage(selectedLanguage);
    // localStorage.setItem(languageKey, selectedLanguage);
    onLanguageSelected(language);

    setLanguageMenuAnchorEl(null);
  };

  const menuItems = Object.keys(Languages).map((language: string) => (
    <MenuItem
      className={classes.langMenuItem}
      key={language}
      onClick={(_) => onLanguageItemClicked(Languages[language as Language])}
    >
      {language.toUpperCase()}
    </MenuItem>
  ));

  return (
    <>
      <Button
        className={classes.langMenuButton}
        aria-controls="simple-menu"
        aria-haspopup="true"
        color="primary"
        onClick={onLanguageButtonClicked}
      >
        {selectedLanguage}
      </Button>
      <Menu
        className={classes.langMenu}
        anchorEl={languageMenuAnchorEl}
        keepMounted
        open={Boolean(languageMenuAnchorEl)}
        onClose={onLanguageMenuClosed}
      >
        {menuItems}
      </Menu>
    </>
  );
};

export default LanguageSelector;
