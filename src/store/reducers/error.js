const initialState = {error:''}
const ErrorReducer = (state=initialState, action) => {
    switch(action.type){
        case 'ADD_ERROR':
            return {...state, error:action.error}
        case 'REMOVE_ERROR':
            return {...state, error:''}
        default:
            return state
    }
    
}
export default ErrorReducer