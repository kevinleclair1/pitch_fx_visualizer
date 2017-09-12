import React from 'react';

import { connect } from 'react-redux';

const getComponent = (Component) => (props) => {
  return (
    <Component 
      {...props}
    />
  )
}

export default ({
  mapStateToProps,
  actions = {},
  Component
}) => connect(
  mapStateToProps,
  actions
)(getComponent(Component))