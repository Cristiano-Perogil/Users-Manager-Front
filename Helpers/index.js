/* 
Validates a range of input fields based on a base obj and a error based one.
If the input field is invalid, the base obj will set its equivalent property to true within the error one.
*/
export function validateFields(baseObj, errorObjState, action) {
    let isInvalid = false;
    for (let key in baseObj) {
        if (baseObj[key] == '') {
            errorObjState(prevState => ({ ...prevState, [key]: true }));
            isInvalid = true;
        }
    }
    if (!isInvalid) action();
}



// Sets the object state of a range of input fields according to their name and value

export function handleChange(e, state) {
    let name = e.target.name;
    let value = e.target.value;
    state(prevState => ({ ...prevState, [name]: value }));
}
