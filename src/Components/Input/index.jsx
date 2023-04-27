import React, { useState } from "react";

function Input(props) {
    const id = `${props.label.slice(0, 2)}ID`;

    const [isNumber, setIsNumber] = useState(false);



    return (
        <div>
            <label for={id}>{props.label}</label><br>
            </br>
            <input
                type={isNumber ? "number" : "text"}
                id={id}
                value={props.value}
                onChange={props.change}
            />
            {props.invalid &&
                <div className="warn-aria-form">
                    <i className='fas fa-exclamation-circle'></i>
                    <span>The {props.label} cannot be empty.</span>
                </div>
            }
        </div>
    )
}

export default Input