export function updateState(state, value) {
    state(value);
}

export function openModal(state='') {
    let states = {
        open: false
    };
    state ?  states.open = true : states.open = false;
    return states;
}
