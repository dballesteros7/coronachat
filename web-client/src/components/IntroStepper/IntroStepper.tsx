import React from 'react';
import './IntroStepper.scss';
import { MobileStepper, Button, makeStyles, useTheme, Dialog } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
  introVideo: {
    // width: '100%',
    // height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    border: 0,
  },
  videoContainer: {
    position: 'relative',
    width: '100%',
    paddingBottom: '56.25%',
    height: 0,
  },
  previewIcon: {
    width: 40,
    height: 40,
  },
  previewIntroContainer: {
    padding: '30px 30%',
    textAlign: 'center',
  },
  previewIntroText: {
    textAlign: 'justify',
    textJustify: 'inter-word',
  },
});

const IntroStepper = (props: { onIntroFinished: () => void }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [t] = useTranslation();
  const numberOfSteps = 2;

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
          <Button size="small" onClick={handleNext} disabled={activeStep === 5}>
            Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
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
          <iframe
            className={classes.introVideo}
            width="560"
            height="315"
            src="https://www.youtube.com/embed/uEB5AP7zhcA"
            allow="accelerometer; autoplay; fullscreen; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
      )}
      {activeStep === 1 && (
        <div className={classes.previewIntroContainer}>
          <div className="covid-container">
            <h3 className="covid-title">Message preview</h3>
          </div>
          <VisibilityIcon color="primary" id="preview-icon"></VisibilityIcon>
          <p className={classes.previewIntroText}>
            {t(`Click this icon in the top bar of smaller screens to open the message preview. You will see how
            the message that you are editing will look like on WhatsApp.`)}
          </p>
        </div>
      )}
    </Dialog>
  );
};

export default IntroStepper;
