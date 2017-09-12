import React from 'react';

import PitcherSelectionDrawer from './PitchSelectionDrawer.js'
import MainAppBar from './MainAppBar';

const Menu = (props) => {
  return (
    <div>
      <PitcherSelectionDrawer />
      <MainAppBar />
    </div>
  )
};

export default Menu;
