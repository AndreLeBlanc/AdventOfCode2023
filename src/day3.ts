import { readInputByLine } from "./util.ts";

function part1(): string {
  const inp: string[] = readInputByLine("inputs/day3Input.txt");
  var digits: string = "";
  var sum: number = 0;
  var attached: boolean = false;

  function checkAttached(i: number, j: number): boolean {
    function isSymbol(el: string): boolean {
      const char: number = el.charCodeAt(0);
      return 46 !== char && !(48 <= char && char <= 57);
    }
    const isTop: boolean = i === 0;
    const isBottom: boolean = i === inp.length - 1;
    const isLeft: boolean = j === 0;
    const isRight: boolean = j === inp[i].length - 1;

    return (
      (!isTop &&
        ((!isLeft && isSymbol(inp[i - 1][j - 1])) ||
          isSymbol(inp[i - 1][j]) ||
          (!isRight && isSymbol(inp[i - 1][j + 1])))) ||
      (!isLeft && isSymbol(inp[i][j - 1])) ||
      (!isRight && isSymbol(inp[i][j + 1])) ||
      (!isBottom &&
        ((!isLeft && isSymbol(inp[i + 1][j - 1])) ||
          isSymbol(inp[i + 1][j]) ||
          (!isRight && isSymbol(inp[i + 1][j + 1]))))
    );
  }
  for (let i = 0; i < inp.length; i++) {
    for (let j = 0; j < inp[0].length; j++) {
      if (/^\d+$/.test(inp[i][j])) {
        digits = digits.concat(inp[i][j]);
        if (!attached) {
          attached = checkAttached(i, j);
        }
      }
      if (!/^\d+$/.test(inp[i][j]) || j === inp[i].length - 1) {
        if (digits.length > 0 && attached) {
          sum += Number(digits);
        }
        digits = "";
        attached = false;
      }
    }
  }
  return sum.toString();
}

function part2(): string {
  const inp: string[] = readInputByLine("inputs/day3Input.txt");
  var sum: number = 0;

  function addGear(ii: number, jj: number): number {
    const iMin: number = ii === 0 ? ii : ii - 1;
    const iMax: number = ii === inp.length - 1 ? ii : ii + 1;
    const jMin: number = jj === 0 ? jj : jj - 1;
    const jMax: number = jj === inp[ii].length - 1 ? jj : jj + 1;

    function isDigit(el: string): boolean {
      const char: number = el.charCodeAt(0);
      return 48 <= char && char <= 57;
    }

    function buildGear(y: number, x: number): number {
      var gear: string = "";
      var i: number = x;
      while (0 <= i && isDigit(inp[y][i])) {
        gear = inp[y][i].concat(gear);
        i--;
      }
      i = x + 1;
      while (i < inp[y].length && isDigit(inp[y][i])) {
        gear = gear.concat(inp[y][i]);
        i++;
      }
      return Number(gear);
    }

    var prev: boolean = true;
    var gear: number[] = [];
    for (let i = iMin; i <= iMax; i++) {
      for (let j = jMin; j <= jMax; j++) {
        if (isDigit(inp[i][j])) {
          if (prev) {
            gear.push(buildGear(i, j));
            prev = false;
          }
        } else {
          prev = true;
        }
      }
      prev = true;
    }
    return gear.length === 2 ? gear[0] * gear[1] : 0;
  }

  for (let i = 0; i < inp.length; i++) {
    for (let j = 0; j < inp[0].length; j++) {
      if ("*" === inp[i][j]) {
        sum += addGear(i, j);
      }
    }
  }
  return sum.toString();
}
export default { part1, part2 };
