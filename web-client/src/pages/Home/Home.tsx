import { Button, createStyles, makeStyles, Menu, MenuItem, Theme } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/coronachat-logo.svg';
import MessagePreview from '../../components/MessagePreview/MessagePreview';
import './Home.scss';
import { useTranslation } from 'react-i18next';
import { Language, Languages } from '../../i18n';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    fabButton: {
      position: 'fixed',
      bottom: 10,
      left: '50%',
      transform: 'translateX(-50%)',
      color: 'white',
    },
    contactsButton: {
      color: 'white',
      backgroundColor: '#D7DFE8',
      marginRight: 10,
    },
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

const Home = () => {
  const classes = useStyles();
  const [t, i18n] = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(Languages[(i18n.language as Language) ?? 'en']);
  const [languageMenuAnchorEl, setLanguageMenuAnchorEl] = React.useState<null | HTMLElement>(null);

  const onLanguageButtonClicked = (event: React.MouseEvent<HTMLButtonElement>) => {
    setLanguageMenuAnchorEl(event.currentTarget);
  };

  const onLanguageMenuClosed = () => {
    setLanguageMenuAnchorEl(null);
  };

  const onLanguageItemClicked = (language: Language) => {
    setSelectedLanguage(Languages[language]);
    i18n.changeLanguage(Languages[language]);
    setLanguageMenuAnchorEl(null);
  };

  const menuItems = Object.keys(Languages).map((language: string) => (
    <MenuItem className={classes.langMenuItem} onClick={(_) => onLanguageItemClicked(Languages[language as Language])}>
      {language.toUpperCase()}
    </MenuItem>
  ));

  return (
    <div className={classes.root + ' Home'}>
      <img id="logo" src={logo} alt="Coronainfochat" />
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

      <h2 className="covid-title">{t('HOME.HEADER')}</h2>

      <div id="full-width-container">
        <div id="chat-box">
          <div className="message-box">
            <MessagePreview bgColor="#F4F4F4" value={t('HOME.CHAT.MESSAGE_1')} />
          </div>
          <div className="message-box">
            <MessagePreview bgColor="#F4F4F4" value={t('HOME.CHAT.MESSAGE_2')} />
          </div>
          <div className="message-box">
            <MessagePreview bgColor="#F4F4F4" value={t('HOME.CHAT.MESSAGE_3')} />
          </div>
          <div className="message-box our-messages">
            <MessagePreview bgColor="#F8EA8C" triangle={'right'} value={t('HOME.CHAT.MESSAGE_4')} />
          </div>
          <div className="message-box our-messages">
            <MessagePreview bgColor="#F8EA8C" triangle={'right'} value={t('HOME.CHAT.MESSAGE_5')} />
          </div>
          <div className="message-box">
            <MessagePreview bgColor="#F4F4F4" value={t('HOME.CHAT.MESSAGE_6')} />
          </div>
          <div className="message-box our-messages">
            <MessagePreview bgColor="#F8EA8C" triangle={'right'} value={t('HOME.CHAT.MESSAGE_7')} />
          </div>
          <div className="message-box">
            <MessagePreview bgColor="#F4F4F4" value={t('HOME.CHAT.MESSAGE_8')} />
          </div>
          <div className="message-box our-messages">
            <MessagePreview bgColor="#F8EA8C" triangle={'right'} value={t('HOME.CHAT.MESSAGE_9')} />
          </div>
        </div>
      </div>
      <footer>
        <a href="mailto:coronainfochat@gmail.com">
          <Fab className={classes.contactsButton} size="small">
            <MailOutlineIcon />
          </Fab>
        </a>
        <span>
          <a href="https://www.linkedin.com/in/diegoballesterosv/">
            <Fab className={classes.contactsButton} size="small">
              D
            </Fab>
          </a>
          <a href="https://www.linkedin.com/in/maricabertarini/">
            <Fab className={classes.contactsButton} size="small">
              M
            </Fab>
          </a>
        </span>
      </footer>
      <Link to="/dashboard">
        <Fab variant="extended" className={classes.fabButton} color="primary">
          {t('HOME.TRY_IT_BUTTON')}
        </Fab>
      </Link>
    </div>
  );
};
export default Home;
