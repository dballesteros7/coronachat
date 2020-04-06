import React from 'react';
import './IntroStepper.scss';
import { MobileStepper, Button, makeStyles, useTheme, Dialog, LinearProgress } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
  introVideo: {
    width: '100%',
    height: '100%',
    border: 0,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  videoContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  previewIcon: {
    width: 40,
    height: 40,
  },
  previewIntroText: {
    textAlign: 'justify',
    textJustify: 'inter-word',
  },
  mainContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
});

const IntroStepper = (props: { onIntroFinished: () => void }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [t] = useTranslation();
  const numberOfSteps = 3;

  const handleNext = () => {
    if (activeStep === numberOfSteps - 1) {
      props.onIntroFinished();
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Dialog className="IntroStepper" aria-labelledby="simple-dialog-title" open={true}>
      <MobileStepper
        variant="dots"
        steps={numberOfSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          activeStep < numberOfSteps - 1 ? (
            <Button size="small" onClick={handleNext}>
              {t('Next')}
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          ) : (
            <Button size="small" onClick={handleNext}>
              {t('Start')}
            </Button>
          )
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
        }
      />
      {activeStep === 0 && (
        <div className={classes.videoContainer}>
          <LinearProgress />
          <iframe
            className={classes.introVideo}
            width="560"
            height="315"
            src="https://www.youtube.com/embed/uEB5AP7zhcA?autoplay=1"
            allow="accelerometer; autoplay; fullscreen; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
      )}
      {activeStep === 1 && (
        <div className="PreviewIntroContainer">
          <div className="covid-container">
            <h3 className="covid-title">Message preview</h3>
          </div>
          <VisibilityIcon color="primary" className="IntroIcon"></VisibilityIcon>
          <p className={classes.previewIntroText}>
            {t(`Click this icon in the top bar of smaller screens to open the message preview. You will see how
            the message that you are editing will look like on WhatsApp.`)}
          </p>
        </div>
      )}
      {activeStep === 2 && (
        <div className="PreviewIntroContainer">
          <div className="covid-container">
            <h3 className="covid-title">Help</h3>
          </div>
          <HelpOutlineIcon color="primary" className="IntroIcon"></HelpOutlineIcon>
          <p className={classes.previewIntroText}>
            {t(
              `Click this icon in the top bar to go through these introduction steps once more. They will not be shown again automatically. `
            )}
          </p>
        </div>
      )}
    </Dialog>
  );
};

export default IntroStepper;
