const fs = require("fs");
const readline = require("readline");

async function processLineByLine3() {
  console.log("running");
  const fileStream = fs.createReadStream("day3Input.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.
  let trees = 0;
  let counter = 0;
  let shouldSkip = false;
  for await (const line of rl) {
    if (shouldSkip) {
      shouldSkip = false;
      continue;
    }
    const splitLine = line.split("");
    const position = counter % splitLine.length;
    const positionOnRow = splitLine[position];
    if (positionOnRow === "#") {
      trees += 1;
    }

    counter += 1;
    shouldSkip = true;
    console.log(counter);
  }

  console.log(trees);
  console.log(79 * 156 * 85 * 82 * 41);
}

processLineByLine3();

// 79 * 156 * 85 * 82 * 79
