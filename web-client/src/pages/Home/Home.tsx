import './Home.scss';
import React from 'react';
import logo from '../../assets/images/coronachat-logo.svg';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import { Link } from 'react-router-dom';
import MessagePreview from '../../components/MessagePreview/MessagePreview';
import MailOutlineIcon from '@material-ui/icons/MailOutline'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    fabButton: {
      position: 'fixed',
      bottom: 10,
      left: '50%',
      transform: 'translateX(-50%)',
      color: 'white'
    }
  }),
);

const Home = () => {
  const classes = useStyles();
  
  return (
    <div className={classes.root + " Home"}>
      <img id="logo" src={logo} alt="Coronainfochat"/>
      <h2 className="covid-title">Stop misinformation about COVID‑19 and inform your people officially</h2>

      <div id="full-width-container">
        <div id="chat-box">
          <div id="message-box-1" className="message-box">
            <MessagePreview bgColor="#F4F4F4" value="Hello. I am the mayor of a South American town. The people here use *WhatsApp* a lot and 
              share many chains and fake news about COVID‑19. 🦠"/>
          </div>
          <div id="message-box-2" className="message-box">
            <MessagePreview bgColor="#F4F4F4" value="They also have limited data plans and access websites is not always possible. I saw that WHO and India have some phone numbers that people can write to
              via Whatsapp and get *official information quickly* via message..."/>
          </div>
          <div id="message-box-3" className="message-box">
            <MessagePreview bgColor="#F4F4F4" value="I don't know how to configure one for the people here."/>
          </div>
          <div id="message-box-4" className="message-box our-messages">
            <MessagePreview bgColor="#F8EA8C" triangle={'right'} value="Hello Mr Gonzales, we appreciate your initiative and would like to help you out."/>
          </div>
          <div id="message-box-5" className="message-box our-messages">
            <MessagePreview bgColor="#F8EA8C" triangle={'right'} value="Our app _Coronainfochat_ creates the chatbot for you. You just need to feed it with the
              content that the people of your town will read in the chat. It works with *Facebook Messenger* too."/>
          </div>
          <div id="message-box-6" className="message-box">
            <MessagePreview bgColor="#F4F4F4" value="Awesome! Thank you. Can they also get a notification with important updates?"/>
          </div>
          <div id="message-box-7" className="message-box our-messages">
            <MessagePreview bgColor="#F8EA8C" triangle={'right'} value="Not yet, but soon. We'll keep you posted. Please try the app and stay _healthy_! 💪🏼"/>
          </div>
          <div className="message-box">
            <MessagePreview bgColor="#F4F4F4" value="How much is this going to cost? The budget is tight 💰😐"/>
          </div>
          <div id="message-box-7" className="message-box our-messages">
            <MessagePreview bgColor="#F8EA8C" triangle={'right'} value="Nothing, it's *free* at the moment. Infrastructure costs may need to be covered later on. Feel free to contact us for any other question! 👇🏼"/>
          </div>
        </div>
      </div>
      <footer>
        <a href="mailto:coronainfochat@gmail.com" target="_blank">
          <Fab className="contact-button" size="small">
            <MailOutlineIcon />
          </Fab>
        </a>
        <span>
          <a href="https://www.linkedin.com/in/diegoballesterosv/" target="_blank">
            <Fab className="contact-button" size="small">
              D
            </Fab>
          </a>
          <a href="https://www.linkedin.com/in/maricabertarini/" target="_blank">
            <Fab className="contact-button" size="small">
              M
            </Fab>
          </a>
        </span>
      </footer>
      <Link to="/dashboard">
        <Fab variant="extended" className={classes.fabButton} color="primary">
          Try it in spanish
        </Fab>
      </Link>
    </div>
  );
};
export default Home;