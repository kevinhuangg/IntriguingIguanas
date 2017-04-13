import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import { shallow, mount } from 'enzyme'
import { SignUpPage } from 'SignUpPage'

describe('SignUpPage', () => {
  it('should be able to run tests', () => {
    expect(1 + 2).toEqual(3);
  });
  it('renders without crashing', () => {
	const div = document.createElement('div');
    ReactDOM.render(<SignUpPage />, div);
  });
  it('should render signup input forms', () => {
  	const signupPage = renderer.create(<SignUpPage />).toJSON();
  	expect(signupPage).toMatchSnapshot();

  });
});
