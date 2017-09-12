import React from 'react';
import PropTypes from 'prop-types';

import { ToolbarGroup } from 'material-ui/Toolbar';
import Toggle from 'material-ui/Toggle';

import createContainer from '../containers/GenericContainer.js';

import { createStructuredSelector } from 'reselect';

import {
  selectors as sceneSelectors,
  actions as sceneActions
} from '../redux/scene.js';

const toggleLabelStyle = {
  color: 'white'
};

const PitchToolBar = ({ onToggleClick, toggled }) => {
  const toggleClicked = (event, isInputChecked) => onToggleClick(isInputChecked)

  return (
    <ToolbarGroup>
      <Toggle
        label={'Animate Pitch'}
        toggled={toggled}
        onToggle={toggleClicked}
        labelStyle={toggleLabelStyle}
      />  
    </ToolbarGroup>
  );
};

PitchToolBar.propTypes = {
  onToggleClick: PropTypes.func.isRequired,
  toggled: PropTypes.bool.isRequired
};

export default createContainer({
  actions: {
    onToggleClick: sceneActions.togglePitchAnimation
  },
  mapStateToProps: createStructuredSelector({
    toggled: sceneSelectors.isPitchAnimating
  }),
  Component: PitchToolBar
});
