const MOVES = {N:[0,1], E:[1,0], S:[0,-1], W:[-1,0]};
const LEFT = {N:'W', E:'N', S:'E', W:'S'};
const RIGHT = {N:'E', E:'S', S:'W', W:'N'};

export function commandRover(instructions: string): string {
  const lines = instructions.split("\n");
  const results = [];
  
  for (let i = 1; i < lines.length; i += 2) {
    const parts = lines[i].split(" ");
    let posX = +parts[0];
    let posY = +parts[1];
    let dir = parts[2];
    
    for (const command of lines[i + 1]) {
      if (command === 'M') {
        posX += MOVES[dir][0];
        posY += MOVES[dir][1];
      } else if (command === 'L') {
        dir = LEFT[dir];
      } else {
        dir = RIGHT[dir];
      }
    }
    
    results.push(`${posX} ${posY} ${dir}`);
  }
  
  return results.join("\n");
}