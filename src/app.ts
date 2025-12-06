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

export function commandRover(rawInstructions: string): string {
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