import { combineReducers } from 'redux'
import list from './List.js'
import board from './Board.js'

const appReducer = combineReducers({
	//reducer files go here! - import the reducers!
	list,
	board
})

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
  	state = undefined
  }
  console.log(state)
  return appReducer(state, action)
}

export default rootReducer