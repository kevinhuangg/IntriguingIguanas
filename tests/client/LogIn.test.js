import React from 'react'
import ReactDOM from 'react-dom'
import { App } from 'App'
import { shallow, mount } from 'enzyme'
import { LogInPage } from 'LogInPage'
import renderer from 'react-test-renderer'


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
