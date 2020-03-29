import React from 'react';
import './MessagePreview.scss';

function getHTMLValueFromWhatsappFormatting(text: string): string {

  if (!text) {
    return '';
  }

  const TAGS = [
    ["*", "b"],
    ["_", "i"],
    ["~", "s"],
    ["```", "code"]
  ];

  let e = text.replace(/&/g, "&").replace(/>/g, ">").replace(/</g, "&lt;").replace(/\n/g, "<br />");
  for (var n = 0; n < TAGS.length; n++) {
    var o = e.indexOf(TAGS[n][0]),
      a = e.indexOf(TAGS[n][0], o + 1);
    while (o > -1 && a > -1) {
      e = e.substring(0, o) + "<" + TAGS[n][1] + ">" + e.substring(o + TAGS[n][0].length, a) + "</" + TAGS[n][1] + ">" + e.substring(a + TAGS[n][0].length);
      o = e.indexOf(TAGS[n][0], a + 1);
      a = e.indexOf(TAGS[n][0], o + 1)
    }
  }

  return e;
}

const MessagePreview = (props: {value: string}) => {
  return (
    <div className="MessagePreview" dangerouslySetInnerHTML={{__html: getHTMLValueFromWhatsappFormatting(props.value)}}>
    </div>
  )
};

export default MessagePreview;
