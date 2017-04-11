import React from 'react'
import List from './List.jsx'
import { connect } from 'react-redux'
import { createList } from '../actions/List'

class BoardPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: ''
    }
    this.onInputChange = this.onInputChange.bind(this);
  }

  componentWillMount() {
    // fetch selected board
    // dispatch action to get board info
    // board_id = this.props.params.taskBoardId
  }

  onInputChange(e) {
    this.setState({
      name: e.target.value
    })
  }

  onCreateList() {
    this.props.createList(this.state.name, this.props.board_id)
  }

  render() {
    return (
      <input value onChange={ this.onInputChange }/>
      <button onClick={ this.props.createList }>CREATE LIST</button>

      { this.props.lists.map((list, index) =>
        <List
          key={ index }
          tasks={ list.tasks }
          index={ index }
        />) }
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.list,
    board_id: state.board.id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createList: (name) => { dispatch(createList(name)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardPage)
