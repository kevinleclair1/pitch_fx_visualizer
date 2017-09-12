import React from 'react';

import { createSelector } from 'reselect';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import CircularProgress from 'material-ui/CircularProgress';

import moment from 'moment';

import createContainer from '../containers/GenericContainer.js';

import { 
  actions,
  selectors as gameDataSelectors
} from '../redux/gameData.js';

import { selectFieldCb } from './helpers.js';

const center = {
  padding: '0 16px'
}

const GameDatePicker = createContainer({
  actions: {
    onChange: actions.setDate
  },
  mapStateToProps: (state) => {
    return {
      hintText: "Choose a Game Date",
      style: center,
      value: gameDataSelectors.getGameDate(state),
      maxDate: moment().subtract(1, 'days').toDate()
    }
  },
  Component: (props) => (
    <DatePicker
      {...props}
      onChange={(ev, date) => props.onChange({ date })}
    />
  )
})

const GameSelectionFieldComponent = (props) => (
  <div
    style={center}
  >
    <SelectField
      value={props.value}
      disabled={props.disabled}
      floatingLabelText={props.floatingLabelText}
      onChange={selectFieldCb(props.onChange)}
      fullWidth={true}
    >
      {props.games.map((game) => (
        <MenuItem
          key={game.gameday_link}
          value={game.gameday_link}
          primaryText={`${game.home_team_name} vs. ${game.away_team_name}`}
        />
      ))}
    </SelectField>
  </div>
);

const GameSelectionField = createContainer({
  actions: {
    onChange: actions.setGame
  },
  mapStateToProps: createSelector(
    gameDataSelectors.getSelectedGameId,
    gameDataSelectors.getGames,
    (gameId, games) => ({
      value: gameId,
      floatingLabelText: 'Select a Game',
      disabled: !games.length,
      games: games
    })
  ),
  Component: GameSelectionFieldComponent
});

const PitcherSelectionFieldComponent = (props) => (
  <div
    style={center}
  >
    <SelectField
      value={props.value}
      disabled={props.disabled}
      floatingLabelText={props.floatingLabelText}
      onChange={selectFieldCb(props.onChange)}
      fullWidth={true}
    >
      {props.pitchers.map((pitcher) => (
        <MenuItem
          key={pitcher.id}
          value={pitcher.id}
          primaryText={`${pitcher.name_display_first_last} (${pitcher.teamName})`}
        />
      ))}
    </SelectField>
  </div>
)

const PitcherSelectionField = createContainer({
  actions: {
    onChange: actions.setPitcher
  },
  mapStateToProps: createSelector(
    gameDataSelectors.getSelectedPitcher,
    gameDataSelectors.getPitchers,
    (selectedPitcher, pitchers) => ({
      value: selectedPitcher,
      floatingLabelText: 'Select a Pitcher',
      disabled: !pitchers.length,
      pitchers: pitchers
    })
  ),
  Component: PitcherSelectionFieldComponent
});

const getLoader = () => (
  <div
    style={center}
  >
    <CircularProgress />
  </div>
)

const PitcherSelectionComponent = (props) => {
  return (
    <div style={{ padding: '16px 0' }}>
      <GameDatePicker />
      <GameSelectionField />
      <PitcherSelectionField />
      {props.loading ? getLoader() : null}
    </div>
  )
}

export default createContainer({
  mapStateToProps: createSelector(
    gameDataSelectors.getLoadingState,
    (loading) => ({ loading })
  ),
  Component: PitcherSelectionComponent
})
