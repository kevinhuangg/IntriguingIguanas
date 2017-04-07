import React from 'react'
import { connect } from 'react-redux'
import { removeToDo } from '../actions/List.js'

class listEntry extends React.Component {
	constructor(props) {
		super(props)

		this.handleRemoveToDo = this.handleRemoveToDo.bind(this)
	}

	handleRemoveToDo() {
		//dispatch the removetodo action
		this.props.dispatch(removeToDo(this.props.index))
	}

	render() {
	  return (
	  	<div>
		  	<li>{ this.props.entry }</li>
		  	<button onClick={ this.handleRemoveToDo }>Delete</button>
	  	</div>
	  )
	}
}

export default connect()(listEntry)