// export const ListActions = {addToDo:'ADD_TO_DO', removeToDo: 'REMOVE_TO_DO'}

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

export let toggleToDo = () => {
  return {
    type: 'TOGGLE_TO_DO'
  }
}







