const fs = require("fs");
const readline = require("readline");
const _ = require("lodash");

const countUnique = (text) => {
  const split = text.split("");
  const uniq = _.uniq(split);
  return uniq.length;
};

const countIntersection = (answers) => {
  const intersection = _.intersection(...answers);
  console.log("intwe", intersection, "answ", answers);
  return intersection.length;
};

async function processLineByLine3() {
  console.log("running");
  const fileStream = fs.createReadStream("day6Input.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.
  let count = 0;
  let answers = [];
  for await (const line of rl) {
    if (line !== "") {
      const splitted = line.split("");
      answers.push(splitted);
    }
    if (line === "") {
      count += countIntersection(answers);

      answers = [];
    }
  }
  console.log(count);
}

processLineByLine3();
