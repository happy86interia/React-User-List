import { all, takeEvery, fork, call, put } from 'redux-saga/effects';
import actions from './actions';
import {
  getUsersReq,
  getFieldsReq
} from "./service";

export function* getUsers() {
  yield takeEvery(actions.GET_USERS, function*() {
    try {
      const users = yield call(getUsersReq);
      const fields = yield call(getFieldsReq);
      yield put({ type: actions.PUT_USERS, users });
      yield put({ type: actions.PUT_FIELDS, fields });
    } catch (error) {
      console.error('getUsers error: ', error);
    }
  });
}

export function* addUser() {
  yield takeEvery(actions.ADD_USER, function*({ users, nickname, email, ip }) {
    try {
      const index = users.indexOf(users.find(user => user.email === email));
      if (index === -1) {
        users.push({ nickname, email, ip });
        yield put({ type: actions.PUT_USERS, users });
      } else {
        yield put({ type: actions.ERR_SHOW, error: 'User with this email already exists.' });
      }
    } catch (error) {
      console.error('addUser error: ', error);
    }
  });
}

export function* deleteUser() {
  yield takeEvery(actions.DELETE_USER, function*({ users, email }) {
    try {
      const index = users.indexOf(users.find(user => user.email === email));
      if (index !== -1) {
        users.splice(index, 1);
      } else if ( users.length === 1 ) {
        users = [];
      }
      yield put({ type: actions.PUT_USERS, users });
    } catch (error) {
      console.error('deleteUser error: ', error);
    }
  });
}

export function* changeError() {
  yield takeEvery(actions.ERR_CHANGE, function*({ error }) {
    try {
      yield put({ type: actions.ERR_SHOW, error });
    } catch (error) {
      console.error('checkErrors error: ', error);
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(getUsers),
    fork(addUser),
    fork(deleteUser),
    fork(changeError)
  ]);
}
