import React, { useState } from 'react';
import './LanguageSelector.scss';
import { Languages, Language } from '../../i18n';
import { Button, Menu, makeStyles, Theme, createStyles, MenuItem } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

type LanguageSelectorProps = {
  selectedLanguage: Languages;
  onLanguageSelected: (language: Language) => void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    langMenuButton: {
      position: 'fixed',
      top: 0,
      right: 0,
    },
    langMenuItem: {
      color: theme.palette.primary.main,
    },
  })
);

const LanguageSelector = (props: LanguageSelectorProps) => {
  const classes = useStyles();
  const [_, i18n] = useTranslation();

  const [selectedLanguage, setSelectedLanguage] = useState(props.selectedLanguage);
  const [languageMenuAnchorEl, setLanguageMenuAnchorEl] = React.useState<null | HTMLElement>(null);

  const onLanguageButtonClicked = (event: React.MouseEvent<HTMLButtonElement>) => {
    setLanguageMenuAnchorEl(event.currentTarget);
  };

  const onLanguageMenuClosed = () => {
    setLanguageMenuAnchorEl(null);
  };

  const onLanguageItemClicked = (language: Language) => {
    const selectedLanguage = Languages[language];
    setSelectedLanguage(selectedLanguage);

    // TODO (MB) look for a good solution to avoid
    // cannot change i18n here due to this error:
    // index.js:1 Warning: Cannot update a component (`LanguageSelector`) while rendering a different component (`LanguageWrapper`).
    // To locate the bad setState() call inside `LanguageWrapper`, follow the stack trace as described in https://fb.me/setstate-in-render
    // i18n.changeLanguage(selectedLanguage);
    // localStorage.setItem(languageKey, selectedLanguage);
    // temp solution handle lang selection event outside (ugly, passed N times
    // if this is the Nth nested component, as well as the selectedLanguage props which is input here)
    props.onLanguageSelected(language);

    setLanguageMenuAnchorEl(null);
  };

  const menuItems = Object.keys(Languages).map((language: string) => (
    <MenuItem className={classes.langMenuItem} onClick={(_) => onLanguageItemClicked(Languages[language as Language])}>
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
