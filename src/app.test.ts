type Rover = {
  heading: string;
  x: number;
  y: number;
};

const moves = {
  M: forwards,
  L: turnLeft,
  R: turnRight,
};

const cardinalMoves = {
  E: moveEast,
  W: moveWest,
  N: moveNorth,
  S: moveSouth,
};

const rightTurns = {
  N: "E",
  W: "N",
  S: "W",
  E: "S",
};

const leftTurns = {
  N: "W",
  W: "S",
  S: "E",
  E: "N",
};

function makeRover(heading: string, xRaw: string, yRaw: string): Rover {
  return {
    heading,
    x: Number.parseInt(xRaw),
    y: Number.parseInt(yRaw),
  };
}

function moveEast(rover: Rover) {
  rover.x++;
}

function moveNorth(rover: Rover) {
  rover.y++;
}

function moveWest(rover: Rover) {
  rover.x--;
}

function moveSouth(rover: Rover) {
  rover.y--;
}

function forwards(rover: Rover) {
  cardinalMoves[rover.heading](rover);
}

function turnRight(rover: Rover) {
  rover.heading = rightTurns[rover.heading];
}

function turnLeft(rover: Rover) {
  rover.heading = leftTurns[rover.heading];
}

type RoverCommand = {
  position: string;
  commands: string;
};

type Instructions = {
  grid: string;
  roverCommands: RoverCommand[];
};

function parseInstructions(instructions: string): Instructions {
  const split = instructions.split("\n");
  const roverCommands = [];
  for (let i = 1; i < split.length; i += 2) {
    roverCommands.push({ position: split[i], commands: split[i + 1] });
  }

  return { grid: split[0], roverCommands };
}

function commandRover(rawInstructions: string): string {
  const instructions = parseInstructions(rawInstructions);
  const results = [];
  for (let i = 0; i < instructions.roverCommands.length; i++) {
    const roverCommands = instructions.roverCommands[i];
    const [xRaw, yRaw, heading] = roverCommands.position.split(" ");
    const rover = makeRover(heading, xRaw, yRaw);

    for (let j = 0; j < roverCommands.commands.length; j++) {
      moves[roverCommands.commands[j]](rover);
    }

    results.push(`${rover.x} ${rover.y} ${rover.heading}`);
  }

  return results.join("\n");
}

it("should follow all the instructions", () => {
  const instructions = `5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM`;

  const output = `1 3 N
5 1 E`;

  const result = commandRover(instructions);

  expect(result).toBe(output);
});

it.each([
  { commands: "M", finalPosition: "1 3 N" },
  { commands: "MM", finalPosition: "1 4 N" },
  { commands: "MMM", finalPosition: "1 5 N" },
  { commands: "L", finalPosition: "1 2 W" },
  { commands: "LL", finalPosition: "1 2 S" },
  { commands: "LLL", finalPosition: "1 2 E" },
  { commands: "LLLL", finalPosition: "1 2 N" },
  { commands: "R", finalPosition: "1 2 E" },
  { commands: "RR", finalPosition: "1 2 S" },
  { commands: "RRR", finalPosition: "1 2 W" },
  { commands: "RRRR", finalPosition: "1 2 N" },
  { commands: "RM", finalPosition: "2 2 E" },
  { commands: "RRM", finalPosition: "1 1 S" },
  { commands: "RRRM", finalPosition: "0 2 W" },
])("should move a single rover", ({ commands, finalPosition }) => {
  const instructions = `5 5
1 2 N
${commands}`;

  const result = commandRover(instructions);

  expect(result).toBe(finalPosition);
});
