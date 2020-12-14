const fs = require("fs");
const readline = require("readline");
const _ = require("lodash");

const getAction = (line) => {
  const split = line.split(" ");
  const key = split[0];
  const value = parseInt(split[1]);
  const visited = false;
  return { key, value, visited };
};

const isInfinite = (actions) => {
  console.log("actions to test", actions);
  let acc = 0;
  let index = 0;
  while (true) {
    console.log("isinfinti", index);
    if (index >= actions.length) {
      console.log("ultimate party", acc);
      return false;
    }
    const action = actions[index];
    console.log("action", action);
    if (action.visited) {
      return true;
    }
    action.visited = true;
    switch (action.key) {
      case "acc":
        acc += action.value;
        index += 1;
        continue;
      case "jmp":
        index += action.value;
        continue;
      default:
        index += 1;
        continue;
    }
  }
};

const processLineByLine8 = async () => {
  console.log("running");
  const fileStream = fs.createReadStream("day8Input.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.
  let actions = [];
  let resetActions = [];
  for await (const line of rl) {
    const action = getAction(line);
    actions.push({ ...action });
  }
  resetActions = _.cloneDeep(actions);
  console.log(actions, resetActions);

  let index = -1;

  for (let i = 0; i < actions.length; i++) {
    console.log("index", i);
    if (actions[i].key === "acc") {
      console.log("acc continue");
      continue;
    }

    if (actions[i].key === "nop") {
      console.log("nop changing and testing");
      actions[i].key = "jmp";
      console.log("a", resetActions, actions);

      const infinite = isInfinite(actions);

      console.log("b", resetActions, actions);
      console.log("tested", infinite);

      if (!infinite) {
        console.log("party!!");
        break;
      }

      actions = _.cloneDeep(resetActions);

      console.log("c", resetActions, actions);
    }

    if (actions[i].key === "jmp") {
      console.log("jmp testing");
      console.log("infinite", actions);

      actions[i].key = "nop";
      console.log("b", actions);

      const infinite = isInfinite(actions);
      console.log("infinite", infinite, actions);
      if (!infinite) {
        console.log("party!!");
        break;
      }
      actions = _.cloneDeep(resetActions);
    }

    console.log(actions, resetActions);
  }
};

processLineByLine8();
