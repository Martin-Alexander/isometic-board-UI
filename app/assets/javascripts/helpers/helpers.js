// Returns a random element from an array
function randomSample(array) {
  return array[Math.floor(Math.random() * (array.length ))];
}

// Has a one in `x` chance of returning true
function chance(x) {
  if (Math.random() < 1 / x) {
    return true;
  } else {
    return false;
  }
}

// Is a number prime?
function isPrime(num) {
  for(var i = 2; i < num; i++)
    if(num % i === 0) return false;
  return num !== 1;
}

// Fills the global variables `grassPattern` with random 1s and 0s
function setRandomGrassPattern() {

  grassPattern = [];
  for (var i = 0; i < ySize; i++) {
    grassPattern.push([]);
    for (var j = 0; j < xSize; j++) {
      if (chance(3)) {
        grassPattern[grassPattern.length - 1].push(1);
      } else {
        grassPattern[grassPattern.length - 1].push(0);
      }
    }
  }
}

