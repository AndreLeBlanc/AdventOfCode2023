import * as fs from "fs";

export function readInput(inputFilePath: string): string {
  const data = fs.readFileSync("inputFilePath", "utf8");
  return data;
}

export function readInputByLine(inputFilePath: string): string[] {
  const data = fs.readFileSync(inputFilePath, "utf8");
  return data.split("\n").filter((line) => line.length > 0);
}
