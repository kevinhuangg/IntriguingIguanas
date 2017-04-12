import React from 'react'

const Task = (props) => {
  return (
    <div>
      . {props.text} – assigned to {props.assigned}
    </div>
  )
}

export default Task