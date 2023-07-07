import axios from 'axios';
import { setRequestStatus, setErrorMessage, setCurrentUserFields } from '../Store/actions';

// Adds a new user to the database
export function addUser(newUser, action, dispatch, setOpenModal) {
  let url = 'http://localhost:3000/adduser/';

  const userData = {
    name: newUser.name.value.toLowerCase().trim(),
    age: Number(newUser.age.value),
    city: newUser.city.value.toLowerCase().trim(),
    role: newUser.role.value.toLowerCase().trim(),
    department_number: Number(newUser.department_number.value)
  };

  dispatch(setRequestStatus(true));
  axios.post(url, userData).then(() => {
    dispatch(setCurrentUserFields('RESET'));
    setOpenModal(false);
    action();
  }).catch((error) => {
    dispatch(setCurrentUserFields('RESET'));
    setOpenModal(false);
    if (error.response) {
      if (error.response.status === 500) {
        dispatch(setErrorMessage('Ops! Something went wrong. Try again!'));
      }
    } else {
      dispatch(setErrorMessage('It was not possible to connect to the server. Check out your network connection and give it another try. If the problem persistes contact us.'));
    }
  });
}
