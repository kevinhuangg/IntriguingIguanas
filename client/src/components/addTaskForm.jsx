import React from 'react';
import { connect } from 'react-redux';
import { addToDo } from '../actions/List.js'

class addTaskForm extends React.Component {
  constructor(props) {
  	super(props)
    this.state = {
      value: '',
    }
  	this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({value: e.target.value})
  }
  handleSubmit() {
    this.props.dispatch(addToDo(this.state.value))
  }

  render() {

	  return (
	  	<div>
	  		<input type='text' onChange={this.handleChange}/>
	  		<button onClick={this.handleSubmit}>Submit</button>
	  	</div>
	  )
  }

}

// const mapStateToProps = (state) => {
//   console.log(state)
//   return {
//     ...state
//   }
// }

export default connect()(addTaskForm);
