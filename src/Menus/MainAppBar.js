import React from 'react';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';

import { createSelector } from 'reselect';

import createContainer from '../containers/GenericContainer.js';

import { actions as sidebarActions } from '../redux/sidebar.js';

import { selectors as sceneSelectors } from '../redux/scene.js';

import CameraAngleMenuContainer from './CameraAngleMenu.js';
import PitchToolBar from './PitchToolBar.js';

import { menuBarStyles } from './sharedStyles.js';

const menuIconStyle = {
  color: 'white',
  cursor: 'pointer'
};

const toolbarGroupFirstChildStyles = {
  marginLeft: 0
};

const MainAppBar = (props) => {
  const menuToggle = () => props.menuToggle();

  const getPitchToolBar = () => props.isPitch ? <PitchToolBar /> : null;

  return (
    <Toolbar 
      style={menuBarStyles}
    >
      <ToolbarGroup 
        firstChild={true}
        style={toolbarGroupFirstChildStyles}
      >
        <MenuIcon
          onTouchTap={menuToggle}
          style={menuIconStyle}
        />
      </ToolbarGroup>

      {getPitchToolBar()}  

      <ToolbarGroup>
        <CameraAngleMenuContainer />
      </ToolbarGroup>
    </Toolbar> 
  );
};

export default createContainer({
  actions: {
    menuToggle: sidebarActions.toggleSideBar
  },
  mapStateToProps: createSelector(
    sceneSelectors.isPitchView,
    (isPitch) => ({ isPitch })
  ),
  Component: MainAppBar
});