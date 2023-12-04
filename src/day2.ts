import { readInputByLine } from "../src/util.ts";

function rowIsValid(row: { id: number; vals: string[] }): {
  red: number;
  green: number;
  blue: number;
} {
  var blue: number = 0;
  var red: number = 0;
  var green: number = 0;
  for (let i = 0; i < row.vals.length - 1; i = i + 2) {
    if (row.vals[i + 1] === "blue") blue = Math.max(blue, Number(row.vals[i]));
    if (row.vals[i + 1] === "green")
      green = Math.max(green, Number(row.vals[i]));
    if (row.vals[i + 1] === "red") red = Math.max(red, Number(row.vals[i]));
  }
  return { red: red, blue: blue, green: green };
}

function part1(): string {
  const inp: string[] = readInputByLine("inputs/day2Input.txt");
  const removeInit: { id: number; vals: string[] }[] = inp.map((x, id) => {
    return { id: id + 1, vals: x.replaceAll(/Game\s\d+:\s/g, "").split(/\W+/) };
  });
  const validRows: { id: number; vals: string[] }[] = removeInit.filter((x) => {
    const rgb: {
      red: number;
      green: number;
      blue: number;
    } = rowIsValid(x);
    return rgb.red <= 12 && rgb.green <= 13 && rgb.blue <= 14;
  });
  return validRows.reduce((acc, x) => acc + x.id, 0).toString();
}

function part2(): string {
  const inp: string[] = readInputByLine("inputs/day2Input.txt");
  const removeInit: { id: number; vals: string[] }[] = inp.map((x, id) => {
    return { id: id + 1, vals: x.replaceAll(/Game\s\d+:\s/g, "").split(/\W+/) };
  });
  const validRows: number[] = removeInit.map((x) => {
    const rgb: {
      red: number;
      green: number;
      blue: number;
    } = rowIsValid(x);
    return rgb.red * rgb.green * rgb.blue;
  });
  return validRows.reduce((acc, x) => acc + x, 0).toString();
}

export default { part1, part2 };
