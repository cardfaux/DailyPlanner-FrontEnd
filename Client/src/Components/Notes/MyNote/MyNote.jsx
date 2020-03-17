import React, { useContext } from 'react';
import styled from 'styled-components';
import Moment from 'react-moment';
import moment from 'moment';

import Card from '../../../Shared/Components/UIElements/Card/Card';
import Button from '../../../Shared/Components/FormElements/Button/Button';
import { AuthContext } from '../../../Shared/Context/auth-context';

import { Primary, Secondary, OffWhite, White } from '../../../Styles/JS/Colors';

const MyNote = (props) => {
  const auth = useContext(AuthContext);
  return (
    <li className={props.className}>
      <StyledCard>
        <div className='header'>
          <header>
            <h1>{props.title}</h1>
            <h3>{auth.userName}</h3>
            <h4>
              <Moment format='YYYY/MM/DD'>{moment.utc(props.date)}</Moment>
            </h4>
          </header>
        </div>

        <Description>{props.description}</Description>
        <Footer>
          <Button inverse to={`/note/edit/${props.id}`}>
            EDIT
          </Button>
          <Button to='/delete'>DELETE</Button>
        </Footer>
      </StyledCard>
    </li>
  );
};

export default styled(MyNote)`
  text-align: center;
  list-style: none;
  max-width: 50%;
  min-width: 40rem;
  margin: auto;
  .header {
    background: ${Secondary};
    h1 {
      margin: 0;
    }
    header {
      color: ${Primary};
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
    }
  }
`;
const StyledCard = styled(Card)`
  padding: 0;
  min-height: 10rem;
  margin-bottom: 3rem;
`;
const Description = styled.div`
  padding: 2rem;
  background: ${OffWhite};
`;

const Footer = styled.footer`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-top: 2px solid ${Secondary};
  background: ${White};
  padding: 0.5rem 0;
`;
