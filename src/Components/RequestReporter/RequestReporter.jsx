import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { keepTabIn } from '../../../Helpers';
import { setRequestStatus } from '../../Store/actions';
import './request-reporter.css';

function RequestReporter() {
    const requestStatus = useSelector((state) => state.requestReporter);
    const dispatch = useDispatch();
    const firstElement = useRef(null);
    const lastElement = useRef(null);

    useEffect(() => {
        let previousElement = document.activeElement;
        keepTabIn(firstElement.current, lastElement.current);

        // Close the dialog window by pressing the Esc-key
        document.addEventListener('keydown', (e) => {
            if (e.keyCode === 27) {
                previousElement.focus();
                dispatch(setRequestStatus(false));
            }
        });
    }, [requestStatus.status.isVisible]);

    return (
        <div className="loaderContainer" role="dialog">
            <div className="wrapper" tabIndex={0} ref={firstElement}>
                {!requestStatus.error.on ?
                    (<div className="loader"></div>) :
                    (<i className="fas fa-exclamation-triangle"></i>)
                }
                <div className="break"></div>
                {!requestStatus.error.on ?
                    (<p aria-live='polite' tabIndex={0} ref={lastElement}>Loading.<br />Please wait...</p>) :
                    (<p aria-live='polite' tabIndex={0} ref={lastElement}>{requestStatus.error.errorMessage}</p>)
                }
            </div>
        </div>
    )
}

export default RequestReporter;
