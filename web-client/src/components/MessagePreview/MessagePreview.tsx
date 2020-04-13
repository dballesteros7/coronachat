import React from 'react';
import './MessagePreview.scss';

type TrianglePosition = 'left' | 'right' | 'none';

type MessagePreviewProps = {
  value: string;
  bgColor: string;
  triangle?: TrianglePosition;
};

function getHTMLValueFromWhatsappFormatting(text: string): string {
  if (!text) {
    return '';
  }

  const TAGS = [
    ['*', 'b'],
    ['_', 'i'],
    ['~', 's'],
    ['```', 'code'],
  ];
  let e = text.replace(/&/g, '&').replace(/>/g, '>').replace(/</g, '&lt;').replace(/\n/g, '<br />');
  for (var n = 0; n < TAGS.length; n++) {
    var o = e.indexOf(TAGS[n][0]),
      a = e.indexOf(TAGS[n][0], o + 1);
    while (o > -1 && a > -1) {
      e =
        e.substring(0, o) +
        '<' +
        TAGS[n][1] +
        '>' +
        e.substring(o + TAGS[n][0].length, a) +
        '</' +
        TAGS[n][1] +
        '>' +
        e.substring(a + TAGS[n][0].length);
      o = e.indexOf(TAGS[n][0], a + 1);
      a = e.indexOf(TAGS[n][0], o + 1);
    }
  }

  // TODO(MB) Can be improved to get closer to WA linkification (for ex. avoid linkify http://fdf (without a .))
  // try whis one (https?|ftp):\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)

  // URLs starting with http://, https://, or ftp://
  const replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
  e = e.replace(replacePattern1, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');

  // URLs starting with "www." (without // before it, or it'd re-link the ones done above).
  const replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
  e = e.replace(replacePattern2, '$1<a href="http://$2" target="_blank" rel="noopener noreferrer">$2</a>');

  // Change email addresses to mailto:: links.
  const replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
  e = e.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

  return e;
}

function getMessagePreviewHTMLContent(
  whatsAppFormattedText: string,
  bgColor: string,
  trianglePosition: TrianglePosition
): string {
  const htmlText = getHTMLValueFromWhatsappFormatting(whatsAppFormattedText);

  if (trianglePosition === 'left') {
    const style = `border-right-color: ${bgColor}; left: 5px; border-left: 0; margin-left: -11px;`;
    return `${htmlText}<div style="${style}" class='bubble-triangle'></div>`;
  } else if (trianglePosition === 'right') {
    const style = `border-left-color: ${bgColor}; right: 5px; border-right: 0; margin-right: -11px;`;
    return `${htmlText}<div style="${style}" class='bubble-triangle'></div>`;
  } else {
    return htmlText;
  }
}

const MessagePreview = (props: MessagePreviewProps) => {
  return (
    <>
      <div
        className="MessagePreview"
        style={{ backgroundColor: props.bgColor }}
        dangerouslySetInnerHTML={{
          __html: getMessagePreviewHTMLContent(props.value, props.bgColor, props.triangle ?? 'left'),
        }}
      ></div>
    </>
  );
};

export default MessagePreview;
