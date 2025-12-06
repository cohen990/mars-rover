type Rover = {
  heading: string;
  x: number;
  y: number;
};

// Consolidated direction mappings
const DIRECTIONS = ['N', 'E', 'S', 'W'] as const;
const DIRECTION_DELTAS = { N: [0, 1], E: [1, 0], S: [0, -1], W: [-1, 0] } as const;

function executeCommand(rover: Rover, command: string): void {
  switch (command) {
    case 'M':
      const [dx, dy] = DIRECTION_DELTAS[rover.heading];
      rover.x += dx;
      rover.y += dy;
      break;
    case 'L':
      const leftIndex = (DIRECTIONS.indexOf(rover.heading as any) + 3) % 4;
      rover.heading = DIRECTIONS[leftIndex];
      break;
    case 'R':
      const rightIndex = (DIRECTIONS.indexOf(rover.heading as any) + 1) % 4;
      rover.heading = DIRECTIONS[rightIndex];
      break;
  }
}

function commandRover(rawInstructions: string): string {
  const lines = rawInstructions.split("\n");
  const results: string[] = [];
  
  for (let i = 1; i < lines.length; i += 2) {
    const [x, y, heading] = lines[i].split(" ");
    const rover: Rover = { x: parseInt(x), y: parseInt(y), heading };
    
    for (const command of lines[i + 1]) {
      executeCommand(rover, command);
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
