const initialState = {tasks:[]}
const tasksReducer = (state=initialState, action) => {
    switch(action.type){
        case 'ADD_ITEM':
            return {...state, tasks:[...state.tasks,action.newItem]}
        case 'GET_ITEMS':
                return {...state, tasks:action.tasks}
        case 'DELETE_ITEM':
                let newTasks = state.tasks.filter((task) => task.id != action.id)
                return {...state, tasks:newTasks}
        case 'UPDATE_ITEM':
                let foundTask = state.tasks.find((task) =>  task.id == action.id )
                let taskIndex = state.tasks.indexOf(foundTask)
                let cloneTasks = [...state.tasks]
                cloneTasks[taskIndex].item = action.item
                return {...state, tasks:cloneTasks}
                
        default:
            return state
    }
    
}
export default tasksReducer