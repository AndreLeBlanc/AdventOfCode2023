import { readInputByLine } from "./util.ts";

function part1(): string {
  const inp: string[] = readInputByLine("inputs/day4Input.txt");
  function scoreCard(acc: number, card: string): number {
    const winningAndMine: string = card?.split(":")[1];
    const splitMineAndWinning: string[] = winningAndMine?.split("|");
    const winning = new Set<string>(
      (splitMineAndWinning[0] ?? "").split(/(\s+)/).filter(function (e) {
        return e.trim().length > 0;
      })
    );
    return (
      splitMineAndWinning[1]
        .split(/(\s+)/)
        .filter(function (e) {
          return e.trim().length > 0;
        })
        .reduce((add: number, num: string) => {
          if (winning.has(num)) {
            return add === 0 ? 1 : add * 2;
          }
          return add;
        }, 0) + acc
    );
  }
  return inp.reduce(scoreCard, 0).toString();
}

function part2(): string {
  const inp: string[] = readInputByLine("inputs/day4Input.txt");
  function scoreCard(card: string): number {
    const winningAndMine: string = card?.split(":")[1];
    const splitMineAndWinning: string[] = winningAndMine?.split("|");
    const winning = new Set<string>(
      (splitMineAndWinning[0] ?? "").split(/(\s+)/).filter(function (e) {
        return e.trim().length > 0;
      })
    );
    return splitMineAndWinning[1]
      .split(/(\s+)/)
      .filter(function (e) {
        return e.trim().length > 0;
      })
      .reduce(
        (add: number, num: string) => (winning.has(num) ? add + 1 : add),
        0
      );
  }
  const cardScores: number[] = inp.map(scoreCard);
  var sums: number[] = new Array<number>(cardScores.length).fill(1);
  for (let i = cardScores.length - 1; i >= 0; i--) {
    for (let j = i + 1; j <= i + cardScores[i] && j < cardScores.length; j++) {
      sums[i] += sums[j];
    }
  }
  return sums.reduce((acc, el) => acc + el, 0).toString();
}

export default { part1, part2 };
