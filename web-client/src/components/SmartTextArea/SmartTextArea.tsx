import React, { useState, useEffect } from 'react';
import './SmartTextArea.scss';
import Picker from 'emoji-picker-react';
import { TextField, Button, IconButton } from '@material-ui/core';
import EmojiEmotionsOutlinedIcon from '@material-ui/icons/EmojiEmotionsOutlined';
import { useTranslation } from 'react-i18next';

type SmartTextAreaProps = {
  value: string;
  rows: number;
  label: string;
  showEdit: boolean;
  showPrefill: boolean;
  placeholder: string;
  error?: boolean;
  helperText?: string;
  onSaveClicked: (text: string) => void;
  onPrefillClicked: () => void;
  onChange?: (newText: string) => void;
};

const SmartTextArea = (props: SmartTextAreaProps) => {
  const { t } = useTranslation();
  const [isEditingEnabled, setIsEditingEnabled] = useState(!props.showEdit);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const onPrefillClicked = () => {
    props.onPrefillClicked();
  };

  const onEmojiClicked = () => {
    setIsEmojiPickerOpen(false);
  };

  const onChange = (text: string) => {
    setValue(text);
    if (props.onChange) {
      props.onChange(text);
    }
  };
  const onSaveClicked = () => {
    setIsEditingEnabled(false);
    props.onSaveClicked(value);
  };

  return (
    <div className="SmartTextArea">
      <span className="covid-title-box">
        <h3 className="covid-title">{props.label}</h3>
        <span className="action-button-group">
          {!isEditingEnabled && props.showEdit && (
            <Button size="small" color="primary" onClick={(_) => setIsEditingEnabled(true)}>
              {t('ACTIONS.EDIT')}
            </Button>
          )}
          {/* {isEditingEnabled && <IconButton edge="start" color="primary" size="small"
                onClick={() => {setIsEmojiPickerOpen(true)}} aria-label="close">
              <EmojiEmotionsOutlinedIcon />
            </IconButton>} */}
          {/* {isEditingEnabled && isEmojiPickerOpen && <Picker onEmojiClick={() => {setIsEmojiPickerOpen(false)}}/>} */}
          {isEditingEnabled && props.showPrefill && (
            <Button size="small" color="primary" onClick={(_) => onPrefillClicked()}>
              {t('ACTIONS.PREFILL')}
            </Button>
          )}
          {isEditingEnabled && props.showEdit && (
            <Button color="primary" size="small" className="save-button" onClick={(_) => onSaveClicked()}>
              {t('ACTIONS.DONE')}
            </Button>
          )}
        </span>
      </span>
      <TextField
        fullWidth
        placeholder={isEditingEnabled ? props.placeholder : ''}
        className="text-field"
        multiline
        error={props.error}
        helperText={props.helperText ?? ''}
        disabled={!isEditingEnabled}
        rows={props.rows}
        value={value}
        variant="outlined"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SmartTextArea;
