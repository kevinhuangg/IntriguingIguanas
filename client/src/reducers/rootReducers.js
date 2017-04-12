import { combineReducers } from 'redux'
import SignUp from './SignUp.js'
import LogIn from './LogIn.js'
import createBoard from './createBoard.js'
import fetchBoards from './fetchBoards.js'
import list from './List.js'
import task from './Task.js'

const appReducer = combineReducers({
  //reducer files go here! - import the reducers!
  SignUp,
  LogIn,
  createBoard,
  fetchBoards,
  list,
  task
})

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
  	state = undefined
  }
  return appReducer(state, action);
}

export default rootReducer;