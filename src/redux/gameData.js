import { createAction, handleActions, combineActions } from 'redux-actions';

import { assign, getAppState } from './helpers.js';

// ACTION TYPES
export const constants = {
  LOADING_GAMES: 'LOADING_GAMES',
  SET_GAME_DATE: 'SET_GAME_DATE',
  SET_GAMES_FROM_DATE: 'SET_GAMES_FROM_DATE',
  SET_GAME: 'SET_GAME',
  SET_PITCHERS_BY_GAME: 'SET_PITCHERS_BY_GAME',
  SET_PITCHER: 'SET_PITCHER',
  SET_PITCH_DATA: 'SET_PITCH_DATA',
  SET_SELECTED_PITCH: 'SET_SELECTED_PITCH',
  SET_SELECTED_AT_BAT: 'SET_SELECTED_AT_BAT',
  AT_BAT_SELECTED: 'AT_BAT_SELECTED'
}

// ACTIONS
export const actions = {
  setLoading: createAction(constants.LOADING_GAMES),
  setDate: createAction(constants.SET_GAME_DATE),
  setGamesByDate: createAction(constants.SET_GAMES_FROM_DATE),
  setGame: createAction(constants.SET_GAME),
  setPitchersByGame: createAction(constants.SET_PITCHERS_BY_GAME),
  setPitcher: createAction(constants.SET_PITCHER),
  setPitchData: createAction(constants.SET_PITCH_DATA),
  setSelectedPitch: createAction(constants.SET_SELECTED_PITCH),
  setSelectedAtBat: createAction(constants.SET_SELECTED_AT_BAT),
  atBatSelected: createAction(constants.AT_BAT_SELECTED)
}

// INITIAL STATE
const initialState = {
  games: [],
  loading: false,
  date: null,
  selectedGame: null,
  selectedPitcher: null,
  pitchers: [],
  pitchData: [],
  selectedPitch: null,
  selectedPitches: []
};

// SELECTORS
export const selectors = {
  getSelectedGameId: (state) => getAppState(state).gameData.selectedGame,
  getGameDate: (state) => getAppState(state).gameData.date,
  getPitchData: (state) => getAppState(state).gameData.pitchData,
  getSelectedPitches: (state) => getAppState(state).gameData.selectedPitches,
  getSelectedPitchId: (state) => getAppState(state).gameData.selectedPitch,
  getGames: (state) => getAppState(state).gameData.games,
  getSelectedPitcher: (state) => getAppState(state).gameData.selectedPitcher,
  getPitchers: (state) => getAppState(state).gameData.pitchers,
  getLoadingState: (state) => getAppState(state).gameData.loading,
  hasSelectedPitch: (state) => !!getAppState(state).gameData.selectedPitch,
  selectedPitchObj: (state) => {
    const parsedState = getAppState(state);

    const selectedPitchId = parsedState.gameData.selectedPitch;

    if (!selectedPitchId) {
      return null
    }

    const selectedPitches = parsedState.gameData.selectedPitches;

    return selectedPitches.find((pitch) => pitch.pitchId === selectedPitchId)
  },
  selectedPitchFinalPosition: (state) => {
    return selectors.selectedPitchObj(state).finalPosition();
  },
  selectedPitchFinalTime: (state) => {
    return selectors.selectedPitchObj(state).finalTime
  }
}

const localSelections = {
  getGamesList: (state) => state.games,
  getPitcherList: (state) => state.pitchers,
}

// REDUCER

export default handleActions({
  [constants.SET_GAME]: (state, { payload }) => {
    const gamesList = localSelections.getGamesList(state)
    return assign(state, { 
      selectedGame: gamesList.find((game) => game.gameday_link === payload).gameday_link
    })
  },
  [constants.SET_PITCHER]: (state, { payload }) => {
    const pitcherList = localSelections.getPitcherList(state)
    return assign(state, {
      selectedPitcher: pitcherList.find((pitcher) => pitcher.id === payload).id
    })
  },
  [constants.SET_GAME_DATE]: (state, { payload }) => {
    return assign(state, { date: payload.date })
  },
  [constants.SET_SELECTED_AT_BAT]: (state, { payload }) => {
    const { selectedPitches } = payload;
    return assign(state, { 
      selectedPitches,
      selectedPitch: selectedPitches[0].pitchId
    })
  },
  [combineActions(
    constants.LOADING_GAMES,
    constants.SET_GAMES_FROM_DATE,
    constants.SET_PITCHERS_BY_GAME,
    constants.SET_PITCH_DATA,
    constants.SET_SELECTED_PITCH,
  )]: (state, { payload = {} }) => {
    return Object.assign(
      {},
      state,
      payload
    )
  }
}, initialState)