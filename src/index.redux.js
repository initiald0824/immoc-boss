import { put, takeEvery, all, delay } from 'redux-saga/effects';

const ADD_WEAPON = 'add weapon';
const REMOVE_WEAPON = 'remove weapon';
const ADD_WEAPON_ASYNC = 'add weapon async';

export function counter(state=10, action) {
  switch(action.type) {
    case ADD_WEAPON:
      return state+1;
    case REMOVE_WEAPON:
      return state-1;
    default:
      return state;
  }
}

export function addWeapon() {
  return {type: ADD_WEAPON};
}

export function removeWeapon() {
  return {type: REMOVE_WEAPON};
}

export function addWeaponAsync() {
  return {type: ADD_WEAPON_ASYNC};
}

export function* addWeaponAsyncMethod() {
  yield delay(1000);
  yield put({type: ADD_WEAPON})
}

export function* watchAddWeaponAsync() {
  yield takeEvery(ADD_WEAPON_ASYNC, addWeaponAsyncMethod);
}

export function* rootSaga() {
  yield all([
    watchAddWeaponAsync()
  ])
}
