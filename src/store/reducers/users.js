const initialState = { user: '' }
const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SIGNED_UP':
            return { ...state, user: action.newUser, status: '', error: '' }
        case 'SIGNED_IN':
            return { ...state, user: action.user, status: '', error: '' }
        default:
            return state
    }

}
export default usersReducer