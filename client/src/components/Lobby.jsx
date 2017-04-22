import React from 'react'
import { hashHistory } from 'react-router'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import BoardPage from './BoardPage.jsx'
import { createBoard, fetchBoards, deleteBoard, editBoard } from '../actions/Board'

import {
  Button,
  Card,
  Header,
  Icon
} from 'semantic-ui-react'

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
      forms: {
        createBoardName: '',
        editBoardName: this.state.forms.editBoardName
      }
    })
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
      forms: {
        createBoardName: this.state.forms.createBoardName,
        editBoardName: ''
      },
      isEditing: !this.state.isEditing
    })
  }

  deleteBoard(board_id) {
    this.props.deleteBoard(board_id, this.props.LogIn.user_id)
  }

  render() {
    return (
      <div>
        {/* ----- NAV BAR ----- */}
        <div className="ui blue inverted stackable menu">
          <div className="ui container">
            <img className='logo' src="./Logo.png"></img>
          </div>
          <a className="item"><Link to='/lobby'>
            <i className="block layout icon"></i>BOARDS
          </Link></a>
          <a className="item"><Link to='/'>
            <i className="sign out icon"></i>SIGN OUT
          </Link></a>
        </div>

        <h4 className="ui header">
        <div className="content board name">Hi, { this.props.username }!</div>
        </h4>

        {/* ----- CREATE BOARD ----- */}
        <div className='create board'>
        <div className="ui action input">
          <input
            value={ this.state.forms.createBoardName }
            onChange={ this.handleChange.bind(this, 'createBoardName') }
          />
          <button className="ui blue right labeled icon button" onClick={ this.createBoard }><i className="plus icon"></i>NEW BOARD
          </button>
        </div>
        </div>

        {/* ----- BOARDS ----- */}
        <Card.Group>
        { this.props.boards.map(board =>
          <Card className='board'>
            <Card.Content className='board-header'>
              <Card.Header>
              <Link to={`/lobby/${board.boardname}/${board.id}`}>
              { board.boardname }
              </Link>
              </Card.Header>
            </Card.Content>

            <Card.Content extra>
            <div className='ui two buttons'>
            <Button icon color='blue' onClick={ () => { this.isEditingBoardName(board.id) } }><Icon name="edit"></Icon></Button>
            <Button icon color='red' onClick={ () => { this.deleteBoard(board.id) } }><Icon name="trash"></Icon></Button>
            </div>

            { this.state.isEditing && this.state.editingBoardId === board.id &&
              <div>
                <div className="ui fluid action input">
                <input value={ this.state.forms.editBoardName } onChange={ this.handleChange.bind(this, 'editBoardName') }/>
                <button className="ui blue right icon button" onClick={ () => { this.editBoardName(board.id) } }><i className="thumbs up icon"></i>
                </button>
                </div>
              </div>
            }
            </Card.Content>
          </Card>
        )}
        </Card.Group>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
    boards: state.board.boards,
    user_id: state.LogIn.user_id,
    username: state.LogIn.username
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
