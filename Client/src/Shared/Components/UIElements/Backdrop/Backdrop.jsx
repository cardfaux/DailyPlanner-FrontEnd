import React from 'react';
import ReactDOM from 'react-dom';

import { BackdropDiv } from './Backdrop.styles';

const Backdrop = (props) => {
  return ReactDOM.createPortal(
    <BackdropDiv onClick={props.onClick}></BackdropDiv>,
    document.getElementById('backdrop-hook')
  );
};

export default Backdrop;
