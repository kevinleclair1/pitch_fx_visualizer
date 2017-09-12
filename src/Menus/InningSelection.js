import React from 'react';

import { createSelector } from 'reselect'

import { List, ListItem } from 'material-ui/List';

import createContainer from '../containers/GenericContainer.js';

import { actions, selectors } from '../redux/gameData.js';

import groupBy from 'lodash/groupBy';

class InningSelection extends React.Component {
  
  renderInningListItems = () => {
    const pitches = this.props.groupedPitches;

    return Object.keys(pitches).map((key) => {
      return (
        <ListItem
          key={key}
          primaryText={`Inning: ${key}`}
          nestedItems={this.getAtBatItems(key)}
          primaryTogglesNestedList={true}
        />
      )
    })
  }

  getAtBatItems(inning){

    const atBats = groupBy(this.props.groupedPitches[inning], 'atBatId');

    return Object.keys(atBats).map((key) => {
      const atBatFirst = atBats[key][0];
      const batterName = atBatFirst.batterName;
      const pitchOutcome = atBatFirst.pitchOutcome;

      return (
        <ListItem
          key={key}
          primaryText={`vs ${batterName} (${pitchOutcome})`}
          onClick={() => this.props.onAtBatSelect({ selectedPitches: atBats[key] })}
        />
      )
    })
  }

  render(){
    if (Object.keys(this.props.groupedPitches).length) {
      return (
        <List>
          {this.renderInningListItems()}
        </List>
      )
    }

    return null;
  }
}

export default createContainer({
  actions: {
    onAtBatSelect: actions.atBatSelected
  },
  mapStateToProps: createSelector(
    state => selectors.getPitchData(state),
    pitchData => ({
      groupedPitches: groupBy(pitchData, 'inning')
    })
  ),
  Component: InningSelection
})