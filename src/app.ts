const D = ['N', 'E', 'S', 'W'];
const M = [[0, 1], [1, 0], [0, -1], [-1, 0]];

export function commandRover(s: string): string {
  const l = s.split("\n");
  let r = [];
  
  for (let i = 1; i < l.length; i += 2) {
    let [x, y, d] = l[i].split(" ");
    let [px, py, di] = [+x, +y, D.indexOf(d)];
    
    for (let c of l[i + 1]) {
      if (c === 'M') {
        px += M[di][0];
        py += M[di][1];
      } else {
        di = (di + (c === 'L' ? 3 : 1)) % 4;
      }
    }
    
    r.push(`${px} ${py} ${D[di]}`);
  }
  
  return r.join("\n");
}