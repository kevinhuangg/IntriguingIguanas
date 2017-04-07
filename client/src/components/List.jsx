import React from 'react';
import ListEntry from './ListEntry.jsx';
import { connect } from 'react-redux';

const List = (props) => {
  // console.log('tag1', props)
  return (
  	<div>
      { props.list.map((entry, index) => (
          <ListEntry 
            entry={ entry } 
            index={ index }
          />
      )) }
  	</div>
  )
}

const mapStateToProps = (state) => {
  console.log('tag123', state)
  return {
  	list: state.list.list
  }
}


export default connect(mapStateToProps)(List)
