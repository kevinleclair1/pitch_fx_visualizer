import React from 'react';
import { Entity } from 'aframe-react';

const Curve = (props) => {
  return (
    <Entity
      curve
      id={`pitch_${props.id}`}
    >
      {props.trajectory.map((data, i) => {
        return (
          <Entity
            curve-point
            position={{
              x: data.x,
              y: data.y,
              z: data.z
            }}
            key={`curve_point_${i}_${props.id}`}
          />
        );
      })}
    </Entity>
  )
}

export default (pitches) => pitches.map((pitch) => <Curve {...pitch} key={pitch.id}/>);

