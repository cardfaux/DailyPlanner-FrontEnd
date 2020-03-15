import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaRegCalendarAlt } from 'react-icons/fa';

import ErrorModal from '../../../Shared/Components/UIElements/ErrorModal/ErrorModal';
import LoadingSpinner from '../../../Shared/Components/UIElements/LoadingSpinner/LoadingSpinner';
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
        setEventCount(responseData.events.length);
      } catch (err) {}
    };
    fetchEvents();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className='center'>
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && (
        <div className={className}>
          <Link to='/events'>
            <Card>
              <h1>
                <FaRegCalendarAlt /> My Events: {eventCount}
              </h1>
            </Card>
          </Link>
        </div>
      )}
    </React.Fragment>
  );
};

export default styled(MyEventsCard)`
  margin: 4rem;
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
  svg {
    color: ${Primary};
  }
`;
