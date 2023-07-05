import { useDispatch, useSelector } from 'react-redux';
import { setFieldValue } from '../../Store/actions';
import { validateFields } from '../../../Helpers';
import './input.css';

function Input(props) {
  const { label, type, name, value, min, max, placeholder, isInvalid } = props;
  const dispatch = useDispatch();

  const errorMessage = useSelector((state) => state.formFields[name].errorMessage);

  function manageInputStatus(e) {
    let newField = {
      name: e.target.name,
      value: typeof e.target.value === 'number' ?
        e.target.value.toString() : e.target.value
    };
    dispatch(setFieldValue(newField));
    validateOnblur(e);
  }

  function validateOnblur(e) {
    let field = {
      name: e.target.name,
      value: typeof e.target.value === 'number' ?
        e.target.value.toSetring() : e.target.value
    };
    validateFields(null, null, min, max, true, field, dispatch);
  }

  const id = `${label}ID`;

  return (
    <div>
      <label htmlFor={id}>{label}</label><br />
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        minLength={min}
        maxLength={max}
        onChange={(e) => manageInputStatus(e)}
        onBlur={(e) => validateOnblur(e)}
        placeholder={placeholder}
      />
      {isInvalid &&
        <div className="warn-aria-form" role="alert">
          <i className='fas fa-exclamation-circle'></i>
          <span aria-live="polite">{errorMessage}</span>
        </div>
      }
    </div>
  );
}

export default Input;
