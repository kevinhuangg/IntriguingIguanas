import axios from 'axios';

//---------USERNAMES-----------
function fetchingUsernames() {
  return {
    type: 'FETCHING_USERS'
  }
}

function usernamesFetched(usernames) {
  return {
    type: 'USERNAMES_FETCHED',
    usernames
  }
}

function fetchUsernamesError(error) {
  return {
    type: 'FETCH_USERNAMES_ERROR',
    error
  }
}

export function fetchUsernames() {
  return (dispatch) => {
    dispatch(fetchingUsernames());
    axios.get('/api/usernames')
    .then(results => {
      dispatch(usernamesFetched(results));
    })
    .catch(error => {
      dispatch(fetchUsernamesError(error));
    })
  }
}