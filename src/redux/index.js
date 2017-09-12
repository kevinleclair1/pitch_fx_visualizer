import { combineReducers } from 'redux'

import gameData from './gameData.js';
import sidebar from './sidebar.js';
import scene from './scene';

export default combineReducers({
  gameData,
  sidebar,
  scene
})