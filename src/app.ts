const DIRECTIONS = ['N', 'E', 'S', 'W'];
const MOVES = [[0, 1], [1, 0], [0, -1], [-1, 0]];

export function commandRover(instructions: string): string {
  const lines = instructions.split("\n");
  const results = [];
  
  for (let i = 1; i < lines.length; i += 2) {
    const [x, y, heading] = lines[i].split(" ");
    let [posX, posY, dirIndex] = [+x, +y, DIRECTIONS.indexOf(heading)];
    
    for (const command of lines[i + 1]) {
      if (command === 'M') {
        posX += MOVES[dirIndex][0];
        posY += MOVES[dirIndex][1];
      } else {
        dirIndex = (dirIndex + (command === 'L' ? 3 : 1)) % 4;
      }
    }
    
    results.push(`${posX} ${posY} ${DIRECTIONS[dirIndex]}`);
  }
  
  return results.join("\n");
}