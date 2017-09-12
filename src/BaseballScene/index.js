import 'aframe';
import 'aframe-animation-component';
import 'aframe-curve-component';
import 'aframe-alongpath-component';
import 'aframe-mouse-cursor-component'

import 'aframe-extras';

import 'aframe-orbit-controls-component-2'
import 'babel-polyfill';

import { Entity, Scene } from 'aframe-react';
import React from 'react';
import { createStructuredSelector } from 'reselect';

import Camera from './Camera.js';
import PitchMarkers from './PitchMarkers.js';
import getCurves from './getCurves.js';
import Strikezone from './Strikezone.js';
import getCurveLines from './getCurveLines.js';

import createContainer from '../containers/GenericContainer.js';

import PitchAnimation from './PitchAnimation.js';

import { selectors as sceneSelectors } from '../redux/scene.js';

import { 
  selectors as gameDataSelectors
} from '../redux/gameData.js'

const BaseballSceneComponent = (props) => {
  const getPitchAnimation = () => props.isPitchAnimating ? <PitchAnimation /> : null

  return (
    <Scene
      inspector
      vr-mode-ui={{
        enabled: false
      }}
    >
      <a-assets>
        <img id="groundTexture" src="grass.jpg" />
        <a-asset-item id="baseball-obj" src="baseball.obj"></a-asset-item>
        <a-asset-item id="baseball-mtl" src="baseball.mtl"></a-asset-item>

        <a-asset-item id="stadium" src="bbb/model.dae"></a-asset-item>
      </a-assets>

      <Camera />

      {props.pitchData.length ? getCurves(props.pitchData) : null}

      {props.pitchData.length ? getCurveLines(props.pitchData, props.onCurveClick) : null}

      {getPitchAnimation()}

      <Strikezone />

      <PitchMarkers />

      <Entity
        primitive="a-sky"
        color="#000"
      />

      <Entity 
        collada-model='#stadium'
        position="70.104 0 0"
        rotation="0 -180 0"
      />

    </Scene>
  );
}

const BaseballScene = createContainer({
  mapStateToProps: createStructuredSelector({
    selectedView: sceneSelectors.getSelectedView,
    pitchData: gameDataSelectors.getSelectedPitches,
    isPitchAnimating: sceneSelectors.isPitchAnimating
  }),
  Component: BaseballSceneComponent
})

export default BaseballScene;