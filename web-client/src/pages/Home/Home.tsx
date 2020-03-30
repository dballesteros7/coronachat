import './Home.scss';
import React from 'react';
import logo from '../../assets/images/coronachat-logo.svg';
import { Button, makeStyles, Theme, createStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import MessagePreview from '../../components/MessagePreview/MessagePreview';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    startButton: {
      color: 'white',
      display: 'table',
      margin: 'auto'
    },
  }),
);
const Home = () => {
  const classes = useStyles();
  
  return (
    <div className="Home">
      <img id="logo" src={logo} alt="Coronainfochat"/>
      <h2 className="covid-title">Stop misinformation about COVID-19 and inform your people officially</h2>

      <div id="chat-box">
        <div id="message-box-1" className="message-box">
          <MessagePreview value="Hello. I am the mayor of a South American town. The people here use *WhatsApp* a lot and 
            share many chains and fake news about COVID-19."/>
        </div>
        <div id="message-box-2" className="message-box">
          <MessagePreview value="They also have limited data plans and access to important
            information is not always possible. I saw that WHO and India have some phone number that people can write to
            via Whatsapp and get *official information quickly* via message..."/>
        </div>
        <div id="message-box-3" className="message-box">
          <MessagePreview value="I don't know how to configure one for the people here."/>
        </div>
        <div id="message-box-4" className="message-box">
          <MessagePreview value="Hello Mr Gonzales, we appreciate your initiative and would like to help you out."/>
        </div>
        <div id="message-box-5" className="message-box">
          <MessagePreview value="Our app _Coronainfochat_ creates the chatbot for you. You just need to feed it with the
            content that the people of your town will read in the chat. It works with *Facebook Messenger* too."/>
        </div>
        <div id="message-box-6" className="message-box">
          <MessagePreview value="Awesome! Thank you. Can they also get a notification with important updates?"/>
        </div>
        <div id="message-box-7" className="message-box">
          <MessagePreview value="Not yet, but soon. We'll keep you posted. Try the app by clicking below and stay _healhty_!"/>
        </div>
      </div>
      <Link to="/dashboard">
        <Button className={classes.startButton} size="small" 
          variant="contained" color="primary">
          Try it in spanish
        </Button>
      </Link>
    </div>
  );
};
export default Home;