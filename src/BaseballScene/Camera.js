import React from 'react';
import { Entity } from 'aframe-react';
import { createSelector } from 'reselect';

import { 
  selectors as sceneSelectors
} from '../redux/scene';

import createContainer from '../containers/GenericContainer.js';

const OrbitTargetComponent = (props) => (
  <Entity
    id='orbitTarget'
    position={props.position}
  />
);

const OrbitTargetContainer = createContainer({
  mapStateToProps: createSelector(
    sceneSelectors.getSelectedView,
    (selectedView) => ({
      position: selectedView.targetPosition
    })
  ),
  Component: OrbitTargetComponent
})

const Camera = (props) => (
  <Entity
    primitive="a-camera"
    orbit-controls={{
      target: '#orbitTarget',
      autoRotate: false,
      disablePan: true
    }}
    rotation={props.rotation}
    position={props.position}
    wasd-controls-enabled={false}
    look-controls-enabled={false}
    mouse-cursor
  />
)

const CameraContainer = createContainer({
  mapStateToProps: createSelector(
    sceneSelectors.getSelectedView,
    (selectedView) => ({
      position: selectedView.cameraPosition,
      rotation: selectedView.cameraRotation
    })
  ),
  Component: Camera
})

const CameraWrapper = () => {
  return (
    <Entity>
      <OrbitTargetContainer />
      <CameraContainer />
    </Entity>
  )
};

export default CameraWrapper