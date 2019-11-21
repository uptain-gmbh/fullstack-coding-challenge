const initialState = {loading:false}
const loadingReducer = (state=initialState, action) => {
    switch(action.type){
        case 'LOADING':
            return {...state,loading:true}
        case 'LOADED':
            return {...state,loading:false}
        default:
            return state
    }
    
}
export default loadingReducer