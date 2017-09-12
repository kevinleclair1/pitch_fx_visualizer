import last from 'lodash/last.js';

class PitchFactory {
  constructor({ 
    source,
    finalTime,
    trajectory,
    id
  }) {
    this.source = source;
    this.pitchFinalTime = finalTime;
    this.trajectory = trajectory;
    this.id = id;
  }

  get inning(){
    return this.source.inning;
  }

  get finalTime(){
    return this.pitchFinalTime;
  }

  get atBatId(){
    return this.source.ab_id;
  }

  get batterName() {
    return this.source.batter_name;
  }

  get pitchOutcome() {
    return this.source.des;
  }

  get pitchId() {
    return this.id;
  }

  get atBatCount() {
    return this.source.ab_count;
  }

  get pitchResult() {
    return this.source.pdes;
  }

  get pitchSourceData() {
    return this.source;
  }

  get pitchTypeId() {
    return this.source.type;
  } 

  finalPosition() {
    return last(this.trajectory);
  }
}

export default (dataObj) => {
  const factory = new PitchFactory(dataObj)

  return Object.freeze(factory)
}