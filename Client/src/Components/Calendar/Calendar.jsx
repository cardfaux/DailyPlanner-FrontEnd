import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { v1 as uuidv1 } from 'uuid';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

import '../../App.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);

const MainCalendar = (props) => {
  const [state, setState] = useState({
    events: [
      {
        id: uuidv1(),
        start: new Date(),
        end: new Date(moment().add(2, 'days')),
        title: 'Dr. Appointment'
      }
    ]
  });

  const onEventResize = (type, { event, start, end, allDay }) => {
    setState((state) => {
      state.events[0].start = start;
      state.events[0].end = end;
      return { events: state.events };
    });
  };

  const onEventDrop = ({ event, start, end, allDay }) => {
    console.log(start);
    console.log(end);
    console.log(event);
  };

  console.log(state.events[0]);

  return (
    <div className='App'>
      <DragAndDropCalendar
        defaultDate={new Date()}
        defaultView='month'
        events={state.events}
        localizer={localizer}
        onEventDrop={onEventDrop}
        onEventResize={onEventResize}
        resizable
        style={{ height: '100vh' }}
      />
    </div>
  );
};

export default MainCalendar;
