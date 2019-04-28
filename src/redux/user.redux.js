import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { getRedirectPath } from '../util';

const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const REGISTER = 'REGISTER';
const LOGIN = 'LOGIN';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOAD_DATA = 'LOAD_DATA';

const initState = {
  redirectTo: '',
  isAuth: false,
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

export function loadData(data) {
  return {type: LOAD_DATA, payload: data};
}

function registerSuccess(data) {
  return {type: REGISTER_SUCCESS, payload: data};
}

function loginSuccess(data) {
  return {type: LOGIN_SUCCESS, payload: data};
}

export function user (state=initState, action) {
  switch(action.type) {
    case REGISTER_SUCCESS:
      return {...state,  msg: '', isAuth: true, redirectTo: getRedirectPath(action.payload), ...action.payload};
    case LOGIN_SUCCESS:
      return {...state, msg: '', isAuth: true, redirectTo: getRedirectPath(action.payload), ...action.payload};
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
    yield put(registerSuccess({user, type}));
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
    yield put(loginSuccess({user, type: res.data.data.type}));
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

export const rootSaga = [watchRegister(), watchLogin()];
