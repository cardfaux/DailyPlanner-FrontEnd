import React from 'react';

import Modal from '../../Shared/Components/UIElements/Modal/Modal';

const AddEvent = () => {
  return (
    <div>
      <h1>Hello</h1>
      <Modal header={<h1>hey</h1>} footer={<h1>hey</h1>}>
        <input>ENTER A TITLE</input>
      </Modal>
    </div>
  );
};

export default AddEvent;
