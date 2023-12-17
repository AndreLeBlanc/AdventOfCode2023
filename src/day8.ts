import { readInputByLine } from "./util.ts";
const inp: string[] = readInputByLine("inputs/day8Input.txt");
const directions: string[] = [...inp[0]];
const nodes = new Map(
  inp.slice(1).map((x) => [
    x.substring(0, 3),
    {
      left: x.substring(7, 10),
      right: x.substring(12, 15),
    },
  ])
);

function numberOfSteps(init: number, start: string): number {
  var steps: number = 0;
  while (start.slice(init, 3) !== "ZZZ".slice(init, 3)) {
    const branch: { left: string; right: string } | undefined =
      nodes.get(start);
    if (branch === undefined) {
      return -1;
    }
    if (directions[steps % directions.length] === "L") {
      start = branch.left;
    } else {
      start = branch.right;
    }
    steps += 1;
  }
  return steps;
}

function part1(): string {
  return numberOfSteps(0, "AAA").toString();
}

function part2(): string {
  const startingRows: string[] = inp.filter((x) => x.charAt(2) === "A");
  const startingPoints: string[] = startingRows.map((x) => x.slice(0, 3));
  const stepCount: number[] = startingPoints.map((x) => numberOfSteps(2, x));
  function gcd(a: number, b: number): number {
    return a ? gcd(b % a, a) : b;
  }
  function lcm(a: number, b: number): number {
    return (a * b) / gcd(a, b);
  }
  return stepCount.reduce(lcm).toString();
}

export default { part1, part2 };
