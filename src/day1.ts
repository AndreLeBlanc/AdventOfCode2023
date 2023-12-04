import { readInputByLine } from "../src/util.ts";

function part1(): string {
  const inp: string[] = readInputByLine("inputs/day1Input.txt");
  const sum = inp.reduce((acc: number, curr: string): number => {
    const digits = curr.replace(/\D+/g, "");
    return acc + Number(digits[0] + digits[digits.length - 1]);
  }, 0);
  return sum.toString();
}

function part2(): string {
  const inp: string[] = readInputByLine("inputs/day1Input.txt");
  const digits: any = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ].reduce((o, x, i) => ({ ...o, [x]: i + 1 }), {});

  const matchOverlaps: (x: string) => number[] = (x: string) => {
    const re = /((?=(one|two|three|four|five|six|seven|eight|nine))|\d)/g;
    return [...x.matchAll(re)].map(([_, number, digit]) =>
      Number(digits?.[digit] ?? number)
    );
  };

  return inp
    .map(matchOverlaps)
    .map((e) => e[0] * 10 + e[e.length - 1])
    .reduce((sum, value) => sum + value, 0)
    .toString();
}

export default { part1, part2 };
