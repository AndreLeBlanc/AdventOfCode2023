import { readInputByLine } from "./util.ts";
const inp: string[] = readInputByLine("inputs/day9Input.txt");

const dataPoints: number[][] = inp.map((x: string): number[] => {
  return x.split(" ").map((el) => Number(el));
});

function scoreRow(row: number[]): number {
  if (row.filter((x) => x !== 0).length === 0) return 0;
  const diffs: number[] = [];
  for (let i = 0; i < row.length - 1; i++) {
    diffs.push(row[i + 1] - row[i]);
  }
  return row[row.length - 1] + scoreRow(diffs);
}

function part1(): string {
  const scores: number[] = dataPoints.map(scoreRow);
  return scores.reduce((acc, el) => acc + el, 0).toString();
}

function part2(): string {
  const scores: number[] = dataPoints.map((el) => scoreRow(el.reverse()));
  return scores.reduce((acc, el) => acc + el, 0).toString();
}

export default { part1, part2 };
