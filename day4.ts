const fs = require("fs");
const readline = require("readline");

const neededCredentials = [
  "byr:",
  "iyr:",
  "eyr:",
  "hgt:",
  "hcl:",
  "ecl:",
  "pid:",
];

const keyValidation = {
  ["byr"]: (year) => parseInt(year) >= 1920 && parseInt(year) <= 2002,
  ["iyr"]: (year) => parseInt(year) >= 2010 && parseInt(year) <= 2020,
  ["eyr"]: (year) => parseInt(year) >= 2020 && parseInt(year) <= 2030,
  ["hgt"]: (hgt) => {
    if (hgt.includes("cm")) {
      const height = parseInt(hgt.split("cm")[0]);
      return height >= 150 && height <= 193;
    }

    if (hgt.includes("in")) {
      const height = parseInt(hgt.split("in")[0]);
      return height >= 59 && height <= 76;
    }
    return false;
  },
  ["hcl"]: (hcl) => /^#[0-9A-F]{6}$/i.test(hcl),
  ["ecl"]: (ecl) =>
    ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(ecl),
  ["pid"]: (id) => /^[0-9]{9}$/i.test(id),
  ["cid"]: (cid) => true,
};

const checkPassport1 = (passport) => {
  const split = passport.split(" ");
  if (split.length < 9) {
    return false;
  }

  if (split.length > 9) {
    return true;
  }

  const check = neededCredentials.reduce((acc, c) => {
    const checkForCred = !!split.find((s) => s.startsWith(c));
    return acc && checkForCred;
  }, true);

  return check;
};

const checkPassport2 = (passport) => {
  if (!checkPassport1(passport)) {
    return false;
  }

  const split = passport.split(" ");
  const check = split.reduce((acc, c) => {
    if (c === "") {
      return acc && true;
    }

    const key = c.split(":")[0];
    const value = c.split(":")[1];
    const checkFunction = keyValidation[key];
    if (!checkFunction) {
      console.log(checkFunction, key);
      return false;
    }

    console.log(checkFunction(value), value, key);
    return acc && checkFunction(value);
  }, true);

  console.log(passport, check);

  return check;
};

async function processLineByLine3() {
  console.log("running");
  const fileStream = fs.createReadStream("day4Input.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.
  let passport = "";
  let count = 0;
  for await (const line of rl) {
    passport = passport + " " + line;
    if (line == "") {
      const isValidPassport = checkPassport2(passport);

      if (isValidPassport) {
        count += 1;
      }

      passport = "";
    }
  }
  console.log("count", count);
}

processLineByLine3();
