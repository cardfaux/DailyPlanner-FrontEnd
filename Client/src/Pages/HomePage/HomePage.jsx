import React from 'react';
import styled from 'styled-components';

import MyEventsCard from '../../Components/HomePage/MyEventsCard/MyEventsCard';

const HomePage = (props) => {
  return (
    <div className={props.className}>
      <MyEventsCard />
    </div>
  );
};

export default styled(HomePage)`
  display: flex;
  justify-content: center;
  align-items: center;
`;
