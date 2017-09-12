import React from 'react';
import { Entity } from 'aframe-react';
import { createSelector } from 'reselect';
import last from 'lodash/last';

import {
  blueA700,
  redA700,
  greenA700,
  white
} from 'material-ui/styles/colors.js'

import {
  selectors as gameDataSelectors,
  actions as gameDataActions
} from '../redux/gameData.js';

import createContainer from '../containers/GenericContainer.js';

const markerFill = (pitchType) => {
  const switchObj = {
    'B': greenA700,
    'S': redA700,
    'X': blueA700
  }

  return switchObj[pitchType];
}

const PitchMarkers = (props) => {
  if (!props.pitches.length) {
    return null;
  }

  return (
    <Entity>
      {props.pitches.map((pitch, i) => {
        const final = last(pitch.trajectory);
        
        return (
          <Entity
            position={final}
            key={pitch.pitchId}
          >
            <Entity
              geometry={{
                primitive: 'cylinder',
                radius: '0.05',
                height: `0.00${i + 1}`
              }}
              material={{
                color: markerFill(pitch.pitchTypeId),
                side: 'double',
                shader: 'flat',
                opacity: 0.9
              }}
              rotation='-90 0 0'
            />
            <Entity 
              geometry={{
                primitive: 'ring',
                radiusInner: '0.05',
                radiusOuter: '0.055',
              }}
              material={{
                color: white,
                side: 'double',
                shader: 'flat',
              }}
            />
            <Entity
              text={{
                value: `${i + 1}`,
                align: 'center',
              }}
              position={{
                x: 0,
                y: 0,
                z: `0.00${i + 1}`
              }}
            />
            <Entity
              text={{
                value: `${i + 1}`,
                align: 'center',
              }}
              position={{
                x: 0,
                y: 0,
                z: `-0.00${i + 1}`
              }}
              rotation={{
                x: 0,
                y: 180,
                z: 0
              }}
            />
          </Entity>
        )
      })}
    </Entity>
  )
}

export default createContainer({
  mapStateToProps: createSelector(
    gameDataSelectors.getSelectedPitches,
    (pitches) => ({ pitches })
  ),
  Component: PitchMarkers
})