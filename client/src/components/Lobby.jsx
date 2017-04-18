import React from 'react'
import { hashHistory } from 'react-router'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import BoardPage from './BoardPage.jsx'
import SideBar from './SideBar.jsx'
import { createBoard, fetchBoards, deleteBoard, editBoard } from '../actions/Board'

export class Lobby extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      forms: {createBoardName: '', editBoardName: ''},
      editingBoardId: null,
      isEditing: false
    }
    this.createBoard = this.createBoard.bind(this)
    this.deleteBoard = this.deleteBoard.bind(this)
    this.isEditingBoardName = this.isEditingBoardName.bind(this)
    this.editBoardName = this.editBoardName.bind(this)
  }

  componentWillMount() {
    console.log('> LOBBY', this.props)
    console.log('> USER_ID', this.props.LogIn.user_id)
    this.props.fetchBoards(this.props.LogIn.user_id)
  }

  handleChange(form, e) {
    const forms = this.state.forms
    forms[form] = e.target.value
    this.setState({ forms: forms })
  } 

  createBoard(e) {
    e.preventDefault()
    this.props.createBoard(this.state.forms.createBoardName, this.props.LogIn.user_id)
    this.setState({
      forms: {createBoardName: '', editBoardName: this.state.forms.editBoardName }
    })
  }

  deleteBoard(board_id) {
    this.props.deleteBoard(board_id, this.props.LogIn.user_id)
  }


  isEditingBoardName(board_id) {
    this.setState({
      isEditing: !this.state.isEditing,
      editingBoardId: board_id
    })
  }

  editBoardName(board_id) {
    this.props.editBoard(this.state.forms.editBoardName, board_id, this.props.LogIn.user_id)
    this.setState({
      forms: {createBoardName: this.state.forms.createBoardName, editBoardName: ''},
      isEditing: !this.state.isEditing
    })
  }

  render() {
    console.log('> BOARDS', this.props.boards)
    return (
      <div>
        <input
          value={ this.state.forms.createBoardName }
          onChange={ this.handleChange.bind(this, 'createBoardName') }
        />
        <button onClick={ this.createBoard }>CREATE BOARD</button>
        { this.props.boards.map((board) => (
            <div>
              <Link to={`/lobby/${board.boardname}/${board.id}`}>
              { board.boardname }
              </Link>
              <button onClick={ () => { this.isEditingBoardName(board.id) } }>EDIT</button>
              { this.state.isEditing && this.state.editingBoardId === board.id &&
                <div>
                  <input value={ this.state.forms.editBoardName } onChange={ this.handleChange.bind(this, 'editBoardName') }/>
                  <button onClick={ () => { this.editBoardName(board.id) } }>SAVE</button>
                </div>
              }
              <button onClick={ () => { this.deleteBoard(board.id) } }>DELETE</button>
            </div>
        )) }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
    boards: state.board.boards,
    user_id: state.LogIn.user_id

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createBoard: (boardName, user_id) => { dispatch(createBoard(boardName, user_id)) },
    editBoard: (boardName, board_id, user_id) => { dispatch(editBoard(boardName, board_id, user_id)) },
    deleteBoard: (board_id, user_id) => { dispatch(deleteBoard(board_id, user_id)) },
    fetchBoards: (user_id) => { dispatch(fetchBoards(user_id)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lobby)
