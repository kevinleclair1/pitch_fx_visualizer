import createPitchFactory from'./factories/PitchFactory.js';

// we know that statscast will always start its initial y value at 50

// it would be possible to go through every 0.001 feet intervals for y and calculate each position based on that

// we could then search through the array to find the time value that matches with the current delta time (possibles issues here where no time could exist that matches the time in the pitch we are looking for)

// from there we calculate the velocity based on the known values and constant assumed acceleration

// we can recalculate the velocity by calculating the drag forces in play

// we will also need to calculate the time it will take for the pitch to get to home plate in order to provide a speed to our react component that will be used

const findDistance = (
  velocity,
  time,
  acceleration,
  position
) => parseFloat(position) + parseFloat(velocity) * time + 0.5 * parseFloat(acceleration) * Math.pow(time, 2)

const FRONT_PLATE = 1.417

const getYVelo = (distance, vy0, ay, y0) => -Math.sqrt(Math.pow(parseFloat(vy0), 2) + 2 * parseFloat(ay) * (distance - parseFloat(y0)))

const getTime = (velo, vy0, ay) => (velo - parseFloat(vy0)) / parseFloat(ay);

export const parsePitch = (pitch) => {
  const endVelo = getYVelo(FRONT_PLATE, pitch.vy0, pitch.ay, pitch.y0);

  let time = getTime(endVelo, pitch.vy0, pitch.ay)

  const arr = []

  while (time >= 0) {
    // set a plot point for every 0.001 second
    const yPoint = findDistance(pitch.vy0, time, pitch.ay, pitch.y0) * 0.3048

    if (yPoint <= 0) {
      time = 0
    } else {
      arr.push({
        z: yPoint,
        // the mlb data seems to have reveresed z and y axis than aframe
        y: findDistance(pitch.vz0, time, pitch.az, pitch.z0) * 0.3048,
        x: findDistance(pitch.vx0, time, pitch.ax, pitch.x0) * 0.3048
      })
      time = time - 0.005
    }
  }

  return createPitchFactory({
    source: pitch,
    finalTime: getTime(endVelo, pitch.vy0, pitch.ay),
    trajectory: arr.reverse(),
    id: pitch.id
  })
}

export default (pitches) => pitches.map(parsePitch);