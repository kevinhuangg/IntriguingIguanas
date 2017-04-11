import React from 'react'
import ReactDOM from 'react-dom'
import { App } from 'App'
import { shallow, mount } from 'enzyme'
import HomePage from 'HomePage'


describe('HomePage', () => {
    it('should be able to run tests', () => {
        expect(1 + 2).toEqual(3);
    });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
    });

    it('should render Hello World!', () => {
      const app = mount(<App />);
      const text = <div>HELLO WORLD!</div>;

      expect(app.contains(text)).toEqual(true);
    });
});