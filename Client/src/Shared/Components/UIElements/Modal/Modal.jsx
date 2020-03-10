import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import Backdrop from '../Backdrop/Backdrop';
import { ModalContainer, ModalHeader, ModalContent } from './Modal.styles';

const ModalOverlay = (props) => {
  const content = (
    <ModalContainer className={`${props.className}`} style={props.style}>
      <ModalHeader className={`${props.headerClass}`}>
        <h2>{props.header}</h2>
      </ModalHeader>
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
        }
      >
        <ModalContent className={`${props.contentClass}`}>
          {props.children}
        </ModalContent>
        <footer className={`${props.footerClass}`}>{props.footer}</footer>
      </form>
    </ModalContainer>
  );
  return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
};

const Modal = (props) => {
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames='modal'
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </React.Fragment>
  );
};

export default Modal;
