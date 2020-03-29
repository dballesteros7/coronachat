import React from 'react';
import './SplitLayout.scss';

type SplitLayoutProps = {
  mainContent: Object,
  optionalContent: Object
}

const SplitLayout = (props: SplitLayoutProps) => {
  return (
    <div className="SplitLayout">
      <div className="main-pane">
        {props.mainContent}
      </div>
      <div className="optional-pane">
        {props.optionalContent}
      </div>
    </div>
  );
};

export default SplitLayout;