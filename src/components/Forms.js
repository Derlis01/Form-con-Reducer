import React, { useReducer } from "react";
import "./forms.css";

const initialState = {
  firstName: {
      value: '',
      error: null
  },
  lastName: {
      value: '',
      error: null
  },
  email: {
      value: '',
      error: null
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_FIELD':
      // Actualiza el valor del campo en el estado
      const newState = { ...state, [action.field]: { value: action.value, error: null } };
      // Valida el nuevo valor del campo
      if (action.value.length < 3 && action.field !== 'email')  {
        newState[action.field].error = 'Debe contener mas de 2 letras';
      }
      else if (action.value.length < 8 && action.field === 'email') {
        newState[action.field].error = 'el correo debe contener mas de 8 letras';
      }
      return newState;
    default:
      return state;
  }
};

const Forms = () => {

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch({ type: 'CHANGE_FIELD', field: name, value });
  };
  
  return (
    <form>
      <div className="inputCard">
        <label htmlFor="firstName">First Name</label>
        <input onChange={handleChange} type="text" name="firstName" />
        {state.firstName.error !== null ? <p className="error">{state.firstName.error}</p> : ''}
      </div>

      <div className="inputCard">
        <label htmlFor="lastName">Last Name</label>
        <input onChange={handleChange} type="text" name="lastName" />
        {state.lastName.error !== null ? <p className="error">{state.lastName.error}</p> : ''}
      </div>

      <div className="inputCard">
        <label htmlFor="email">Email</label>
        <input onChange={handleChange} type="email" name="email" />
        {state.email.error !== null ? <p className="error">{state.email.error}</p> : ''}
      </div>

    </form>
  );
};

export default Forms;
