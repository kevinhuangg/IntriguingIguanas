import axios from 'axios'

export const taskCreated = () => {
  return {
    type: 'TASK_CREATED'
  }
}

export const createError = (error) => {
  return {
    type: 'CREATE_ERROR',
    error
  }
}

export function createTask(text, list_id) {
  return {
    type: 'CREATE_TASK',
    text,
    list_id
  }
}