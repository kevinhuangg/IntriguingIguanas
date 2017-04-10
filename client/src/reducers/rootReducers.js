import { combineReducers } from 'redux';
import SignUp from './SignUp.js'
import LogIn from './LogIn.js'

const appReducer = combineReducers({
<<<<<<< HEAD
  //reducer files go here! - import the reducers!
  SignUp,
  LogIn  
=======
	//reducer files go here! - import the reducers!
  createBoard
>>>>>>> Build out Board component
})

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
  	state = undefined
  }
  return appReducer(state, action);
}

export default rootReducer;