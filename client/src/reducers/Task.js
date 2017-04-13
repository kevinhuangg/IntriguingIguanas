const initialState = {
  id: 1,
  listname: 'CURRENT SPRINT',
  board_id: 1,
  tasks: [
    {
      id: 1,
      text: 'Set up database',
      list_id: 1,
      assigned: 'Enoch'
    },
    {
      id: 2,
      text: 'Build front-end!',
      list_id: 1,
      assigned: 'Christine'
    }
  ],
  createError: null
}

const task = (state = initialState, action) => {
  switch (action.type) {
    case 'TASK_CREATED':
      return {
        ...state
      }
    case 'CREATE_TASK_ERROR':
      return {
        ...state,
        createError: action.createError
      }
    case 'CREATE_TASK':
      for (var i = 0; i < state.lists.length; i++) {
        if (state.lists[i].id === action.list_id) {
          return {
            ...state.lists[i],
            tasks: [...state.lists[i].tasks, { text: action.text, list_id: action.list_id }]
          }
        }
      }
    default:
      return state
  }
}

export default task