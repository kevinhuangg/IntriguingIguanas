import React from 'react'
import { hashHistory } from 'react-router'
import { connect } from 'react-redux'
import BoardPage from './BoardPage.jsx'
import { createBoard } from '../actions/createBoard'
import { fetchBoards } from '../actions/fetchBoards'

export class BoardListPage extends React.Component {
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

  renderBoard(board_id) {
    hashHistory.push('/lobby/' + board_id)
  }

  render() {
    console.log(this.props.boardlist, "PROPS");
    return ( 
      <div>
        <input 
          value={ this.state.boardName } 
          onChange={ this.handleBoardNameChange }
        />
        <button onClick={ this.handleSubmit } >Create Board</button>
        { this.props.boardlist.map((board) => (
          <div 
            onClick={ () => this.renderBoard(board.board_id) }
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

export default connect(mapStateToProps, mapDispatchToProps)(BoardListPage)