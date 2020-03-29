import React from 'react';
import './MessagePreview.scss';

const MessagePreview = (props: {value: string}) => (
  <div className="MessagePreview">
    {props.value}
  </div>
);

export default MessagePreview;
