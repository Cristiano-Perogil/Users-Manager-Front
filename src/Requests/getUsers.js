import axios from 'axios';
import { setRequestStatus, setErrorMessage } from '../Store/actions';

// Gets data from the  back-end
export function getUsers(hasParams = false, filter = '', keyWord = '', setUsers, dispatch) {
  let url;
  let errorMessage;
  if (hasParams) {
    errorMessage = 'No users were found by applying the filters you"ve chosen. Try different ones, cleaning up them or refreshing the page!';
    url = `http://localhost:3000/getusers/?method=${filter}&keyWord=${keyWord}`;
  } else {
    errorMessage = 'There is no user yet stored within the database. You can add the firs one by clicking on the "Add User" button and filling out their information';
    url = 'http://localhost:3000/getusers/';
  }

  dispatch(setRequestStatus(true));
  axios.get(url).then((data) => {
    setUsers(data.data);
    dispatch(setRequestStatus(false));
  }).catch((error) => {
    if (error.response) {
      if (error.response.status === 404) {
        dispatch(setErrorMessage(errorMessage));
      }
    } else {
      console.log('error!');
      dispatch(setErrorMessage('It was not possible to connect to the server. Check out your network connection and give it another try. If the problem persistes contact us.'));
    }
  });
}
