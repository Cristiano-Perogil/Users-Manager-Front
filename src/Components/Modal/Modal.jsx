import { useEffect, useRef } from 'react';
import { keepTabIn } from '../../../Helpers';
import './modal.css';

function Modal(props) {
  // Props
  const { show, close, title, validateAndSubmit, children } = props;

  // References to the DOM
  const modalHeader = useRef(null);
  const submitBtn = useRef(null);


  const shiftTitle = () => {
    switch (title) {
      case 'addition':
        return 'Add User';
      case 'edition':
        return 'Edit User';
      case 'deletion':
        return 'Delete User';
      default:
        return '';
    }
  }

  useEffect(() => {
    let openModalElement = document.activeElement;
    keepTabIn(modalHeader.current, submitBtn.current);

    // Close the modal window by pressing the Esc-key
    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 27) {
        openModalElement.focus();
        close();
      }
    });
  }, [show]);

  return (
    <div className={show ? "modal modal--visible" : "modal"} role="dialog" aria-labelledby="modalTitle" tabIndex={-1}>
      <div className="modal-content">
        <div className="modal-header">
          <h2 id="modalTitle" tabIndex={0} ref={modalHeader}>{`${shiftTitle()}`}</h2>
          <button id="closeModal" onClick={() => close()} title="Close" aria-label="Close">&times;</button>
        </div>
        {children}
        <div className="modal-footer">
          <button className="cancelBtn " onClick={() => close()}>Cancel</button>
          <button className="submitBtn" onClick={() => validateAndSubmit()} ref={submitBtn}>Submit</button>
        </div>
      </div>
    </div >
  )
}

function ModalBody({ children }) {
  return (
    <div className="modal-body">
      {children}
    </div>
  )
}

export default Modal
export { ModalBody }
