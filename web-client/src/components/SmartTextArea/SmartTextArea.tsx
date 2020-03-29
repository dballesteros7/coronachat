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

  let onPrefillClicked = props.onPrefillClicked;
  let onChange = props.onChange;

  return (
    <div className="SmartTextArea">
      <h3 className="covid-title">{props.label}</h3>
      <TextField
        fullWidth
        className="text-field"
        multiline
        rows={props.rows}
        value={props.value}
        placeholder={props.placeholder}
        variant="outlined"
        onChange={e => onChange(e.target.value)}
      />
      <button onClick={_ => onPrefillClicked()}>Prefill</button>
    </div>
  )
};

export default SmartTextArea;
