import React from 'react'
import List from './List.jsx'
import { connect } from 'react-redux'
import { createList, fetchList } from '../actions/List.js'

export class BoardPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listName: ''
    }
    this.onInputChange = this.onInputChange.bind(this)
    this.onCreateList = this.onCreateList.bind(this)
    console.log('---> LIST PROPS', this.props)
  }

  componentWillMount() {
    // this.props.fetchList()
    console.log('BOARD ID', this.props.params.taskBoardId)
    var taskBoardId = this.props.params.taskBoardId
    var socket = this.props.route.socket
    socket.emit('join-board', { taskBoardId: taskBoardId })
  }

  onInputChange(e) {
    this.setState({
      listName: e.target.value
    })
  }

  onCreateList() {
    this.props.createList(this.state.listName, this.props.board_id)
  }

  render() {
    return (
      <div>
        <h3>{ this.props.boardname }</h3>
        <input onChange={ this.onInputChange }/>
        <button onClick={ this.onCreateList }>CREATE LIST</button>

        { this.props.lists.map((list, index) =>
          <List
            key={ index }
            listname={ list.listname }
            tasks={ list.tasks }
            index={ index }
          />) }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.list,
    board_id: state.list.id,
    lists: state.list.lists
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createList: (boardname, board_id) => { dispatch(createList(boardname, board_id)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardPage)
