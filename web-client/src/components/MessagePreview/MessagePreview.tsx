import React from 'react';
import './MessagePreview.scss';
import { getHTMLValueFromWhatsappFormatting } from '../../lib/utils';

type TrianglePosition = 'left' | 'right' | 'none';

type MessagePreviewProps = {
  value: string;
  bgColor: string;
  triangle?: TrianglePosition;
};

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
        style={{ backgroundColor: props.bgColor, borderColor: 'red', border: 1 }}
        dangerouslySetInnerHTML={{
          __html: getMessagePreviewHTMLContent(props.value, props.bgColor, props.triangle ?? 'left'),
        }}
      ></div>
    </>
  );
};

export default MessagePreview;
