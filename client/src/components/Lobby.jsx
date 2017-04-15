import React from 'react'
import { hashHistory } from 'react-router'
import { connect } from 'react-redux'
import BoardPage from './BoardPage.jsx'
import { createBoard, fetchBoards } from '../actions/Board'

export class Lobby extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      boardName: ''
    }
    this.handleBoardNameChange = this.handleBoardNameChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount() {
    // this.props.fetchBoards()
  }

  handleBoardNameChange(e) {
    this.setState({
      boardName: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.createBoard(this.state.boardName)
  }

  render() {
    console.log('---> BOARD PROPS', this.props.boardlist);
    return (
      <div>
        <input
          value={ this.state.boardName }
          onChange={ this.handleBoardNameChange }
        />
        <button onClick={ this.handleSubmit }>CREATE BOARD</button>
        { this.props.boards.map((board) => (
          <div
            key={ board.boardname }
            onClick={ () => this.props.sendToLobby(board.board_id) }
          > { board.boardName }</div>
        )) }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    boards: state.board.boards
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createBoard: (boardName) => { dispatch(createBoard(boardName)) },
    fetchBoards: (user_id) => { dispatch(fetchBoards(user_id)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lobby)