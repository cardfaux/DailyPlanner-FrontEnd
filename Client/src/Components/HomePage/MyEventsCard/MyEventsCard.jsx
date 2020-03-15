import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Card from '../../../Shared/Components/UIElements/Card/Card';
import { useHttpClient } from '../../../Shared/Hooks/Http-Hook';
import { AuthContext } from '../../../Shared/Context/auth-context';

import { Secondary, Primary } from '../../../Styles/JS/Colors';

const MyEventsCard = ({ className }) => {
  const auth = useContext(AuthContext);
  const [eventCount, setEventCount] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/events/me`,
          'GET',
          null,
          {
            Authorization: 'Bearer ' + auth.token
          }
        );
        console.log(responseData);
        setEventCount(responseData.events.length);
      } catch (err) {}
    };
    fetchEvents();
  }, [sendRequest]);

  return (
    <div className={className}>
      <Link to='/events'>
        <Card>
          <h1>My Events: {eventCount}</h1>
        </Card>
      </Link>
    </div>
  );
};

export default styled(MyEventsCard)`
  /* display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row; */
  width: 30rem;
  text-align: center;

  a {
    text-decoration: none;
    color: black;
  }
  div {
    &:hover {
      background: ${Secondary};
      color: ${Primary};
    }
  }
`;
