import { handleChange } from '../../../Helpers';
import './input.css';

function Input(props) {
    const { label, type, name, value, placeholder, isInvalid, state } = props;

    function setState(e) {
        handleChange(e, state);
    }

    const id = `${label}ID`;

    return (
        <div>
            <label htmlFor={id}>{label}</label><br />
            <input
                type={type}
                id={id}
                name={name}
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

export default Input
