const fs = require("fs");
const readline = require("readline");
const _ = require("lodash");

const shouldBeEmptyCheck = (seats, i, j) => {
  let countFilled = 0;
  for (let r = i - 1; r < i + 2; r++) {
    for (let c = j - 1; c < j + 2; c++) {
      if (seats[r] && seats[r][c] && seats[r][c] === "#") {
        countFilled++;
      }
    }
  }
  return countFilled > 4;
};

const shouldBeOcupiedCheck = (seats, i, j) => {
  for (let r = i - 1; r < i + 2; r++) {
    for (let c = j - 1; c < j + 2; c++) {
      if (seats[r] && seats[r][c] && seats[r][c] === "#") {
        return false;
      }
    }
  }
  return true;
};

const shouldBeEmptyCheck2 = (seats, i, j) => {
  let countFilled = 0;

  //test first direction straight up

  for (let r = i - 1; r >= 0; r--) {
    const c = j;
    if (seats[r] && seats[r][c] && seats[r][c] === "#") {
      countFilled++;

      break;
    }
    if (seats[r] && seats[r][c] && seats[r][c] === "L") {
      break;
    }
  }

  //test second direction straight right

  for (let c = j + 1; c < seats[0].length; c++) {
    const r = i;
    if (seats[r] && seats[r][c] && seats[r][c] === "#") {
      countFilled++;

      break;
    }
    if (seats[r] && seats[r][c] && seats[r][c] === "L") {
      break;
    }
  }

  //test third direction straight down

  for (let r = i + 1; r < seats.length; r++) {
    const c = j;
    if (seats[r] && seats[r][c] && seats[r][c] === "#") {
      countFilled++;

      break;
    }
    if (seats[r] && seats[r][c] && seats[r][c] === "L") {
      break;
    }
  }

  //test forth direction straight left

  for (let c = j - 1; c >= 0; c--) {
    const r = i;
    if (seats[r] && seats[r][c] && seats[r][c] === "#") {
      countFilled++;

      break;
    }
    if (seats[r] && seats[r][c] && seats[r][c] === "L") {
      break;
    }
  }

  //test fifth diagonal up left

  let r = i - 1;
  let c = j - 1;
  while (true) {
    if (seats[r] && seats[r][c] && seats[r][c] === "#") {
      countFilled++;

      break;
    }
    if (seats[r] && seats[r][c] && seats[r][c] === "L") {
      break;
    }
    r--;
    c--;
    if (r < 0 || c < 0) {
      break;
    }
  }

  //test sixt diagonal up right

  r = i - 1;
  c = j + 1;
  while (true) {
    if (seats[r] && seats[r][c] && seats[r][c] === "#") {
      countFilled++;

      break;
    }
    if (seats[r] && seats[r][c] && seats[r][c] === "L") {
      break;
    }
    r--;
    c++;
    if (r < 0 || c >= seats[0].length) {
      break;
    }
  }

  //test seventh diagonal down right

  r = i + 1;
  c = j + 1;
  while (true) {
    if (seats[r] && seats[r][c] && seats[r][c] === "#") {
      countFilled++;

      break;
    }
    if (seats[r] && seats[r][c] && seats[r][c] === "L") {
      break;
    }
    r++;
    c++;
    if (r >= seats.length || c >= seats[0].length) {
      break;
    }
  }

  //test eight diagonal down left

  r = i + 1;
  c = j - 1;
  while (true) {
    if (seats[r] && seats[r][c] && seats[r][c] === "#") {
      countFilled++;

      break;
    }
    if (seats[r] && seats[r][c] && seats[r][c] === "L") {
      break;
    }
    r++;
    c--;
    if (r >= seats.length || c < 0) {
      break;
    }
  }

  return countFilled >= 5;
};

