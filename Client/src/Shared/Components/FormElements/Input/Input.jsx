import React, { useReducer, useEffect } from 'react';

import { validate } from '../../../../Utils/Validators';
import './Input.css';

// Set up Reducer Outside Of The Component
const inputReducer = (state, action) => {
  switch (action.type) {
    // Fires On A Change Action
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators)
      };
    // Touch Case For The onBlur Below
    case 'TOUCH': {
      return {
        ...state,
        isTouched: true
      };
    }
    default:
      return state;
  }
};

const Input = (props) => {
  // Pass In inputReducer, An Optional Object Of Initial State
  // Dispatch Is A Function Which We Can Call, To Dispatch Actions To The Reducer Function
  // The Dispatch Function Will Update The InputState And ReRrender The Component
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || '',
    isTouched: false,
    isValid: props.initialValid || false
  });

  // Destructure To Use On These Properties To Avoid Infinte Loops
  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    // onInput Is Set outside As A Prop To Be Informed About Changes
    // ID Is Set From OutSide
    onInput(id, value, isValid);
    // Array of things that should trigger the function
  }, [id, value, isValid, onInput]);

  // Triggers When The User Enters Something
  // Call Dispatch, The Object is an Action Object
  // action.val and action.validators refers to this
  const changeHandler = (event) => {
    dispatch({
      type: 'CHANGE',
      val: event.target.value,
      // VALIDATOR_REQUIRE function gets passed in from outside
      validators: props.validators
    });
  };

  // Controls The onBlur For The Input
  const touchHandler = () => {
    // Dispatch A New Action
    dispatch({
      type: 'TOUCH'
    });
  };

  const element =
    props.element === 'input' ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        // onBlur Lets The User Input Atleast One Character Before Erroring
        onBlur={touchHandler}
        // inputState.value is coming from useReducer
        value={inputState.value}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        // inputState.value is coming from useReducer
        value={inputState.value}
      />
    );

  return (
    // The Div To The Label And Input
    <div
      className={`form-control ${!inputState.isValid &&
        inputState.isTouched &&
        'form-control--invalid'}`}
    >
      {/* The Element Is For The Input Or Text Area Configured Above */}
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {/* If The Input is Invalid We Will Get Error Text */}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
