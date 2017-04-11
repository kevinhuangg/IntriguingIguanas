import { combineReducers } from 'redux'
import SignUp from './SignUp.js'
import LogIn from './LogIn.js'
import createBoard from './createBoard.js'
import fetchBoards from './fetchBoards.js'

const appReducer = combineReducers({
  //reducer files go here! - import the reducers!
  SignUp,
  LogIn,
  createBoard,
  fetchBoards
})

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
  	state = undefined
  }
  return appReducer(state, action);
}

export default rootReducer;