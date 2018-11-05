import actions from './actions';

const initState = {
  users: [],
  fields: [],
  error: null
};

export default (state = initState, action) => {
  switch (action.type) {
    case actions.PUT_USERS:
      return Object.assign({}, state, {
        users: [...action.users]
      });
    case actions.PUT_FIELDS:
        return Object.assign({}, state, {
          fields: [...action.fields]
        });
    case actions.PUT_USER:
        return Object.assign({}, state, {
          users: [...action.users]
        });
    case actions.ERR_SHOW:
        return Object.assign({}, state, {
          error: action.error
        });
    default:
      return state;
  }
};
