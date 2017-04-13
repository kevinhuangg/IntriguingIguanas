import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import { shallow, mount } from 'enzyme'
import { Lobby } from 'Lobby'

describe('Lobby', () => {
  var boards = [{boardName: "BOARD 1"}, {boardName: "BOARD 2"}]
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Lobby boards={ boards } />, div);
  })
  it('should render create board input', () => {
    const lobby = renderer.create(<Lobby boards={ boards } />).toJSON();
    expect(lobby).toMatchSnapshot();
  })
})