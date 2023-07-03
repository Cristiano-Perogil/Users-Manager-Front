import axios from 'axios';
import { setRequestStatus, setErrorMessage } from '../Store/actions';

// Adds a new user to the database
export function deleteUser(userID, action, dispatch, setOpenModal) {
  let url = `http://localhost:3000/deleteuser/${userID}`;

  dispatch(setRequestStatus(true));
  axios.delete(url).then(() => {
    setOpenModal(false);
    action();
  }).catch((error) => {
    setOpenModal(false);
    if (error.response) {
      if (error.response.status === 404) {
        dispatch(setErrorMessage('Ops! It seems this user has been already been deleted. Check if another one through a different client has done it. Do not forget refreshing the page to reflect the new changes.'));
      }
    } else {
      dispatch(setErrorMessage('It was not possible to connect to the server. Check out your network connection and give it another try. If the problem persistes contact us.'));
    }
  });
}


