import React, { useState, useRef } from 'react';
import './App.css';
import MainMessageForm from './components/MainMessageForm/MainMessageForm';
import { defaultTemplate } from './sampleData/defaultTemplate';

function App() {

  //TODO(MB) deep clone is temporary - replace sample template with one 
  // returned by the server

  const [template, setTemplate] = useState(JSON.parse(JSON.stringify(defaultTemplate)));
  // var templateRef = useRef(_template);
  // const setSearchResults = (newSearchResults: Array<SearchResult>) => {
  //   templateRef.current = newSearchResults
  //   _setTemplate(newSearchResults)
  // }

  let onPrefillMainHeaderClicked = () => {
  }

  return (
    <div className="App">
      <h1>
        Main message
      </h1>
      <MainMessageForm 
        template={template}
        onPrefillMainHeaderClicked={onPrefillMainHeaderClicked}/>
    </div>
  );
}

export default App;
