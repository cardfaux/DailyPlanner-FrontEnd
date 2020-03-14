import React from 'react';
import { useSpring, animated } from 'react-spring';

import { MainHead } from './MainHeader.styles';

const MainHeader = (props) => {
  const fade = useSpring({
    from: {
      opacity: 0
    },
    to: {
      opacity: 1
    }
  });

  return (
    <animated.div style={fade}>
      <MainHead>{props.children}</MainHead>
    </animated.div>
  );
};

export default MainHeader;
