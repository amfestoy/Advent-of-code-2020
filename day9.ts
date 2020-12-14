const fs = require("fs");
const readline = require("readline");
const _ = require("lodash");

const checkSum = (input, testNumber) => {
  for (let i = 0; i < input.length; i++) {
    for (let j = i; j < input.length; j++) {
      const a = input[i];
      const b = input[j];

      if (a + b === testNumber) {
        return true;
      }
    }
  }
  return false;
};

const isSum = (input) => {
  const sum = input.reduce((i, acc) => i + acc, 0);
  return sum;
};

const processLineByLine9 = async () => {
  console.log("running");
  const fileStream = fs.createReadStream("day9Input.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.
  const numbers = [];
  for await (const line of rl) {
    numbers.push(parseInt(line));
  }

  let testLength = 0;
  const number = 144381670;
  for (let i = 0; i < numbers.length; i++) {
    testLength = 0;
    let sum = 0;
    while (sum < number) {
      const testArray = numbers.slice(i, testLength);
      sum = isSum(testArray);
      if (sum === number) {
        console.log(testArray);
        const min = Math.min(...testArray);
        const max = Math.max(...testArray);
        const product = min + max;
        console.log(min, max, product);
        break;
      }

      testLength = testLength + 1;
    }
  }
};

processLineByLine9();
