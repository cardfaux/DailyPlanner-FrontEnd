import React from 'react';
import styled from 'styled-components';

import MyNote from '../MyNote/MyNote';

interface Props {
  notes: any;
  className?: string;
  note?: any;
  onDeleteNote: (deletedNoteId: any) => any;
}

const MyNotes: React.FunctionComponent<Props> = (props) => {
  return (
    <ul className={props.className}>
      {props.notes.map(
        (note: {
          id: number;
          title: string;
          description: string;
          date: Date;
        }) => (
          <MyNote
            key={note.id}
            title={note.title}
            description={note.description}
            date={note.date}
            id={note.id}
            onDelete={props.onDeleteNote}
          />
        )
      )}
    </ul>
  );
};

export default styled(MyNotes)`
  margin-top: 10rem;
`;
