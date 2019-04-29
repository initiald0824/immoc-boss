import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { getRedirectPath } from '../util';

const ERROR_MSG = 'ERROR_MSG';
const REGISTER = 'REGISTER';
const LOGIN = 'LOGIN';
const LOAD_DATA = 'LOAD_DATA';
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const UPDATE = 'UPDATE';

const initState = {
  redirectTo: '',
  msg: '',
  user: '',
  type: ''
};

export function register(data) {
  return {type: REGISTER, payload: data}
}

export function login(data) {
  return {type: LOGIN, payload: data};
}

export function update(data) {
  return {type: UPDATE, payload: data};
}

export function loadData(data) {
  return {type: LOAD_DATA, payload: data};
}

function authSuccess(data) {
  return {type: AUTH_SUCCESS, payload: data};
}

export function user (state=initState, action) {
  switch(action.type) {
    case AUTH_SUCCESS:
      return {...state,  msg: '', redirectTo: getRedirectPath(action.payload), ...action.payload};
    case ERROR_MSG:
      return {...state, isAuth: false, msg: action.msg};
    case LOAD_DATA:
      return {...state, ...action.payload};
    default:
      return state;
  }
}

function errorMsg(msg) {
  return {type: ERROR_MSG, msg: msg};
}

function* registerAsync({payload}) {
  const { user, type, pwd, repeatPwd } = payload;
  if (!user || !pwd || !type) {
    yield put(errorMsg('用户名密码必须输入!'));
    return;
  }
  if (pwd !== repeatPwd) {
    yield put(errorMsg('密码和确认密码不同!'));
    return;
  }

  const res = yield call(axios.post,  '/user/register', {user, pwd, type});
  if (res.status === 200 && res.data.code === 0) {
    yield put(authSuccess({user, type}));
  } else {
    yield put(errorMsg(res.data.msg));
  }
}

function* loginAsync({payload}) {
  const { user, pwd } = payload;
  if (!user || !pwd) {
    yield put(errorMsg('用户名和密码必须输入!'));
    return;
  }
  const res = yield call(axios.post, '/user/login', {user, pwd});
  if (res.status === 200 && res.data.code === 0) {
    yield put(authSuccess({user, type: res.data.data.type}));
  } else {
    yield put(errorMsg(res.data.msg));
  }
}

export function* watchRegister() {
  yield takeEvery(REGISTER, registerAsync);
}

export function* watchLogin() {
  yield takeEvery(LOGIN, loginAsync);
}

export function* watchUpdate() {
  yield takeEvery(UPDATE, updateAsync);
}

export function* updateAsync(data) {
  const res = yield call(axios.post, '/user/update', data);
  if (res.status === 200 && res.data.code === 0) {
    yield put(authSuccess(res.data.data));
  } else {
    yield put(errorMsg(res.data.msg));
  }
}

export const rootSaga = [watchRegister(), watchLogin(), watchUpdate()];
