// import { addToDo, removeToDo } from '../actions/List.js';

//create reducer function with args initState and action

let initState = {
  tasks: ['task1','task2','task3'],
  name: ''
  //board: array of list objects
  //list: array of task cards
}

const List = (state = initState, action) => {
//switch (expression)
  switch (action.type) {
    case 'ADD_TO_DO':
      return { 
        ...state, 
        tasks: [...state.tasks, action.text]
      }
    case 'REMOVE_TO_DO':
      var copy = state.tasks.slice()
      copy.splice(action.index, 1)
      return {
        ...state,
        tasks: copy
      } 
    case 'CREATE_LIST':
      return {
        ...state,
        name: action.name
      }
      
    default: 
      return state; 
  }
}

export default List