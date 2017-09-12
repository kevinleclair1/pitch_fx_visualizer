import { getData } from './helpers.js';
import moment from 'moment';

import parsePitches from '../pitchTest.js';

export const getGamesListByDay = (date) => getData('games', { date: moment(date).format('YYYY-MM-DD') })

export const getPitchersByGame = (gameId) => getData('pitchers', { game_id: gameId });

export const getPitchDataByPitcher = ({ pitcherId, gameId }) => {
  return getData('pitchdata', { game_id: gameId, pitcher_id: pitcherId }).then(parsePitches)
}