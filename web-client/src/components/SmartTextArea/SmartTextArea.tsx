import React, { useState, useEffect } from "react";
import "./SmartTextArea.scss";
import { TextField, Button } from "@material-ui/core";
import { useTranslation } from "react-i18next";

type SmartTextAreaProps = {
  value: string;
  prefillValue?: string;
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
  const { t, i18n } = useTranslation();
  const [isEditingEnabled, setIsEditingEnabled] = useState(!props.showEdit);
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const onPrefillClicked = () => {
    if (props.prefillValue) {
      setValue(props.prefillValue);
    }
    props.onPrefillClicked();
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
            <Button
              size="small"
              color="primary"
              onClick={_ => setIsEditingEnabled(true)}
            >
              {t("EDIT")}
            </Button>
          )}
          {isEditingEnabled && props.showPrefill && (
            <Button
              size="small"
              color="primary"
              onClick={_ => onPrefillClicked()}
            >
              {t("PREFILL")}
            </Button>
          )}
          {isEditingEnabled && props.showEdit && (
            <Button
              color="primary"
              size="small"
              className="save-button"
              onClick={_ => onSaveClicked()}
            >
              {t("DONE")}
            </Button>
          )}
        </span>
      </span>
      <TextField
        fullWidth
        placeholder={isEditingEnabled ? props.placeholder : ""}
        className="text-field"
        multiline
        error={props.error}
        helperText={props.helperText ?? ""}
        disabled={!isEditingEnabled}
        rows={props.rows}
        value={value}
        variant="outlined"
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
};

export default SmartTextArea;
