import axios from 'axios';
import { setRequestStatus, setErrorMessage } from '../Store/actions';

// Adds a new user to the database
export function addUser(newUser, action, dispatch, setOpenModal) {
  let url = 'http://localhost:3000/adduser/';

  dispatch(setRequestStatus(true));
  axios.post(url, newUser).then(() => {
    setOpenModal(false);
    action();
  }).catch((error) => {
    setOpenModal(false);
    if (error.response) {
      if (error.response.status === 500) {
        dispatch(setErrorMessage("Ops! Something went wrong. Try again!"));
      }
    } else {
      dispatch(setErrorMessage("It was not possible to connect to the server. Check out your network connection and give it another try. If the problem persistes contact us."));
    }
  })
}


