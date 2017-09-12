import React from 'react';
import { createSelector } from 'reselect'

import { Tabs, Tab } from 'material-ui/Tabs';
import Drawer from 'material-ui/Drawer';

import createContainer from '../containers/GenericContainer.js';

import InningSelection from './InningSelection.js';
import PitcherSelection from './PitcherSelection.js';

import { 
  constants as sidebarConstants,
  actions as sidebarActions,
  selectors as sidebarSelectors
} from '../redux/sidebar.js';

import { selectors as gameDataSelectors } from '../redux/gameData'

const getInningSelectTab = (showTab, onChange) => {
  if (!showTab) {
    return null;
  }

  return (
    <Tab
      label={'Select At-Bat'}
      value={sidebarConstants.AT_BAT_TAB}
    >
      <InningSelection />
    </Tab>
  )
}

const gePitchSelectionTab = (onChange) => {
  return (
    <Tab
      label={'Select Game'}
      value={sidebarConstants.PITCH_SELECTION_TAB}
    >
      <PitcherSelection />
    </Tab>
  )
}

const PitcherSelectionDrawerComponent = (props) => {
  const menuToggle = () => props.menuToggle();

  return (
    <Drawer
      open={props.menuOpen}
      docked={false}
      width={300}
      onRequestChange={menuToggle}
    >
      <Tabs
        onChange={(value) => props.handleTabChange({ value })}
        value={props.selectedTab}
      >
        {gePitchSelectionTab(props.selectPitcherTab)}
        {getInningSelectTab(props.showInningSelect, props.showAtBatTab)}
      </Tabs>
    </Drawer>
  );
};

const PitcherSelectionDrawer = createContainer({
  mapStateToProps: createSelector(
    gameDataSelectors.getPitchData,
    sidebarSelectors.getSelectedTab,
    sidebarSelectors.sidebarOpen,
    (pitchData, selectedTab, menuOpen) => ({
      showInningSelect: !!pitchData.length,
      selectedTab,
      menuOpen
    })
  ),
  actions: {
    handleTabChange: sidebarActions.showSelectedTab,
    menuToggle: sidebarActions.toggleSideBar
  },
  Component: PitcherSelectionDrawerComponent
})

export default PitcherSelectionDrawer;