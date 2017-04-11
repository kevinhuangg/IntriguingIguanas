import axios from 'axios'

// ---------- CREATE ----------
function listCreated() {
  return {
    type: 'LIST_CREATED'
  }
}

function listError(error) {
  return {
    type: 'ERROR',
    error
  }
}

export createList = () => {
  return (dispatch) => {
    axios.post('/list/create', { listName })
    .then(data => dispatch(listCreated()))
    .catch(error => dispath(listError(error)))
  }
}

export default List