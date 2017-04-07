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

// export let createList = (listName) => {
//   return {
//   	type: 'CREATE_LIST',
//   	listName
//   }
// }





