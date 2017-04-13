import React from 'react'
import { hashHistory } from 'react-router'
import { connect } from 'react-redux'
import BoardPage from './BoardPage.jsx'
import { createBoard } from '../actions/createBoard'
import { fetchBoards } from '../actions/fetchBoards'

export class Lobby extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      boardName: ''
    }
    this.handleBoardNameChange = this.handleBoardNameChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleBoardNameChange(e) {
    this.setState({
      boardName: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.submitBoard(this.state.boardName)
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
        { this.props.boardlist.map((board) => (
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
    boardlist: state.fetchBoards.boardlist
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitBoard: (boardName) => { dispatch(createBoard(boardName)) },
    getBoards: () => { dispatch(fetchBoards()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lobby)