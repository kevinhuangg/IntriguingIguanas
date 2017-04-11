import React from 'react'
import BoardListPage from './BoardListPage.jsx'

class HomePage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <BoardListPage />
      </div>
    )
  }
}

export default HomePage