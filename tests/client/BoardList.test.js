import React from 'react'
import ReactDOM from 'react-dom'
import { App } from 'App'
import { shallow, mount } from 'enzyme'
import { LogInPage } from 'LogInPage'
import renderer from 'react-test-renderer'

describe('BoardListPage', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BoardListPage />, div);
  });
  it('should render create board input', () => {
    const boardListPage = renderer.create(<BoardListPage />).toJSON();
    expect(boardListPage).toMatchSnapshot();
  })
})