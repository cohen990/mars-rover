type Rover = { heading: string; x: number; y: number };

// Optimized lookup tables
const DIRS = ['N', 'E', 'S', 'W'];
const MOVES = { N: [0, 1], E: [1, 0], S: [0, -1], W: [-1, 0] };
const TURNS = { L: -1, R: 1 };

export function commandRover(instructions: string): string {
  const lines = instructions.split("\n");
  const results = [];
  
  for (let i = 1; i < lines.length; i += 2) {
    const [x, y, h] = lines[i].split(" ");
    let rover = { x: +x, y: +y, heading: h };
    let dirIndex = DIRS.indexOf(h);
    
    for (const cmd of lines[i + 1]) {
      if (cmd === 'M') {
        const [dx, dy] = MOVES[rover.heading];
        rover.x += dx;
        rover.y += dy;
      } else {
        dirIndex = (dirIndex + TURNS[cmd] + 4) % 4;
        rover.heading = DIRS[dirIndex];
      }
    }
    
    results.push(`${rover.x} ${rover.y} ${rover.heading}`);
  }
  
  return results.join("\n");
}