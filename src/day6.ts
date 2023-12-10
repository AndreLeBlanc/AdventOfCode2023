import { readInputByLine } from "../src/util.ts";

type game = {
  times: number[];
  distances: number[];
};

function calcRes(game: game): string {
  const res: number = game.times?.reduce((acc, el, i) => {
    let discriminant = el * el - 4 * game.distances[i];
    const root1: number = (-el + Math.sqrt(discriminant)) / 2;
    const root2: number = (-el - Math.sqrt(discriminant)) / 2;
    return acc * (Math.floor(root1) - Math.floor(root2));
  }, 1);

  return res?.toString();
}

function part1(): string {
  const inp: string[] = readInputByLine("inputs/day6Input.txt");
  const gameString: string[][] = inp?.map((x) =>
    x
      .split(":")[1]
      ?.split(/(\s+)/)
      .filter(function (e) {
        return e.trim().length > 0;
      })
  );

  const game: game = {
    times: gameString[0]?.map((x) => Number(x)),
    distances: gameString[1]?.map((x) => Number(x)),
  };
  return calcRes(game);
}

function part2(): string {
  const inp: string[] = readInputByLine("inputs/day6Input.txt");
  const gameString: string[][] = inp?.map((x) =>
    x
      .split(":")[1]
      ?.split(/(\s+)/)
      .filter(function (e) {
        return e.trim().length > 0;
      })
  );

  const game: game = {
    times: [Number(gameString[0]?.reduce((acc, x) => acc + x, ""))],
    distances: [Number(gameString[1]?.reduce((acc, x) => acc + x, ""))],
  };
  return calcRes(game);
}

export default { part1, part2 };
