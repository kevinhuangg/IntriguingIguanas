import React from 'react';
import ListEntry from './ListEntry.jsx';
import { connect } from 'react-redux';

const List = (props) => {
  // console.log('tag1', props)
  return (
  	<div>
      {props.list.map(entry => {
      	return <ListEntry entry={entry}/>
      })}
  	</div>
  )
}

const mapStateToProps = (state) => {
  // console.log('tag', state)
  return {
    ...state,
  	list: state.list.list
  }
}


export default connect(mapStateToProps)(List)
