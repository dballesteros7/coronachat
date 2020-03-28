import React, { useState, useRef, Props, Component } from 'react';
import './App.css';
import MainMessageForm from './components/MainMessageForm/MainMessageForm';
import { defaultTemplate } from './sampleData/defaultTemplate';
import { Template, MenuItem } from './model/model';

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

  updateTemplateHeaderInState(headerText: string) {
    const template = this.state.template;
    template.header = headerText;
    this.setState({
      template: template
    }, () => {
      console.log("Updated global template", this.state.template);
    });
  }

  onPrefillMainHeaderClicked() {
    this.updateTemplateHeaderInState(defaultTemplate.header);
  }

  onMainHeaderChanged(newText: string) {
    this.updateTemplateHeaderInState(newText);
  }

  onOpenMenuItem(menuItem: MenuItem) {
    console.debug("need to open menu item", menuItem);
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
          onPrefillMainHeaderClicked={() => this.onPrefillMainHeaderClicked()}
          onOpenMenuItem={(menuItem) => this.onOpenMenuItem(menuItem)}/>
      </div>
    );
  }
}

export default App;
