import React from 'react'
import ReactDOM from 'react-dom'
import { App } from 'App'
import { shallow, mount } from 'enzyme'
import { BoardListPage } from 'BoardListPage'
import renderer from 'react-test-renderer'

describe('BoardListPage', () => {
  var boardList = [{boardName: "BOARD 1"}, {boardName: "BOARD 2"}]
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BoardListPage boardlist={ boardList }/>, div);
  });
  it('should render create board input', () => {
    const boardListPage = renderer.create(<BoardListPage boardlist={ boardList } />).toJSON();
    expect(boardListPage).toMatchSnapshot();
  })
})