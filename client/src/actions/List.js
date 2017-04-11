export let addToDo = (text) => {
  return {
    type: 'ADD_TO_DO',
    text
  }
}

export let removeToDo = (index) => {
  return {
    type: 'REMOVE_TO_DO',
    index
  }
}