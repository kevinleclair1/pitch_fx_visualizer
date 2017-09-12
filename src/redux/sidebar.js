import { createAction, handleActions } from 'redux-actions';

import { assign, getAppState } from './helpers.js';

export const constants = {
  SHOW_SELECTED_TAB: 'SHOW_SELECTED_TAB',
  AT_BAT_TAB: 'AT_BAT_TAB',
  PITCH_SELECTION_TAB: 'PITCH_SELECTION_TAB',
  TOGGLE_SIDE_BAR: 'TOGGLE_SIDE_BAR'
}

export const actions = {
  showSelectedTab: createAction(constants.SHOW_SELECTED_TAB),
  toggleSideBar: createAction(constants.TOGGLE_SIDE_BAR)
};

const initialState = {
  selectedTab: constants.PITCH_SELECTION_TAB,
  sidebarOpen: false
};

export const selectors = {
  getSelectedTab: (state) => getAppState(state).sidebar.selectedTab,
  sidebarOpen: (state) => getAppState(state).sidebar.sidebarOpen
};

const localSelectors = {
  getSidebarOpenState: (state) => state.sidebarOpen
};

export default handleActions({
  [constants.SHOW_SELECTED_TAB]: (state, { payload }) => {
    const { value } = payload;
    return assign(state, {
      selectedTab: value
    });
  },
  [constants.TOGGLE_SIDE_BAR]: (state) => {
    const sidebarState = localSelectors.getSidebarOpenState(state);

    return assign(state, {
      sidebarOpen: !sidebarState
    });
  }
}, initialState)