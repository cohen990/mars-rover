export function commandRover(instructions: string): string {
  const lines = instructions.split("\n");
  const results = [];
  
  for (let i = 1; i < lines.length; i += 2) {
    const parts = lines[i].split(" ");
    let x = +parts[0], y = +parts[1], d = 'NESW'.indexOf(parts[2]);
    
    const commands = lines[i + 1];
    for (let j = 0; j < commands.length; j++) {
      const cmd = commands[j];
      if (cmd === 'M') {
        if (d & 1) x += d === 1 ? 1 : -1;
        else y += d === 0 ? 1 : -1;
      } else {
        d = cmd === 'L' ? (d + 3) & 3 : (d + 1) & 3;
      }
    }
    
    results.push(x + " " + y + " " + 'NESW'[d]);
  }
  
  return results.join("\n");
}