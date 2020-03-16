import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useToasts } from 'react-toast-notifications';

import Card from '../../Shared/Components/UIElements/Card/Card';
import Input from '../../Shared/Components/FormElements/Input/Input';
import Button from '../../Shared/Components/FormElements/Button/Button';
import ErrorModal from '../../Shared/Components/UIElements/ErrorModal/ErrorModal';
import LoadingSpinner from '../../Shared/Components/UIElements/LoadingSpinner/LoadingSpinner';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from '../../Utils/Validators';
import { useForm } from '../../Shared/Hooks/Form-Hook';
import { useHttpClient } from '../../Shared/Hooks/Http-Hook';
import { AuthContext } from '../../Shared/Context/auth-context';

import { White, Black, Secondary } from '../../Styles/JS/Colors';
import { BoxShadow2 } from '../../Styles/JS/Shadows';

const AddEvent = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const { addToast } = useToasts();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
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
      },
      allDay: {
        value: true,
        isValid: true
      }
    },
    false
  );

  const history = useHistory();

  const eventSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/events`,
        'POST',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          start: formState.inputs.start.value,
          end: formState.inputs.end.value,
          allDay: formState.inputs.allDay.value
        }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token
        }
      );
      addToast('Event Added Successfully', {
        appearance: 'success',
        autoDismiss: true,
        autoDismissTimeout: 3000
      });
      history.push('/');
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <div className={props.className}>
        <form className={props.className} onSubmit={eventSubmitHandler}>
          {isLoading && <LoadingSpinner asOverlay />}
          <Input
            id='title'
            element='input'
            type='text'
            label='Title'
            validators={[VALIDATOR_REQUIRE()]}
            errorText='Please enter a valid title.'
            onInput={inputHandler}
          />
          <Input
            id='start'
            element='input'
            type='date'
            label='Start Date'
            validators={[VALIDATOR_REQUIRE()]}
            errorText='Please Enter A Valid Start Date'
            onInput={inputHandler}
          />
          <Input
            id='end'
            element='input'
            type='date'
            label='End Date'
            validators={[VALIDATOR_REQUIRE()]}
            errorText='Please Enter A Valid Start Date'
            onInput={inputHandler}
          />
          <Input
            id='description'
            element='textarea'
            label='Description'
            rows='10'
            validators={[VALIDATOR_MINLENGTH(10)]}
            errorText='Please enter a valid post (at least 10 characters).'
            onInput={inputHandler}
          />
          {/* <Input
            id='allDay'
            element='input'
            type='radio'
            label='All Day Event'
            validators={[VALIDATOR_REQUIRE()]}
            errorText='Please Enter A Valid Start Date'
            onInput={inputHandler}
          /> */}
          <Button type='submit' disabled={!formState.isValid}>
            ADD POST
          </Button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default styled(AddEvent)`
  list-style: none;
  margin: 0 auto;
  padding: 1rem;
  width: 90%;
  max-width: 40rem;
  box-shadow: ${BoxShadow2};
  border-radius: 6px;
  background: ${White};
`;
