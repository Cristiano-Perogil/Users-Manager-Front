import axios from 'axios';
import { setRequestStatus, setErrorMessage } from '../Store/actions';

// Edits a new user to the database
export function editUser(userID, user, action, dispatch, setOpenModal) {
  let url = `http://localhost:3000/edituser/${userID}`;

  dispatch(setRequestStatus(true));
  let editingUser = { ...user, age: Number(user.age), departmentNumber: Number(user.departmentNumber) };
  axios.put(url, editingUser).then(() => {
    setOpenModal(false);
    action();
  }).catch((error) => {
    setOpenModal(false);
    if (error.response) {
      if (error.response.status === 404) {
        dispatch(setErrorMessage("The User you tried to edit was not found! Try again."));
      }
    } else {
      dispatch(setErrorMessage("It was not possible to connect to the server. Check out your network connection and give it another try. If the problem persistes contact us."));
    }
  })
}


