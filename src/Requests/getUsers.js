import axios from "axios";

// Gets data from the  back-end
function getUsers(hasParams = false, filter = '', keyWord = '', state) {
    let url;
    if (hasParams) {
        url = `http://localhost:3000/getusers/filterusers/?filterBy=${filter}&keyWord=${keyWord}`
    } else { url = `http://localhost:3000/getusers/` }

    state((prevState) => ({ ...prevState, isFetching: true }))
    axios.get(url).then((data) => {
        state((prevState) => ({ ...prevState, success: data.data, isFetching: false }))
    }).catch((error) => {
        state((prevState) => ({ ...prevState, isFetching: false }))
        if (error.response) {
            if (error.response.status === 404) {
                state((prevState) => ({
                    ...prevState,
                    error: true,
                    message: "User not found, Choose a different type of filter and / or key word."
                }));
            }
        } else {
            state((prevState) => ({
                ...prevState,
                error: true,
                message: "It was not possible to connect to the server. It may be caused by network issues or server-side problems.<br><br>Try reloading the page!"
            }));
        }
    })
}

export default getUsers;
