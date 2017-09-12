import React from 'react';
import { Entity } from 'aframe-react';
import { createSelector } from 'reselect';

import createContainer from '../containers/GenericContainer.js';

import {
  selectors as gameDataSelectors
} from '../redux/gameData.js'

const Strikezone = (props) => {
  if (!props.selectedPitch) {
    return null;
  }

  let { sz_top, sz_bot } = props.selectedPitch.pitchSourceData;

  sz_top *= 0.3048
  sz_bot *= 0.3048
  const HEIGHT = 0.01;
  const WIDTH = 1.417 * 0.3048;

  const SIDE_WIDTH = sz_top - sz_bot + (HEIGHT * 2)
  const SIDE_Y = sz_bot + (SIDE_WIDTH / 2) - HEIGHT

  const defaultProps = {
    primitive: 'a-plane',
    height: HEIGHT,
    material: {
      color: 'white',
      side: 'double',
      shader: 'flat'
    }
  };

  return (
    <Entity>
      <Entity
        {...defaultProps}
        key="strikezone_top"
        width={WIDTH}
        position={{
          x: 0,
          z: WIDTH,
          y: sz_top + (HEIGHT / 2)
        }}
      />
      <Entity
        {...defaultProps}
        key="strikezone_bottom"
        width={WIDTH}
        position={{
          x: 0,
          z: WIDTH,
          y: sz_bot - (HEIGHT / 2)
        }}
      />
      <Entity
        {...defaultProps}
        key="strikezone_left"
        width={SIDE_WIDTH}
        position={{
          x: -(WIDTH) / 2 - (HEIGHT / 2),
          z: WIDTH,
          y: SIDE_Y
        }}
        rotation="0 0 -90"
      />
      <Entity
        {...defaultProps}
        key="strikezone_right"
        width={SIDE_WIDTH}
        position={{
          x: WIDTH / 2 + (HEIGHT / 2),
          z: WIDTH,
          y: SIDE_Y
        }}
        rotation="0 0 -90"
      />
    </Entity>
  );
}

export default createContainer({
  mapStateToProps: createSelector(
    gameDataSelectors.getSelectedPitchId,
    gameDataSelectors.getSelectedPitches,
    (pitchId, selectedPitchs) => ({
      selectedPitch: selectedPitchs.find((pitch) => pitch.pitchId === pitchId)
    })
  ),
  Component: Strikezone
});