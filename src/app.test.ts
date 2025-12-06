import { commandRover } from './app';

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
