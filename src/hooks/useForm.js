import {useReducer} from 'react';
import PropTypes from 'prop-types';

const SET_VALUES = 'SET_VALUES';
const SET_ERRORS = 'SET_ERRORS';
const HANDLE_BLUR = 'HANDLE_BLUR';
const RESET = 'RESET';
// const SET_TOUCHED_VALUES = 'SET_TOUCHED_VALUES';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_VALUES: {
      const {name, value} = action.payload;

      return {
        ...state,
        values: {
          ...state.values,
          [name]: value,
        },
      };
    }
    case SET_ERRORS:
      return {
        ...state,
        errors: action.payload,
      };
    case HANDLE_BLUR: {
      const {name, errors} = action.payload;

      return {
        ...state,
        touchedValues: {
          ...state.touchedValues,
          [name]: true,
        },
        errors,
      };
    }
    case RESET:
      return {
        ...state,
        values: action.payload,
        touchedValues: {},
        errors: {},
      };
    default:
      return state;
  }
};

const useForm = ({initialValues, onSubmit, validate}) => {
  const [state, dispatch] = useReducer(reducer, {
    values: initialValues ?? {},
    touchedValues: {},
    errors: {},
  });

  const handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    dispatch({type: SET_VALUES, payload: {name, value}});
  };

  const handleBlur = (event) => {
    const target = event.target;
    const name = target.name;
    const validateErrors = validate(state.values);

    dispatch({type: HANDLE_BLUR, payload: {name, errors: validateErrors}});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validateErrors = validate(state.values);

    if (Object.keys(validateErrors).length !== 0) {
      dispatch({type: SET_ERRORS, payload: validateErrors});
    } else {
      state.errors && dispatch({type: SET_ERRORS, payload: {}});

      onSubmit(state.values);
    }
  };

  const reset = (values = initialValues) => {
    dispatch({type: RESET, payload: values});
  };

  return {
    ...state,
    handleChange,
    handleSubmit,
    handleBlur,
    reset,
  };
};

useForm.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
  validate: PropTypes.func,
};

export default useForm;
