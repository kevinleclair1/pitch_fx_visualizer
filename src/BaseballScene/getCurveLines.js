import React from 'react';
import { Entity } from 'aframe-react';

const curveColorMapping = {
  FA: '#BA0001',
  FF: '#BC0021',
  FT: '#BB0045',
  FC: '#980065',
  SL: '#0000FE',
  CH: '#0055FE',
  CB: '#0022FF',
  CU: '#0022FF',
  KN: '#0177FF'
}

const getCurveLines = (pitchData) => pitchData.map((pitch) => {
  return (
    <Entity
      key={`draw_curve_${pitch.id}`}
      primitive='a-draw-curve'
      curveref={`#pitch_${pitch.id}`}
      material={{
        shader: "line",
        color: curveColorMapping[pitch.source.mlbam_pitch_name]
      }}
    />
  )
})

export default getCurveLines;
