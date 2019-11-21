const initialState = { tasks: [] }
const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            return { ...state, tasks: [...state.tasks, action.newitem], error: '', loading: false }
        case 'GET_ITEMS':
            return { ...state, tasks: action.tasks }
        default:
            return state
    }

}
export default tasksReducer