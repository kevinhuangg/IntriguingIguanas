import { addToDo, removeToDo } from '../actions/List.js';

//create reducer function with args initState and action

let initState = {
  list: ['task1','task2','task3']
}

const List = (state = initState, action) => {
//switch (expression)
  switch (action.type) {
    case 'ADD_TO_DO':
      return {...state, 
        list: [...state.list, action.text]
      }
    // case 'REMOVE_TO_DO':
    //   var copy = state.list.slice()
    //   copy.splice(action.index, 1)
    //   return {
    //     ...state,
    //     list: copy
    //   }
      
    default: 
      return state; 
  }
}

export default List