import day1 from "../src/day1.ts";
import day2 from "../src/day2.ts";

function runDay(day: any): void {
  if (process.argv[3] === "part1" || process.argv[3] === "all") {
    console.log(day.part1());
  }
  if (process.argv[3] === "part2" || process.argv[3] === "all") {
    console.log(day.part2());
  }
}

switch (process.argv[2]) {
  case "day1": {
    runDay(day1);
    break;
  }
  case "day2": {
    runDay(day2);
    break;
  }
  default:
    console.log("can't find the day and part");
    process.exit(0);
}
