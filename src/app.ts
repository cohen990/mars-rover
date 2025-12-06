export function commandRover(instructions: string): string {
  const lines = instructions.split("\n");
  const results = [];
  
  for (let i = 1; i < lines.length; i += 2) {
    const parts = lines[i].split(" ");
    let posX = +parts[0];
    let posY = +parts[1];
    let dir = parts[2].charCodeAt(0) === 78 ? 0 : parts[2].charCodeAt(0) === 69 ? 1 : parts[2].charCodeAt(0) === 83 ? 2 : 3;
    
    for (const command of lines[i + 1]) {
      if (command === 'M') {
        posX += dir & 1 ? (dir & 2 ? -1 : 1) : 0;
        posY += dir & 1 ? 0 : (dir & 2 ? -1 : 1);
      } else {
        dir = (dir + (command === 'L' ? 3 : 1)) & 3;
      }
    }
    
    results.push(`${posX} ${posY} ${'NESW'[dir]}`);
  }
  
  return results.join("\n");
}