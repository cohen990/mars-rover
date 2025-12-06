const DX = [0, 1, 0, -1];
const DY = [1, 0, -1, 0];

export function commandRover(instructions: string): string {
  const lines = instructions.split("\n");
  const results = [];
  
  for (let i = 1; i < lines.length; i += 2) {
    const parts = lines[i].split(" ");
    let x = +parts[0], y = +parts[1], d = 'NESW'.indexOf(parts[2]);
    
    for (const command of lines[i + 1]) {
      if (command === 'M') {
        x += DX[d];
        y += DY[d];
      } else {
        d = (d + (command === 'L' ? 3 : 1)) & 3;
      }
    }
    
    results.push(x + " " + y + " " + 'NESW'[d]);
  }
  
  return results.join("\n");
}