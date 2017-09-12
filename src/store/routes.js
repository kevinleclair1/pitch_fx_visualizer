import { routerForBrowser } from 'redux-little-router';

const routes = {
  '/': {
    title: 'Home'
  },
  '/pitch/:gameId/:pitcherId/:inningNum': {
    title: 'Pitch'
  }
}

export default routerForBrowser({
  routes
})