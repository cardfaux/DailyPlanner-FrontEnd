import React from 'react';
import styled from 'styled-components';

import MyNote from '../MyNote/MyNote';

const MyNotes = (props) => {
  return (
    <ul className={props.className}>
      {props.notes.map((note) => (
        <MyNote
          key={note.id}
          title={note.title}
          description={note.description}
          date={note.date}
          id={note.id}
        />
      ))}
    </ul>
  );
};

export default styled(MyNotes)`
  margin-top: 10rem;
`;
