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
  }

  handleBoardNameChange() {
    this.setState({
      boardName: this.state.boardName
    })
  }

  render() {
    return ( 
      <div>
        <input 
          value={ this.state.boardName } 
          onChange={ this.handleBoardNameChange }/>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitBoard: (boardName) => { dispatch(createBoard(boardName)) }
  }
}

export default connect(mapDispatchToProps)(BoardListPage)