import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

import { v1 as uuidv1 } from 'uuid';

import '../../Styles/CSS/App.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import Events from '../../Utils/Events';

const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);

const MainCalendar = () => {
  const [state, setState] = useState({
    events: Events,
    title: '',
    start: '',
    end: '',
    openSlot: false
  });
  console.log('TOP OF FILE', state);

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
    console.log(updatedEvent);

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

  const handleSlotSelected = (slotInfo) => {
    console.log('Real slotInfo', slotInfo);

    setState({
      events: Events,
      id: uuidv1(),
      title: 'New Event',
      start: slotInfo.start,
      end: slotInfo.end,
      openSlot: true
    });
  };

  const newEvent = (event) => {
    //console.log(event.slots[0]);
    let hour = {
      id: uuidv1(),
      title: 'New Event',
      allDay: event.slots.length == 1,
      start: event.start,
      end: event.end
    };
    setState({
      events: state.events.concat([hour])
    });
  };
  console.log('+++++++', state);
  return (
    <React.Fragment>
      <div className='App'>
        <DragAndDropCalendar
          defaultDate={new Date()}
          selectable
          defaultView='month'
          events={state.events}
          localizer={localizer}
          onEventDrop={moveEvent}
          onEventResize={resizeEvent}
          onSelectSlot={(slotInfo) => handleSlotSelected(slotInfo)}
          //onSelectSlot={newEvent}
          resizable
          style={{ height: '100vh' }}
        />
      </div>
    </React.Fragment>
  );
};

export default MainCalendar;
