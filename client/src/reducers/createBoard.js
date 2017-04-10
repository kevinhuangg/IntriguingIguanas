const initialState = {
  boardName: 'untitled'
}

function createBoard(state=initialState, action) {
  switch (action.type) {
    case 'CREATE_BOARD':
      return {
        ...board,
        boardName: action.boardName 
      }
    default: 
      return state; 
  }
}

export default createBoard; 