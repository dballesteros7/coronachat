import React, { useState, useRef, Props, Component } from 'react';
import './App.css';
import MainMessageForm from './components/MainMessageForm/MainMessageForm';
import { defaultTemplate } from './sampleData/defaultTemplate';
import { Template } from './model/model';

type AppState = {
  template: Template
}

class App extends Component<{}, AppState> {
  constructor(props: any) {
    super(props)
    //TODO(MB) deep clone is temporary - replace sample template with one 
    // returned by the server
    this.state = {
      template: JSON.parse(JSON.stringify(defaultTemplate))
    }
  }

  onPrefillMainHeaderClicked() {
    this.updateTemplateHeaderInState(defaultTemplate.header);
  }

  onMainHeaderChanged(newText: string) {
    this.updateTemplateHeaderInState(newText);
  }

  updateTemplateHeaderInState(headerText: string) {
    const template = this.state.template;
    template.header = headerText;
    this.setState({
      template: template
    }, () => {
      console.log("Updated global template", this.state.template);
    });
  }

  render() {
    return (
      <div className="App">
        <h1>
          Main message
        </h1>
        <MainMessageForm 
          template={this.state.template}
          onMainHeaderChanged={(newText) => this.onMainHeaderChanged(newText)}
          onPrefillMainHeaderClicked={() => this.onPrefillMainHeaderClicked()}/>
      </div>
    );
  }
}

export default App;
