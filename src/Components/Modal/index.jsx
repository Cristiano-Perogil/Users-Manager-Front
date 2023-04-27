import React, { useState, useContext, useRef } from "react";
import { keepTabIn, stopTrackTab } from "./controler.js";
import "./modal.css";

function Modal(props) {
    const [closeModal, setCloseModal] = useState(false);
    const elements = useRef([]);


    const addElement = (element) => {
        elements.current.push(element);
    }

    //openModal ? keepTabIn(elements) : stopTrackTab();

    return (
        <div className={props.show ? "modal modal--visible" : "modal"} role="dialog" aria-labelledby="modalTitle" tabIndex={-1}>
            <div className="modal-content">
                <div className="modal-header">
                    <h2 id="modalTitle" tabIndex={-1} ref={addElement}>{props.title}</h2>
                    <button id="closeModal" ref={addElement}>&times;</button>
                </div>
                <div className="modal-body" ref={addElement}>
                    <p>{props.message}</p>
                </div>
            </div>
        </div >
    )
}

export default Modal