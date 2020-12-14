const fs = require("fs");
const readline = require("readline");
const _ = require("lodash");

const getRule = (line) => {
  const bagColor = line.split(" bag")[0];
  const contains = {};
  const bagsInBag = line.split("contain ")[1].split(", ");
  bagsInBag.forEach((b) => {
    const split = b.split(" ");
    const bagColor = split[1] + " " + split[2];
    if (split[0] === "no") {
      return;
    }
    contains[bagColor] = parseInt(split[0]);
  });
  const bag = { bagColor, contains };
  return bag;
};

const canRuleCarryBag = (bag, rule, rules) => {
  console.log(rule);
  const rulesInBag = Object.keys(rules[rule]);
  if (rulesInBag.includes(bag)) {
    return true;
  }

  if (rulesInBag.length === 0) {
    return false;
  }

  for (const r of rulesInBag) {
    const test = canRuleCarryBag(bag, r, rules);
    console.log(test, r);
    if (test) {
      return true;
    }
  }

  return false;
};

const countBags = (bag, rules) => {
  const count = Object.keys(rules).reduce((count, rule) => {
    const isRuleCarryBag = canRuleCarryBag(bag, rule, rules);
    console.log("tested", isRuleCarryBag);
    if (isRuleCarryBag) {
      return count + 1;
    }
    return count;
  }, 0);
  return count;
};

const countTotalBags = (bag, rules) => {
  console.log(bag);
  const rulesForBag = rules[bag];
  console.log(rulesForBag);
  if (!Object.keys(rulesForBag).length) {
    return 0;
  }

  const count = Object.keys(rulesForBag).reduce((acc, r) => {
    const countB = countTotalBags(r, rules);

    console.log("acc", acc + rulesForBag[r] * countB);
    return acc + rulesForBag[r] * countB + rulesForBag[r];
  }, 0);

  return count;
};

const processLineByLine7 = async () => {
  console.log("running");
  const fileStream = fs.createReadStream("day7Input.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.
  const rules = {};
  for await (const line of rl) {
    const bag = getRule(line);
    rules[bag.bagColor] = bag.contains;
  }
  const count = countTotalBags("shiny gold", rules);
  console.log(rules);
  console.log(count);
};

processLineByLine7();
