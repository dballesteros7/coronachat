import './Home.scss';
import React from 'react';
import logo from '../../assets/images/coronachat-logo.svg';
import { Button, makeStyles, Theme, createStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

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
      <h1 className="covid-title">Stop misinformation about COVID-19 and inform your people officially</h1>
      <p id="main-content">
        You are a government, an institution, or an organization<br />
        You want the community to access your official information via <b>WhatsApp</b><br /><br />

        Our tool sets up the infrastructure and creates a chatbot for you<br /><br />

        You just need to seed it with the content of the messages that the people will receive<br />
      </p>
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