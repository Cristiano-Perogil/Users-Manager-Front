import { useSelector } from "react-redux";
import './request-reporter.css';

function RequestReporter() {
    const requestStatus = useSelector((state) => state.requestReporter.status);
    return (
        <div className="loaderContainer" role="dialog">
            <div className="wrapper">
                {!requestStatus.error ?
                    (<div className="loader"></div>) :
                    (<i className="fas fa-exclamation-triangle"></i>)
                }
                <div className="break"></div>
                {requestStatus.errorMessage == "" ?
                    (<p>Loading<br />Please wait...</p>) :
                    (<p>{requestStatus.errorMessage}</p>)
                }
            </div>
        </div>
    )
}

export default RequestReporter;
