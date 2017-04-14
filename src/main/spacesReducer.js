const spaces = (state = [], action) => {
    if (!action || !action.type) {
        return state
    }

     let newState = state
    // switch (action.type) {
    //     case 'INCREMENT':
    //         newState++
    // }

    return newState
}

export default spaces