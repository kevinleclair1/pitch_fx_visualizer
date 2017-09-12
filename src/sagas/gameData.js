import { put, select, takeEvery, call, all } from 'redux-saga/effects';

import { actions, selectors, constants } from '../redux/gameData.js';

import {
  actions as sidebarActions,
  constants as sidebarConstants
} from '../redux/sidebar.js';

import {
  actions as sceneActions,
  selectors as sceneSelectors,
  constants as sceneConstants
} from '../redux/scene.js'

import {
  getGamesListByDay,
  getPitchersByGame,
  getPitchDataByPitcher
} from '../api/gameData.js';

function *setCameraCoordinator({ payload }) {
  yield put(sceneActions.switchCameraView(payload))
  
  const selectedView = yield select(sceneSelectors.getSelectedView);

  if (selectedView.isPitch) {
    const pitchId = selectedView.id;
    yield put(actions.setSelectedPitch({ selectedPitch: pitchId }));
  }
}

function *getSetCameraSaga() {
  yield takeEvery(sceneConstants.PROXY_SWITCH_CAMERA_VIEW, setCameraCoordinator)
};

function *atBatSelectCoordinator({ payload }) {
  const { selectedPitches } = payload;

  const pitchViews = selectedPitches.map((pitch) => {
    return {
      label: `Pitch ${pitch.atBatCount}: ${pitch.pitchResult}`,
      id: pitch.pitchId,
      isPitch: true,
      cameraPosition: {
        x: 0,
        y: 0,
        z: 5
      },
      cameraRotation: {
        x: 0,
        y: 180,
        z: 0
      },
      targetPosition: pitch.finalPosition()
    }
  });

  yield all([
    put(actions.setSelectedAtBat(payload)),
    put(sceneActions.setViews({ views: pitchViews })),
    put(sceneActions.switchCameraView({ selectedView: pitchViews[0].id }))
  ])
}

function *getAtBatSelectionSaga() {
  yield takeEvery(constants.AT_BAT_SELECTED, atBatSelectCoordinator);
}


function *fetchPitchData({ payload }) {
  yield put(actions.setLoading({ loading: true }))

  const pitchData = yield call(getPitchDataByPitcher, {
    pitcherId: payload,
    gameId: yield select(selectors.getSelectedGameId)
  })

  yield all([
    put(actions.setLoading({ loading: false })),
    put(actions.setPitchData({ pitchData })),
    put(sidebarActions.showSelectedTab({ value: sidebarConstants.AT_BAT_TAB }))
  ])
}

function *getPitcherSelectionSaga() {
  yield takeEvery(constants.SET_PITCHER, fetchPitchData)
}

function *fetchPitchersList({ payload }) {
  yield put(actions.setLoading({ loading: true }));

  const pitchers = yield call(getPitchersByGame, payload)

  yield all([
    put(actions.setLoading({ loading: false })),
    put(actions.setPitchersByGame({ pitchers }))
  ])
}

function *getGameSelectionSaga() {
  yield takeEvery(constants.SET_GAME, fetchPitchersList)
}

function *fetchGamesList({ payload }){
  yield put(actions.setLoading({ loading: true }))

  const games = yield call(getGamesListByDay, payload.date);

  yield all([
    put(actions.setLoading({ loading: false })),
    put(actions.setGamesByDate({ games }))
  ])
}

function *getGamesListSaga() {
  yield takeEvery(constants.SET_GAME_DATE, fetchGamesList)
}

export default function *gameDataSaga() {
  yield all([
    getGamesListSaga(),
    getGameSelectionSaga(),
    getPitcherSelectionSaga(),
    getAtBatSelectionSaga(),
    getSetCameraSaga()
  ])
}

