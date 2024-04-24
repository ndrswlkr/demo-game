
export function floatRange(from, to, length){
  const span = to - from
  const step = span / length
  console.log(step)
  const range = []
  let count = 0
  for (let i = 0; i < length; i++){
    range.push(count)
    count += step
  }
  return range
}

export function constrain (n, min, max) {
  if (n >= max) n = max
  if (n <= min) n = min
  return n
}

export function random (val1, val2 = 0) {
  if(val2 === 0) return Math.random() * val1
  return val1 + Math.random() * val2
}

export function norm (v, min, max) {
  return (v - min) / (max - min)
}

export function lerp(norm, min, max){
    return (max - min) * norm + min
}

export function map(val, sourceMin, sourceMax, destMin, destMax){
    let n = norm(val, sourceMin, sourceMax)
    return lerp(n, destMin, destMax)
}