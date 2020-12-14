const fs = require("fs");
const readline = require("readline");

const isValidPassword1 = (thing) => {
  const numberOfLetter = thing.password
    .split("")
    .filter((l) => l === thing.letter).length;
  return numberOfLetter >= thing.min && numberOfLetter <= thing.max;
};

const isValidPassword2 = (thing) => {
  const splity = thing.password.split("");
  console.log(splity);
  const isFirstPos = splity[thing.min - 1] === thing.letter;
  console.log("rirst", splity[thing.min - 1]);
  console.log("rirst2", splity[thing.max - 1]);
  const isSecPos = splity[thing.max - 1] === thing.letter;
  const isBooth = isFirstPos && isSecPos;
  console.log(isFirstPos, isSecPos, isBooth);
  return (isFirstPos || isSecPos) && !isBooth;
};

async function processLineByLine() {
  let count = 0;
  const fileStream = fs.createReadStream("day2Input.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    const splitLine = line.split(" ");
    console.log(splitLine);
    const min = parseInt(splitLine[0].split("-")[0]);
    const max = parseInt(splitLine[0].split("-")[1]);
    const letter = splitLine[1].split(":")[0];
    const password = splitLine[2];
    const thing = { min, max, letter, password };
    console.log(thing);
    const isValid = isValidPassword2(thing);
    if (isValid) {
      count = count + 1;
    }
    console.log(isValid);
  }
  console.log(count);
}

processLineByLine();
