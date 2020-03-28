import React, { useEffect } from 'react';
import './SmartTextArea.scss';
import { TextField } from '@material-ui/core';

type SmartTextAreaProps = {
  value: string,
  placeholder: string,
  rows: number,
  label: string,
  onPrefillClicked: () => void,
  onChange: (newText: string) => void
}

const SmartTextArea = (props: SmartTextAreaProps) => {

  var prefillHeaderRef = React.useRef<HTMLButtonElement>(null);
  var mainHeaderTextFieldRef = React.useRef<HTMLInputElement>(null);

  let onPrefillClicked = props.onPrefillClicked;
  let onChange = props.onChange;

  useEffect(() => {
    prefillHeaderRef?.current?.addEventListener("click", onPrefillClicked);

    const onTextChanged = function(e: Event) {
      onChange((e.target as HTMLInputElement).value || '');
    }
    mainHeaderTextFieldRef?.current?.addEventListener("input", onTextChanged);
  }, []);

  return (
    <>
      <TextField
        fullWidth
        className="text-field"
        label={props.label}
        multiline
        rows={props.rows}
        value={props.value}
        placeholder={props.placeholder}
        variant="outlined"
        ref={mainHeaderTextFieldRef}
      />
      <button ref={prefillHeaderRef}>Prefill</button>
    </>
  )
};

export default SmartTextArea;
