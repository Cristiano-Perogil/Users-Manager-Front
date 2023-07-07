import axios from 'axios';
import { setRequestStatus, setErrorMessage, setCurrentUserFields } from '../Store/actions';

// Edits a new user from the database
export function editUser(userID, user, action, dispatch, setOpenModal) {
  let url = `http://localhost:3000/edituser/${userID}`;

  const userData = {
    name: user.name.value.toLowerCase().trim(),
    age: Number(user.age.value),
    city: user.city.value.toLowerCase().trim(),
    role: user.role.value.toLowerCase().trim(),
    department_number: Number(user.department_number.value)
  };

  dispatch(setRequestStatus(true));
  axios.put(url, userData).then(() => {
    dispatch(setCurrentUserFields('RESET'));
    setOpenModal(false);
    action();
  }).catch((error) => {
    dispatch(setCurrentUserFields('RESET'));
    setOpenModal(false);
    if (error.response) {
      if (error.response.status === 404) {
        dispatch(setErrorMessage('The User you tried to edit was not found! Try again.'));
      }
    } else {
      dispatch(setErrorMessage('It was not possible to connect to the server. Check out your network connection and give it another try. If the problem persistes contact us.'));
    }
  });
}
