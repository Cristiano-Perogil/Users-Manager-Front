import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { setFieldValue } from '../../Store/actions';
import './input.css';

function Input(props) {
  const { label, type, name, value, placeholder, isInvalid, onErrorVerify } = props;
  const dispatch = useDispatch();

  function setState(e) {
    let newField = {
      name: e.target.name,
      value: e.target.value
    }
    dispatch(setFieldValue(newField));
    if (newField.value == '') {
      onErrorVerify((prevState) => ({ ...prevState, [newField.name]: true }));
    }
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
        onChange={(e) => setState(e)}
        onBlur={(e) => setState(e)}
        placeholder={placeholder}
      />
      {isInvalid &&
        <div className="warn-aria-form" role="alert">
          <i className='fas fa-exclamation-circle'></i>
          <span>The {name} cannot be empty.</span>
        </div>
      }
    </div>
  )
}

export default memo(Input);
