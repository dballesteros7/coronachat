import React, { useEffect } from 'react';
import './MainMessageForm.scss';
import { Template } from '../../model/model';
import TextField from '@material-ui/core/TextField';
import { defaultTemplate } from '../../sampleData/defaultTemplate';

type MainMessageFormProps = {
  template: Template,
  onMainHeaderChanged: (newText: string) => void,
  onPrefillMainHeaderClicked: () => void
}

const MainMessageForm = (props: MainMessageFormProps) => {

  var prefillHeaderRef = React.useRef<HTMLButtonElement>(null);
  var searchBarRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onPrefillHeaderClicked = function(event: Event) {
      props.onPrefillMainHeaderClicked();
    }
    prefillHeaderRef?.current?.addEventListener("click", onPrefillHeaderClicked);

    const onHeaderTxtFieldInputChanged = function(e: Event) {
      props.onMainHeaderChanged((e.target as HTMLInputElement).value || '');
    }
    searchBarRef?.current?.addEventListener("input", onHeaderTxtFieldInputChanged);
  }, []);

  let menuListItems = props.template.menuItems.map(menuItem => 
    <div key={menuItem.index}>{menuItem.index}. {menuItem.title}</div>);

  return (
    <div className="MainMessageForm">
      <TextField
        className="text-field"
        label="Header"
        multiline
        rows="8"
        value={props.template.header}
        placeholder={defaultTemplate.header}
        variant="outlined"
        ref={searchBarRef}
      />
      <button ref={prefillHeaderRef}>Prefill</button>

      <h4>Menu</h4>
      <div>
        {menuListItems}
      </div>
    </div>
  );
};

export default MainMessageForm;
