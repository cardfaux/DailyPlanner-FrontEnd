import React from 'react';

import { StyledCard } from './Card.styles.js';

const Card = (props) => {
  return (
    <StyledCard className={`${props.className}`} style={props.style}>
      {props.children}
    </StyledCard>
  );
};

export default Card;
