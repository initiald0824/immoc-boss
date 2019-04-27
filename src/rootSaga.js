import { all } from 'redux-saga/effects';
import { rootSaga as userSaga } from './redux/user.redux';

export function* rootSaga() {
  yield all([...userSaga])
}
