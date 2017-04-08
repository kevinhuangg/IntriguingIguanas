import React from 'react'
import { connect } from 'react-redux'
import { removeToDo, toggleToDo } from '../actions/List.js'

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
		  	<li >{ this.props.entry }</li>
		  	<button onClick={ this.handleRemoveToDo }>Delete</button>
	  	</div>
	  )
	}
}


const mapStateToProps = (state) => {
  console.log(state,'listentry')
  return {
  	show: state.list
  }
}

export default connect(mapStateToProps)(listEntry)