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
        onChange={e => onChange(e.target.value)}
      />
      <button onClick={_ => onPrefillClicked()}>Prefill</button>
    </>
  )
};

export default SmartTextArea;
