const fs = require("fs");
const readline = require("readline");
const _ = require("lodash");

const getCorrectDirection = (curDir, value, rightOrLeft) => {
  const directions = ["N", "E", "S", "W"];
  const indexCurDir = directions.indexOf(curDir);
  let newDir = indexCurDir;
  if (rightOrLeft === "R") {
    newDir = (indexCurDir + value / 90) % 4;
  }
  if (rightOrLeft === "L") {
    newDir = (indexCurDir - value / 90 + 4) % 4;
  }
  const changedDirection = directions[newDir];
  console.log(curDir, changedDirection, newDir);
  return changedDirection;
};

const processLineByLine12 = async () => {
  console.log("running");
  const fileStream = fs.createReadStream("day12Input.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.
  let actions = [];
  for await (const line of rl) {
    actions.push({
      direction: line.substring(0, 1),
      value: parseInt(line.substring(1, line.length)),
    });
  }

  let currentDirection = "E";
  let north = 0;
  let east = 0;
  let south = 0;
  let west = 0;
  const movement = { E: 0, N: 0, S: 0, W: 0 };
  actions.forEach((a) => {
    switch (a.direction) {
      case "F":
        movement[currentDirection] = movement[currentDirection] + a.value;
        break;

      case "R":
        currentDirection = getCorrectDirection(currentDirection, a.value, "R");
        break;

      case "L":
        currentDirection = getCorrectDirection(currentDirection, a.value, "L");
        break;

      default:
        movement[a.direction] = movement[a.direction] + a.value;
    }
    console.log(movement, a);
  });

  console.log(movement);
  console.log("E", movement.E - movement.W, "S", movement.S - movement.N);
};

processLineByLine12();
