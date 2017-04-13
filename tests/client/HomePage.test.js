import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import { shallow, mount } from 'enzyme'
import { App } from 'App'

describe('HomePage', () => {
  it('should be able to run tests', () => {
      expect(1 + 2).toEqual(3);
  });

  it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<App />, div);
  });
});