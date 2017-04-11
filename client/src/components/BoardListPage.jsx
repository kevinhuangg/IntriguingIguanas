import React from 'react'
import { connect } from 'react-redux'
import BoardPage from './BoardPage.jsx'
import { createBoard } from '../actions/createBoard'

class BoardListPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      boardName: 'untitled'
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
    return ( 
      <div>
        <input 
          value={ this.state.boardName } 
          onChange={ this.handleBoardNameChange }
        />
        <button onClick={ this.handleSubmit } >Create Board</button>
        { this.props.map((board) => (
          board.boardName
        )) }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.boardlists
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitBoard: (boardName) => { dispatch(createBoard(boardName)) },
    getBoards: () => { dispatch(fetchBoards()) }
  }
}

export default connect(mapDispatchToProps)(BoardListPage)