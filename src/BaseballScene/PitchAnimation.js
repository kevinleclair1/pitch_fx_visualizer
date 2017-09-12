import React from 'react';

import { createStructuredSelector } from 'reselect';

import {
  selectors as gameDataSelectors
} from '../redux/gameData.js';

import createContainer from '../containers/GenericContainer.js';

const PitchAnimation = (props) => {
  return (
    <a-box color="#ff0000" width="0.1" height="0.3" depth="0.1"
      alongpath={`curve: #pitch_${props.curveId}; loop:true; dur:${Number(props.animationTime) * 10}; rotate:true;`}>
    </a-box>
  );
};

export default createContainer({
  mapStateToProps: createStructuredSelector({
    curveId: gameDataSelectors.getSelectedPitchId,
    animationTime: gameDataSelectors.selectedPitchFinalTime
  }),
  Component: PitchAnimation
});