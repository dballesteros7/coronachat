const translationEN = {
  DASHBOARD_TITLE: 'COVID-19 Information Portal',
  MSG_HEADER: 'Message header',
  MSG_HEADER_PLACEHOLDER:
    'Write here a custom description about this service or press "Fill in" to get a standard message',
  CONTENT: 'Content',
  TITLE_CANT_BE_EMPTY: 'The title cannot be empty.',
  CONTENT_CANT_BE_EMPTY: 'The content cannot be empty.',
  ERRORS: {
    GET_TEMPLATE_ERROR: 'An error occurred while loading the message content. Please refresh the page.',
    GET_DEFAULT_TEMPLATE_ERROR: 'An error occurred while loading the default options. Please refresh the page.',
    UPDATE_TEMPLATE_ERROR: 'An error occurred while saving your changes. Please try to save them again.',
  },
  UNSAVED_CHANGES_DIALOG: {
    TITLE: 'There are unsaved changes',
    MESSAGE: 'If you close, you will lose any change that you may have made.',
    YES_BUTTON: 'Yes, discard and close',
    NO_BUTTON: 'No, continue editing',
  },
  ACTIONS: {
    SAVE: 'Save',
    EDIT: 'Edit',
    PREFILL: 'Fill in',
    DONE: 'Done',
    BACK: 'Back',
    NEXT: 'Next',
    HELP: 'Help',
    CANCEL: 'Cancel',
    LOGOUT: 'Logout',
  },
  LOGIN: {
    TITLE: 'Login',
    USERNAME: 'Username',
    USERNAME_CANT_BE_EMPTY: 'Username cannot be empty.',
    PASSWORD: 'Password',
    PASSWORD_CANT_BE_EMPTY: 'Password cannot be empty.',
    LOG_IN: 'Log in',
  },
  MENU: {
    OPTIONS: 'Main menu options',
    OPTION: 'Menu option',
    ADD_OPTION: 'Add option',
    OPTION_TITLE: 'Option title (visible in the main menu)',
    OPTION_TITLE_PLACEHOLDER: 'Write the text to show next to the menu item number.',
    OPTION_CONTENT_PLACEHOLDER:
      'Write the content of the message that gets sent to people when they select this option.',
    DELETE_OPTION: 'Delete this option',
    DELETE_OPTION_DIALOG: {
      TITLE: 'Delete menu option',
      MESSAGE: `The option will be removed from the menu in the main message and the option content will be lost. Are you sure?`,
      YES_BUTTON: 'Yes, delete this option',
      NO_BUTTON: "Don't delete",
    },
  },
  HOME: {
    HEADER: 'Stop misinformation about COVID-19 and inform your people officially',
    CHAT: {
      MESSAGE_1: `Hello. I am the mayor of a South American town. The people here use *WhatsApp* a lot and 
      share many chains and fake news about COVID-19.🦠`,
      MESSAGE_2: `They also have limited data plans and access websites is not always possible. I saw that WHO and India have some phone numbers that people can write to
      via Whatsapp and get *official information quickly* via message...`,
      MESSAGE_3: `I don't know how to configure one for the people here`,
      MESSAGE_4: `Hello Mr Gonzales, we appreciate your initiative and would like to help you out.`,
      MESSAGE_5: `Our app _Coronainfochat_ creates the chatbot for you. You just need to feed it with the
      content that the people of your town will read in the chat. It works with *Facebook Messenger* too.`,
      MESSAGE_6: `Awesome! Thank you. Can they also get a notification with important updates?`,
      MESSAGE_7: `Not yet, but soon. We'll keep you posted. Please try the app and stay _healthy_! 💪🏼`,
      MESSAGE_8: `How much is this going to cost? The budget is tight 💰😐`,
      MESSAGE_9: `Nothing, it's *free* at the moment. Infrastructure costs may need to be covered later on. Feel free to contact us for any other question! 👇🏼`,
    },
    TRY_IT_BUTTON: `Try it now`,
  },
  INTRO: {
    MESSAGE_PREVIEW: 'Message preview',
    MSG_PREVIEW_DESCRIPTION: `Click this icon in the top bar of smaller screens to open the message preview. You will see how
    the message that you are editing will look like on WhatsApp.`,
    HELP_DESCRIPTION: `Click this icon in the top bar to go through these introduction steps once more. They will not be shown again automatically.`,
  },
};

export default translationEN;
