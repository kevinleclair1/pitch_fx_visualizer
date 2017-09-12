import { createAction, handleActions, combineActions } from 'redux-actions';

import { assign, getAppState } from './helpers.js';

export const constants = {
  PROXY_SWITCH_CAMERA_VIEW: 'PROXY_SWITCH_CAMERA_VIEW',
  SWITCH_CAMERA_VIEW: 'SWITCH_CAMERA_VIEW',
  SET_CAMERA_VIEWS: 'SET_CAMERA_VIEWS',
  TOGGLE_PITCH_ANIMATION: 'TOGGLE_PITCH_ANIMATION',
  CATCHER_VIEW: 'CATCHER_VIEW',
  PITCHER_VIEW: 'PITCHER_VIEW'
}

export const actions = {
  switchCameraView: createAction(constants.SWITCH_CAMERA_VIEW),
  switchCameraViewProxy: createAction(constants.PROXY_SWITCH_CAMERA_VIEW),
  setViews: createAction(constants.SET_CAMERA_VIEWS),
  togglePitchAnimation: createAction(constants.TOGGLE_PITCH_ANIMATION)
}

export const selectors = {
  getSelectedView: (state) => {
    const views = selectors.getViews(state);
    const selectedViewId = getAppState(state).scene.selectedView

    return views.find((view) => view.id === selectedViewId);
  },
  getViews: (state) => getAppState(state).scene.views,
  isPitchView: (state) => {
    const selectedView = selectors.getSelectedView(state);

    return !!selectedView.isPitch;
  },
  isPitchAnimating: (state) => getAppState(state).scene.isPitchAnimating
}

const baseViews = [
  {
    label: 'Catcher View',
    id: constants.CATCHER_VIEW,
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
    targetPosition: {
      x: 0,
      y: 0.7,
      z: 0.430
    }
  },
  {
    label: 'Pitcher View',
    id: constants.PITCHER_VIEW,
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
    targetPosition: {
      x: 0,
      z: 55 * 0.3048,
      y: 1.6
    }
  }
];

const initialState = {
  selectedView: constants.CATCHER_VIEW,
  views: baseViews,
  isPitchAnimating: false
};

export default handleActions({
  [constants.SWITCH_CAMERA_VIEW]: (state, { payload }) => {
    const { selectedView } = payload;

    return assign(state, { selectedView })
  },
  [constants.SET_CAMERA_VIEWS]: (state, { payload }) => {
    const { views } = payload;

    return assign(state, {
      views: [...baseViews, ...views]
    })
  },
  [constants.TOGGLE_PITCH_ANIMATION]: (state, { payload }) => {
    return assign(state, {
      isPitchAnimating: payload
    })
  }
}, initialState);
