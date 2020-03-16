import React, { useState, useEffect, useContext } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

import ErrorModal from '../../Shared/Components/UIElements/ErrorModal/ErrorModal';
import LoadingSpinner from '../../Shared/Components/UIElements/LoadingSpinner/LoadingSpinner';
import { useHttpClient } from '../../Shared/Hooks/Http-Hook';
import { AuthContext } from '../../Shared/Context/auth-context';

import '../../Styles/CSS/App.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);

const MainCalendar = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [events, setEvents] = useState([]); // Set To Empty Array Since The Events Is An Array Of Objects

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
        setEvents(responseData.events);
      } catch (err) {}
    };
    fetchEvents();
  }, [sendRequest]);

  // const [state, setState] = useState({
  //   events: Events,
  //   title: '',
  //   start: '',
  //   end: '',
  //   openSlot: false
  // });

  // console.log('TOP OF FILE', state);

  // const moveEvent = ({ event, start, end, isAllDay: droppedOnAllDaySlot }) => {
  //   const { events } = state;

  //   const idx = events.indexOf(event);
  //   let allDay = event.allDay;

  //   if (!event.allDay && droppedOnAllDaySlot) {
  //     allDay = true;
  //   } else if (event.allDay && !droppedOnAllDaySlot) {
  //     allDay = false;
  //   }

  //   const updatedEvent = { ...event, start, end, allDay };
  //   console.log(updatedEvent);

  //   const nextEvents = [...events];
  //   nextEvents.splice(idx, 1, updatedEvent);

  //   setState({
  //     events: nextEvents
  //   });

  //   alert(`${event.title} was dropped onto ${updatedEvent.start}`);
  // };

  // const resizeEvent = ({ event, start, end }) => {
  //   const { events } = state;

  //   const nextEvents = events.map((existingEvent) => {
  //     return existingEvent.id == event.id
  //       ? { ...existingEvent, start, end }
  //       : existingEvent;
  //   });

  //   setState({
  //     events: nextEvents
  //   });

  //   alert(`${event.title} was resized to ${start}-${end}`);
  // };

  // const handleSlotSelected = (slotInfo) => {
  //   console.log('Real slotInfo', slotInfo);

  //   setState({
  //     events: Events,
  //     id: uuidv1(),
  //     title: 'New Event',
  //     start: slotInfo.start,
  //     end: slotInfo.end,
  //     openSlot: true
  //   });
  // };

  // const newEvent = (event) => {
  //   //console.log(event.slots[0]);
  //   let hour = {
  //     id: uuidv1(),
  //     title: 'New Event',
  //     allDay: event.slots.length == 1,
  //     start: event.start,
  //     end: event.end
  //   };
  //   setState({
  //     events: state.events.concat([hour])
  //   });
  // };
  // console.log('+++++++', state);
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className='center'>
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && (
        <div className='App'>
          <DragAndDropCalendar
            defaultDate={new Date()}
            //selectable
            defaultView='month'
            events={events}
            localizer={localizer}
            //onEventDrop={moveEvent}
            //onEventResize={resizeEvent}
            //onSelectSlot={(slotInfo) => handleSlotSelected(slotInfo)}
            //onSelectSlot={newEvent}
            resizable
            style={{ height: '100vh' }}
          />
        </div>
      )}
    </React.Fragment>
  );
};

export default MainCalendar;
