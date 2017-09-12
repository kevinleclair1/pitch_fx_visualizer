import React from 'react';

import { createStructuredSelector } from 'reselect';

import {
  selectors as gameDataSelectors
} from '../redux/gameData.js';

import createContainer from '../containers/GenericContainer.js';

const PitchAnimation = (props) => {
  return (
    <a-entity
      obj-model="obj: #baseball-obj; mtl: #baseball-mtl"
      alongpath={`curve: #pitch_${props.curveId}; loop:true; dur:${(Number(props.animationTime) * 10) * 1000}; rotate:true;`}>
    </a-entity>
  );
};

export default createContainer({
  mapStateToProps: createStructuredSelector({
    curveId: gameDataSelectors.getSelectedPitchId,
    animationTime: gameDataSelectors.selectedPitchFinalTime
  }),
  Component: PitchAnimation
});