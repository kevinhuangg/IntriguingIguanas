import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import { shallow, mount } from 'enzyme'
import { LogInPage } from 'LogInPage'

describe('LogInPage', () => {
  it('should be able to run tests', () => {
	  expect(1 + 2).toEqual(3);
  });
  it('renders without crashing', () => {
	  const div = document.createElement('div');
	  ReactDOM.render(<LogInPage />, div);
  });
  it('should render login input forms', () => {
  	const loginPage = renderer.create(<LogInPage />).toJSON();
  	expect(loginPage).toMatchSnapshot();

  });
});
