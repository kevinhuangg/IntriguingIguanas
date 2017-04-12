import React from 'react'
import List from './List.jsx'
import { connect } from 'react-redux'
import { createList, fetchList } from '../actions/List.js'

class BoardPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: ''
    }
    this.onInputChange = this.onInputChange.bind(this)
    this.onCreateList = this.onCreateList.bind(this)
  }

  componentWillMount() {
    // this.props.fetchList()
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
    console.log('---> LIST PROPS', this.props)
    return (
      <div>
        <input onChange={ this.onInputChange }/>
        <button onClick={ this.onCreateList }>CREATE LIST</button>

        { this.props.allLists.map((list, index) =>
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
    board_id: state.list.board_id,
    allLists: state.list.allLists
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createList: (name, board_id) => { dispatch(createList(name, board_id)) },
    fetchList: () => { dispatch(fetchList()) },

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardPage)
