import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFieldValue } from '../../Store/actions';
import './input.css';

function Input(props) {
    const { label, type, name, placeholder, isInvalid } = props;
    const inputFields = useSelector((state) => state.formFields.fields);
    const dispatch = useDispatch();

    function setState(e) {
        let newField = {
            name: e.target.name,
            value: e.target.value
        }
        dispatch(setFieldValue(newField))
    }

    const id = `${label}ID`;



    return (
        <div>
            <label htmlFor={id}>{label}</label><br />
            <input
                type={type}
                id={id}
                name={name}
                value={inputFields.value}
                onChange={(e) => setState(e)}
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
