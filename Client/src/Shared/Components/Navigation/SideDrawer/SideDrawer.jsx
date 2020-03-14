import React from 'react';
import ReactDOM from 'react-dom';

import { Aside, CSSAnimation } from './SideDrawer.styles';

const SideDrawer = (props) => {
  const content = (
    <CSSAnimation
      in={props.show}
      timeout={200}
      classNames='slide-in-left'
      mountOnEnter
      unmountOnExit
    >
      <Aside onClick={props.onClick}>{props.children}</Aside>
    </CSSAnimation>
  );

  return ReactDOM.createPortal(content, document.getElementById('drawer-hook'));
};

export default SideDrawer;
