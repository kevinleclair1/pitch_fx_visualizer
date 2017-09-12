import React from 'react';
import { createSelector } from 'reselect';

import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import SwitchCamera from 'material-ui/svg-icons/image/switch-camera';
import MenuItem from 'material-ui/MenuItem';
import { white } from 'material-ui/styles/colors.js';

import {
  selectors as sceneSelectors,
  actions as sceneActions
} from '../redux/scene';

import createContainer from '../containers/GenericContainer.js';



const CameraAngleMenu = (props) => {
  return (
    <IconMenu
      iconButtonElement={
        <IconButton iconStyle={{ color: white }}>
          <SwitchCamera />
        </IconButton>
      }
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      targetOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
     {props.views.map((view) => {
       return (
         <MenuItem
          primaryText={view.label}
          key={view.id}
          onClick={() => props.switchCameraView({ selectedView: view.id })}
          checked={props.selectedView === view.id}
         />
       )
     })}
    </IconMenu>
  )
}

const CameraAngleMenuContainer = createContainer({
  actions: {
    switchCameraView: sceneActions.switchCameraViewProxy
  },
  mapStateToProps: createSelector(
    sceneSelectors.getSelectedView,
    sceneSelectors.getViews,
    (selectedView, views) => ({
      selectedView: selectedView.id,
      views
    })
  ),
  Component: CameraAngleMenu
})

export default CameraAngleMenuContainer