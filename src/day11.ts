import exp from "constants";
import { readInputByLine } from "./util.ts";

const inp: string[][] = readInputByLine("inputs/day11Input.txt").map((x) =>
  x.split("")
);

type pos = {
  x: number;
  y: number;
};

const galaxy: pos[] = inp.reduce<pos[]>((acc, row, i): pos[] => {
  return row.reduce<pos[]>((prev, el, j): pos[] => {
    return el === "#" ? prev.concat({ x: j, y: i }) : prev;
  }, acc);
}, []);

const emptyRows = new Set<number>(
  inp.reduce<number[]>(
    (acc, row, i) => (row.indexOf("#") !== -1 ? acc : acc.concat(i)),
    []
  )
);

var emptyCols = new Set<number>();

for (let i = 0; i < inp[0].length; i++) {
  if (inp.every((row) => row[i] === ".")) {
    emptyCols.add(i);
  }
}

function calcWithExpansion(expansion: number): string {
  var total: number = 0;
  for (let i = 0; i < galaxy.length; i++) {
    for (let j = i + 1; j < galaxy.length; j++) {
      for (
        let k = Math.min(galaxy[i].x, galaxy[j].x);
        k < Math.max(galaxy[i].x, galaxy[j].x);
        k++
      ) {
        total += emptyCols.has(k) ? expansion : 1;
      }
      for (
        let k = Math.min(galaxy[i].y, galaxy[j].y);
        k < Math.max(galaxy[i].y, galaxy[j].y);
        k++
      ) {
        total += emptyRows.has(k) ? expansion : 1;
      }
    }
  }
  return total.toString();
}

function part1(): string {
  return calcWithExpansion(2);
}

function part2(): string {
  return calcWithExpansion(1000000);
}

export default { part1, part2 };
