import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const REGISTER = 'REGISTER';

const initState = {
  isAuth: false,
  msg: '',
  user: '',
  pwd: '',
  type: ''
};

export function register(data) {
  return {type: REGISTER, payload: data}
}

function registerSuccess(data) {
  return {type: REGISTER_SUCCESS, payload: data};
}

export function user (state=initState, action) {
  switch(action.type) {
    case REGISTER_SUCCESS:
      return {...state,  msg: '', isAuth: true, ...action.payload};
    case ERROR_MSG:
      return {...state, isAuth: false, msg: action.msg};
    default:
      return state;
  }
}

function errorMsg(msg) {
  return {type: ERROR_MSG, msg: msg};
}

export function* registerAsync({payload}) {
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
    yield put(registerSuccess({user, pwd, type}));
  } else {
    yield put(errorMsg(res.data.msg));
  }
}

export function* watchRegister() {
  yield takeEvery(REGISTER, registerAsync);
}

export const rootSaga = [watchRegister()];
