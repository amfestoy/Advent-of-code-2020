const fs = require("fs");
const readline = require("readline");
const _ = require("lodash");

const firstTask = (numbers) => {
  let diffOne = 0;
  let diffTwo = 0;
  let diffThree = 1;
  let adapters = 0;
  let currentAdapter = 0;
  while (adapters < numbers.length + 1) {
    console.log(currentAdapter);
    adapters++;
    const find1Diff = numbers.find((n) => n === currentAdapter + 1);
    if (find1Diff) {
      diffOne++;
      currentAdapter = currentAdapter + 1;
      continue;
    }
    const find2Diff = numbers.find((n) => n === currentAdapter + 2);
    if (find2Diff) {
      diffTwo++;
      currentAdapter = currentAdapter + 2;
      continue;
    }
    const find3Diff = numbers.find((n) => n === currentAdapter + 3);
    if (find3Diff) {
      diffThree++;
      currentAdapter = currentAdapter + 3;
      continue;
    }
  }
  console.log(diffOne, diffTwo, diffThree, diffOne * diffThree);
};

const processLineByLine10 = async () => {
  console.log("running");
  const fileStream = fs.createReadStream("day10Input.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.
  const numbers = [];
  const dictonary = { 0: { visited: 0, finished: false } };
  for await (const line of rl) {
    numbers.push(parseInt(line));
    dictonary[parseInt(line)] = { visited: 0, finished: false };
  }
  firstTask(numbers);

  let combinations = 0;
  const goalCharger = Math.max(...numbers);
  dictonary[goalCharger] = { finished: true, visited: 1 };

  const numGiveCombination = (curNum, ogNum, ogNumArray, inLine) => {
    const excists = numbers.find((n) => curNum === n);

    if (!excists && curNum != 0) {
      console.log("invalid", curNum);
      return false;
    }

    const dic = dictonary[curNum];
    if (dic.finished) {
      ogNumArray.forEach((n) => {
        dictonary[n].visited = dictonary[n].visited + dic.visited;
      });
      console.log("found finished", dictonary);
      return true;
    }

    if (curNum === goalCharger) {
      ogNumArray.forEach((n) => {
        dictonary[n].visited = dictonary[n].visited + 1;
      });
      console.log("found goal", dictonary);
      return true;
    }

    const nextCharger = [curNum + 1, curNum + 2, curNum + 3];
    const newArray = [...ogNumArray];
    newArray.push(curNum);
    const num1 = numGiveCombination(nextCharger[0], curNum, newArray, 1);
    const num2 = numGiveCombination(nextCharger[1], curNum, newArray, 2);
    const num3 = numGiveCombination(nextCharger[2], curNum, newArray, 3);
    dictonary[curNum].finished = true;
    console.log("completed this number", curNum, dictonary);
  };

  numGiveCombination(0, 0, [], 0);
  console.log(combinations);
};

processLineByLine10();
