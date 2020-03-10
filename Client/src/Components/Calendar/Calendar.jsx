import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

import '../../Styles/CSS/App.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import Events from '../../Utils/Events';

const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);

const MainCalendar = (props) => {
  const [state, setState] = useState({
    events: Events
  });

  const moveEvent = ({ event, start, end, isAllDay: droppedOnAllDaySlot }) => {
    const { events } = state;

    const idx = events.indexOf(event);
    let allDay = event.allDay;

    if (!event.allDay && droppedOnAllDaySlot) {
      allDay = true;
    } else if (event.allDay && !droppedOnAllDaySlot) {
      allDay = false;
    }

    const updatedEvent = { ...event, start, end, allDay };

    const nextEvents = [...events];
    nextEvents.splice(idx, 1, updatedEvent);

    setState({
      events: nextEvents
    });

    alert(`${event.title} was dropped onto ${updatedEvent.start}`);
  };

  const resizeEvent = ({ event, start, end }) => {
    const { events } = state;

    const nextEvents = events.map((existingEvent) => {
      return existingEvent.id == event.id
        ? { ...existingEvent, start, end }
        : existingEvent;
    });

    setState({
      events: nextEvents
    });

    alert(`${event.title} was resized to ${start}-${end}`);
  };

  return (
    <div className='App'>
      <DragAndDropCalendar
        defaultDate={new Date()}
        defaultView='month'
        events={state.events}
        localizer={localizer}
        onEventDrop={moveEvent}
        onEventResize={resizeEvent}
        resizable
        style={{ height: '100vh' }}
      />
    </div>
  );
};

export default MainCalendar;
