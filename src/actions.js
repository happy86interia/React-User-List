
const actions = {
  ERR_USER: 'ERR_USER',
  ERR_CHANGE: 'ERR_CHANGE',
  ERR_SHOW: 'ERR_SHOW',
  PUT_FIELDS: 'PUT_FIELDS',
  GET_USERS: 'GET_USERS',
  PUT_USERS: 'PUT_USERS',
  ADD_USER: 'ADD_USER',
  DELETE_USER: 'DELETE_USER',
  getUsers: () => {
    return (dispatch) => {
      dispatch({
        type: actions.GET_USERS
      });
    }
  },
  addUser: (users, nickname, email, ip) => {
    return (dispatch) => {
      dispatch({
        type: actions.ADD_USER,
        users,
        nickname,
        email,
        ip
      });
    }
  },
  deleteUser: (users, email) => {
    return (dispatch) => {
      dispatch({
        type: actions.DELETE_USER,
        users,
        email
      });
    }
  },
  changeError: error => {
    return (dispatch) => {
      dispatch({
        type: actions.ERR_CHANGE,
        error
      });
    }
  }
};

export default actions;
