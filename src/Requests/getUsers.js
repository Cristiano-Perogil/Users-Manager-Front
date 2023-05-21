import axios from 'axios';
import { setRequestStatus, setErrorMessage } from '../Store/actions';

// Gets data from the  back-end
function getUsers(hasParams = false, filter = '', keyWord = '', setUsers, dispatch) {
  let url;
  if (hasParams) {
    url = `http://localhost:3000/getusers/filterusers/?filterBy=${filter}&keyWord=${keyWord}`
  } else { url = `http://localhost:3000/getusers/` }

  dispatch(setRequestStatus(true));
  axios.get(url).then((data) => {
    setUsers(data.data);
    dispatch(setRequestStatus(false));
  }).catch((error) => {
    if (error.response) {
      if (error.response.status === 404) {
        dispatch(setErrorMessage("No users were found by applying the filters you've chosen. Try different ones, cleaning up them or refreshing the page!"));
      }
    } else {
      dispatch(setErrorMessage("It was not possible to connect to the server. Check out your network connection and give it another try. If the problem persistes contact us."));
    }
  })
}

export default getUsers;
