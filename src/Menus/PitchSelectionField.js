import React from 'react';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import { createSelector } from 'reselect';

import {
  actions as gameDataActions,
  selectors as gameDataSelectors
} from '../redux/gameData.js';

import createContainer from '../containers/GenericContainer.js';

const PitchSelectField = (props) => (
  <DropDownMenu
    value={props.selectedPitchId}
    onChange={(ev, index, val) => props.handlePitchSelection(val)}
    underlineStyle={{display: 'none'}}
  >
    {props.pitches.map((pitch) => (
      <MenuItem
        value={pitch.id}
        key={pitch.id}
        primaryText={pitch.label}
      />
    ))}
  </DropDownMenu>
);

const PitchSelectFieldContainer = createContainer({
  mapStateToProps: createSelector(
    gameDataSelectors.getSelectedPitches,
    gameDataSelectors.getSelectedPitchId,
    (pitches, selectedPitchId) => ({
      pitches: pitches.map((pitch) => ({
        label: `${pitch.atBatCount}: ${pitch.pitchResult}`,
        id: pitch.pitchId
      })),
      selectedPitchId
    })
  ),
  actions: {
    handlePitchSelection: (selectedPitch) => gameDataActions.setSelectedPitch({ selectedPitch })
  },
  Component: PitchSelectField
});

export default PitchSelectFieldContainer