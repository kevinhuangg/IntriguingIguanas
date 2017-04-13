import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import { shallow, mount } from 'enzyme'
import { BoardPage } from 'BoardPage'
// import { List } from 'List'
// import { Task } from 'Task'

import List from '../../client/src/components/List.jsx'
import Task from '../../client/src/components/Task.jsx'

import TestUtils from 'react-addons-test-utils'
import { fromJS } from 'immutable'

const dummy = {
  id: 1,
  boardname: 'INCONCEIVABLE IGUANAS',
  lists: [
    {
      id: 1,
      listname: 'CURRENT SPRINT',
      board_id: 1,
      tasks: [
        {
          id: 1,
          text: 'Set up database',
          list_id: 1,
          assigned: 'Enoch'
        },
        {
          id: 2,
          text: 'Build front-end!',
          list_id: 1,
          assigned: 'Christine'
        }
      ]
    },
    {
      id: 2,
      listname: 'FOR REVIEW',
      board_id: 1,
      tasks: [
        {
          id: 3,
          text: 'Passport authentication',
          list_id: 2,
          assigned: 'Kevin'
        }
      ]
    }
  ]
}

describe('BoardPage', () => {
  it('should render 2 List components', () => {
    const wrapper = shallow(
      <BoardPage
        lists={ dummy.lists }
      />)
    expect(wrapper.find(List).length).toBe(2)
  })

  // ----------- QUESTIONS -----------
  // it('should render 2 Task components', () => {
  //   const wrapper = shallow(
  //     <List
  //       tasks={ dummy.lists[0].tasks }
  //     />)
  //   expect(wrapper.find(Task).length).toBe(2)
  // })
})
