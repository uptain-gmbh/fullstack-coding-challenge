import { combineReducers } from 'redux'
import loadingReducer from './loading'
import errorReducer from './error'
import usersReducer from './users'
import itemsReducer from './items'
import { reducer as formReducer } from 'redux-form'
const rootReducer = combineReducers({
    form: formReducer,
    loading: loadingReducer,
    errors: errorReducer,
    user: usersReducer,
    items: itemsReducer

})
export default rootReducer