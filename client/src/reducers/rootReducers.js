import { combineReducers } from 'redux'
import SignUp from './SignUp.js'
import LogIn from './LogIn.js'
import board from './Board.js'
import list from './List.js'

const appReducer = combineReducers({
  //reducer files go here! - import the reducers!
  SignUp,
  LogIn,
  board,
  list
})

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
  	state = undefined
  }
  return appReducer(state, action);
}

export default rootReducer;