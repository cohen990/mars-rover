const DIRECTIONS = 'NESW';
const DELTA_X = [0, 1, 0, -1];
const DELTA_Y = [1, 0, -1, 0];

export function commandRover(instructions: string): string {
  const lines = instructions.split("\n");
  const results = [];
  
  for (let i = 1; i < lines.length; i += 2) {
    const parts = lines[i].split(" ");
    let posX = +parts[0];
    let posY = +parts[1];
    let dirIndex = DIRECTIONS.indexOf(parts[2]);
    
    for (const command of lines[i + 1]) {
      if (command === 'M') {
        posX += DELTA_X[dirIndex];
        posY += DELTA_Y[dirIndex];
      } else {
        dirIndex = (dirIndex + (command === 'L' ? 3 : 1)) & 3;
      }
    }
    
    results.push(`${posX} ${posY} ${DIRECTIONS[dirIndex]}`);
  }
  
  return results.join("\n");
}