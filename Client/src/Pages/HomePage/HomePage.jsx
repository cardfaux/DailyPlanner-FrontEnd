import React from 'react';
import styled from 'styled-components';

import MyEventsCard from '../../Components/HomePage/MyEventsCard/MyEventsCard';
import MyNotesCard from '../../Components/HomePage/MyNotesCard/MyNotesCard';

const HomePage = (props) => {
  return (
    <div className={props.className}>
      <MyEventsCard />
      <MyNotesCard />
    </div>
  );
};

export default styled(HomePage)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
