import React from 'react';

import { StyledCard } from './Card.styles';

interface CardProps {
  className?: string;
  style?: {};
}

const Card: React.FunctionComponent<CardProps> = (props) => {
  return (
    <StyledCard className={`${props.className}`} style={props.style}>
      {props.children}
    </StyledCard>
  );
};

export default Card;
