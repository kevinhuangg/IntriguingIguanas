import React from 'react'
import ReactDOM from 'react-dom'
// import { App } from 'App'
import { shallow, mount } from 'enzyme'
import { SignUpPage } from 'SignUpPage'
import renderer from 'react-test-renderer'


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
