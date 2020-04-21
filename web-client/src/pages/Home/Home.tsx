import { createStyles, makeStyles, Theme, Button } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/coronachat-logo.svg';
import MessagePreview from '../../components/MessagePreview/MessagePreview';
import './Home.scss';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../../components/LanguageSelector/LanguageSelector';
import Login from '../../components/Login/Login';

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
    loginButton: {
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 10,
    },
    langMenuItem: {
      color: theme.palette.primary.main,
    },
  })
);

const Home = () => {
  const classes = useStyles();
  const [t] = useTranslation();
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);

  const onLoginButtonClicked = () => {
    console.debug('Open login dialog');
    setIsLoginDialogOpen(true);
  };

  return (
    <>
      <div className={classes.root + ' Home'}>
        <div id="logo-container-container">
          <div id="logo-container">
            <img id="logo" src={logo} alt="Coronainfochat" />
          </div>
        </div>

        <Button
          className={classes.loginButton}
          aria-controls="simple-menu"
          aria-haspopup="true"
          color="primary"
          onClick={onLoginButtonClicked}
        >
          {t('LOGIN.TITLE')}
        </Button>
        <LanguageSelector></LanguageSelector>

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
          <a href="mailto:coronainfochat@gmail.com" target="_blank" rel="noopener noreferrer">
            <Fab className="contact-button" size="small">
              <MailOutlineIcon />
            </Fab>
          </a>
          <span>
            <a href="https://www.linkedin.com/in/diegoballesterosv/" target="_blank" rel="noopener noreferrer">
              <Fab className="contact-button" size="small">
                D
              </Fab>
            </a>
            <a href="https://www.linkedin.com/in/maricabertarini/" target="_blank" rel="noopener noreferrer">
              <Fab className="contact-button" size="small">
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
      {isLoginDialogOpen && <Login onLoginClose={() => setIsLoginDialogOpen(false)} />}
    </>
  );
};
export default Home;
