import { readInputByLine } from "./util.ts";

enum CameFrom {
  Spawned = 0,
  North,
  NorthEast,
  East,
  SouthEast,
  South,
  SouthWest,
  West,
  NorthWest,
}

const next = new Map<{ pipe: string; prev: CameFrom }, currentPos>([
  [
    { pipe: "|", prev: 1 },
    { curr: { x: 0, y: 1 }, prev: 5 },
  ],
  [
    { pipe: "|", prev: 5 },
    { curr: { x: 0, y: -1 }, prev: 1 },
  ],
  [
    { pipe: "-", prev: 2 },
    { curr: { x: 1, y: 0 }, prev: 7 },
  ],
  [
    { pipe: "-", prev: 7 },
    { curr: { x: 1, y: 0 }, prev: 2 },
  ],
  [
    { pipe: "L", prev: 2 },
    { curr: { x: 0, y: 1 }, prev: 5 },
  ],
  [
    { pipe: "L", prev: 1 },
    { curr: { x: 1, y: 0 }, prev: 7 },
  ],
  [
    { pipe: "J", prev: 7 },
    { curr: { x: 0, y: 1 }, prev: 5 },
  ],
  [
    { pipe: "J", prev: 1 },
    { curr: { x: -1, y: 0 }, prev: 2 },
  ],
  [
    { pipe: "7", prev: 7 },
    { curr: { x: 0, y: -1 }, prev: 1 },
  ],
  [
    { pipe: "7", prev: 5 },
    { curr: { x: -1, y: 0 }, prev: 2 },
  ],
  [
    { pipe: "F", prev: 5 },
    { curr: { x: 1, y: 0 }, prev: 7 },
  ],
  [
    { pipe: "F", prev: 2 },
    { curr: { x: 0, y: -1 }, prev: 1 },
  ],
]);

type pos = { x: number; y: number };
type currentPos = { curr: pos; prev: CameFrom };

const inp: string[][] = readInputByLine("inputs/day10Input.txt").map((x) =>
  x.split("")
);

function startPos(): pos | null {
  for (let i = 0; i < inp.length; i++) {
    for (let j = 0; j < inp[i].length; j++) {
      if (inp[i][j] === "S") return { x: j, y: i };
    }
  }
  return null;
}

function part1(): string {
  const start: pos | null = startPos();
  if (start == null) return "can't find start position";
  var nextPos: currentPos | undefined = { curr: { x: 1, y: 2 }, prev: 1 };
  var steps: number = 1;
  console.log(next.has({ pipe: "|", prev: 1 }));
  while (nextPos != undefined) {
    if (inp[nextPos.curr.y][nextPos.curr.x] === "S") {
      console.log("hit");
      return (steps / 2).toString();
    }
    console.log(nextPos, "inp", inp[nextPos.curr.y][nextPos.curr.x]);
    nextPos = next.get({
      pipe: inp[nextPos.curr.y][nextPos.curr.x],
      prev: nextPos.prev,
    });
    steps = steps + 1;
  }
  return "nextPos was undefined";
}

function part2(): string {
  return "part2";
}

export default { part1, part2 };