const shouldBeOcupiedCheck2 = (seats, i, j) => {
  //test first direction straight up

  for (let r = i - 1; r >= 0; r--) {
    const c = j;
    if (seats[r] && seats[r][c] && seats[r][c] === "#") {
      console.log("found up", i, j, r, c);
      return false;
    }
    if (seats[r] && seats[r][c] && seats[r][c] === "L") {
      break;
    }
  }

  //test second direction straight right

  for (let c = j + 1; c < seats[0].length; c++) {
    const r = i;
    if (seats[r] && seats[r][c] && seats[r][c] === "#") {
      console.log("found rigt", i, j, r, c);
      return false;
    }
    if (seats[r] && seats[r][c] && seats[r][c] === "L") {
      break;
    }
  }

  //test third direction straight down

  for (let r = i + 1; r < seats.length; r++) {
    const c = j;
    if (seats[r] && seats[r][c] && seats[r][c] === "#") {
      console.log("found down", i, j, r, c);
      return false;
    }
    if (seats[r] && seats[r][c] && seats[r][c] === "L") {
      break;
    }
  }

  //test forth direction straight left

  for (let c = j - 1; c >= 0; c--) {
    const r = i;
    if (seats[r] && seats[r][c] && seats[r][c] === "#") {
      console.log("found left", i, j, r, c);
      return false;
    }
    if (seats[r] && seats[r][c] && seats[r][c] === "L") {
      break;
    }
  }

  //test fifth diagonal up left

  let r = i - 1;
  let c = j - 1;
  while (true) {
    if (seats[r] && seats[r][c] && seats[r][c] === "#") {
      console.log("found up left", i, j, r, c);
      return false;
    }
    if (seats[r] && seats[r][c] && seats[r][c] === "L") {
      break;
    }
    r--;
    c--;
    if (r < 0 || c < 0) {
      break;
    }
  }

  //test sixt diagonal up right

  r = i - 1;
  c = j + 1;
  while (true) {
    if (seats[r] && seats[r][c] && seats[r][c] === "#") {
      console.log("found up right", i, j, r, c);
      return false;
    }
    if (seats[r] && seats[r][c] && seats[r][c] === "L") {
      break;
    }
    r--;
    c++;
    if (r < 0 || c >= seats[0].length) {
      break;
    }
  }

  //test seventh diagonal down right

  r = i + 1;
  c = j + 1;
  while (true) {
    if (seats[r] && seats[r][c] && seats[r][c] === "#") {
      console.log("found down right", i, j, r, c);
      return false;
    }
    if (seats[r] && seats[r][c] && seats[r][c] === "L") {
      break;
    }
    r++;
    c++;
    if (r >= seats.length || c >= seats[0].length) {
      break;
    }
  }

  //test eight diagonal down left

  r = i + 1;
  c = j - 1;
  while (true) {
    if (seats[r] && seats[r][c] && seats[r][c] === "#") {
      console.log("found down left", i, j, r, c);
      return false;
    }
    if (seats[r] && seats[r][c] && seats[r][c] === "L") {
      break;
    }
    r++;
    c--;
    if (r >= seats.length || c < 0) {
      break;
    }
  }
  return true;
};

const processLineByLine11 = async () => {
  console.log("running");
  const fileStream = fs.createReadStream("day11Input.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.
  let seats = [];
  for await (const line of rl) {
    seats.push(line.split(""));
  }

  let didSomethingChange = true;
  let thing = 0;
  while (didSomethingChange) {
    const newSeats = seats.map((s) => [...s]);
    didSomethingChange = false;
    console.log("\n new round");
    seats.map((s) => console.log(s.join("")));

    for (let i = 0; i < seats.length; i++) {
      for (let j = 0; j < seats[0].length; j++) {
        const place = seats[i][j];

        if (place === "#") {
          const shouldBeEmpty = shouldBeEmptyCheck2(seats, i, j);
          if (shouldBeEmpty) {
            newSeats[i][j] = "L";
            didSomethingChange = true;
          }
        }

        if (place === "L") {
          const shouldBeOcupied = shouldBeOcupiedCheck2(seats, i, j);
          if (shouldBeOcupied) {
            newSeats[i][j] = "#";
            didSomethingChange = true;
          }
        }
      }
    }
    seats = newSeats.map((s) => [...s]);
    thing++;
  }
  console.log("aøsdkljfaælsdjkfælsakjdfløaskmvløkam");
  console.log(seats);
  let counter = 0;
  for (let i = 0; i < seats.length; i++) {
    for (let j = 0; j < seats[0].length; j++) {
      const place = seats[i][j];
      if (place === "#") {
        counter++;
      }
    }
  }
  console.log(counter);
};

processLineByLine11();
