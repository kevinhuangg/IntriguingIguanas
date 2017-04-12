import React from 'react'
import Task from './Task.jsx'

const List = (props) => {
  return (
    <div>
      LIST NAME – { props.listname }
      <Task />
    </div>
  )
}

export default List