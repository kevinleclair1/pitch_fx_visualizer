import { all } from 'redux-saga/effects';

import gameDataSagas from './gameData';

export default function *rootSaga() {
  yield all([
    gameDataSagas()
  ]);
}