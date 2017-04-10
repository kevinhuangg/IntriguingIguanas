import React from 'react'
import ReactDOM from 'react-dom'
import App from 'App'
import { shallow, mount } from 'enzyme'


describe('App', () => {
    it('should be able to run tests', () => {
        expect(1 + 2).toEqual(3);
    });

    it('should render Hello World!', () => {
    	const app = mount(<App />);
    	const text = <div>Hello World</div>;

 			expect(clock.contains(text)).toEqual(true);
    });
});