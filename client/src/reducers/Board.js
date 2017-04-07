import List from './List.js'

const initState = {
  lists: [],
  name: ''
}

const Board = (state = initState, action) => {
	// console.log("reached")
  console.log(action, "ACTION")
  switch (action.type) {
    case 'CREATE_LIST':
      return {
        ...state,
        lists: [...state.lists, List(state, action)],
      }

    default:
      return state; 
  }
}

export default Board