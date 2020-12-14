const fs = require("fs");
const readline = require("readline");
const _ = require("lodash");

const getRow = (lineCode) => {
  const split = lineCode.split("");

  const rowNum = split.reduce(
    (acc, code) => {
      if (code === "F") {
        const row = {
          min: acc.min,
          max: acc.max - Math.ceil((acc.max - acc.min) / 2),
        };
        return row;
      }

      if (code === "B") {
        const row = {
          min: acc.min + Math.ceil((acc.max - acc.min) / 2),
          max: acc.max,
        };
        return row;
      }
    },
    { min: 0, max: 127 }
  );

  return rowNum.min;
};

const getCol = (lineCode) => {
  const split = lineCode.split("");

  const rowNum = split.reduce(
    (acc, code) => {
      if (code === "L") {
        const row = {
          min: acc.min,
          max: acc.max - Math.ceil((acc.max - acc.min) / 2),
        };
        return row;
      }

      if (code === "R") {
        const row = {
          min: acc.min + Math.ceil((acc.max - acc.min) / 2),
          max: acc.max,
        };
        return row;
      }
    },
    { min: 0, max: 7 }
  );

  return rowNum.min;
};

async function processLineByLine3() {
  console.log("running");
  const fileStream = fs.createReadStream("day5Input.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.
  let count = 0;
  let highestID = 0;
  const highestRow = 0;
  const seats = [];
  for await (const line of rl) {
    const row = line.substr(0, 7);
    const rownum = getRow(row);
    const col = line.substr(7, 10);
    const colNum = getCol(col);
    const id = rownum * 8 + colNum;
    console.log(row, col, id);
    if (id > highestID) {
      highestID = id;
    }
    seats.push({ row: rownum, col: colNum });
  }
  console.log("count", highestID);
  const grouped = _.groupBy(seats, (s) => s.row);
  Object.keys(grouped).forEach((k) => {
    const lengt = grouped[k].length;
    if (lengt < 8) {
      console.log(k);
    }
  });

  console.log(grouped[78]);
  console.log(78 * 8 + 1);
}

processLineByLine3();
