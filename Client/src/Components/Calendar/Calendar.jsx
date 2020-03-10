import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH} from '../../Utils/Validators'

import Modal from '../../Shared/Components/UIElements/Modal/Modal';
import Input from '../../Shared/Components/FormElements/Input/Input';
import Button from '../../Shared/Components/FormElements/Button/Button';
import {useForm} from '../../Shared/Hooks/Form-Hook';
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

  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      start: {
        value: '',
        isValid: false
      },
      end: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const [addEvent, setAddEvent] = useState(false);

  const addEventHandler = () => setAddEvent(true);

  const closeEventHandler = () => setAddEvent(false);

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

  return (
    <React.Fragment>
      <Modal
        show={addEvent}
        header='ADD NEW EVENT'
        onCancel={closeEventHandler}
        footer={<button onClick={closeEventHandler}>Close</button>}
      >
        <div>
          <form>
            <Input 
              id='title' 
              element='input' 
              type='text' 
              label='Title' 
              onInput={inputHandler} 
              validators={VALIDATOR_MINLENGTH(5)} 
              errorText='Please enter a valid title (at least 5 characters).' 
            />
            <Input
              id='start'
              element='input'
              type='date'
              label='Start'
              onInput={inputHandler}
              validators={VALIDATOR_REQUIRE()}
              errorText='Please Pick A Valid Start Date'
            />
          </form>
        </div>
      </Modal>
      <div onClick={addEventHandler} className='App'>
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
    </React.Fragment>
  );
};

export default MainCalendar;
