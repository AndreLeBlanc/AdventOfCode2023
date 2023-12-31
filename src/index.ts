import day1 from "../src/day1.ts";
import day2 from "../src/day2.ts";
import day3 from "../src/day3.ts";
import day4 from "../src/day4.ts";
import day5 from "../src/day5.ts";
import day6 from "../src/day6.ts";
import day7 from "../src/day7.ts";
import day8 from "../src/day8.ts";
import day9 from "../src/day9.ts";
import day10 from "../src/day10.ts";
import day11 from "../src/day11.ts";

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
  case "day3": {
    runDay(day3);
    break;
  }
  case "day4": {
    runDay(day4);
    break;
  }
  case "day5": {
    runDay(day5);
    break;
  }
  case "day6": {
    runDay(day6);
    break;
  }
  case "day7": {
    runDay(day7);
    break;
  }
  case "day8": {
    runDay(day8);
    break;
  }
  case "day9": {
    runDay(day9);
    break;
  }
  case "day10": {
    runDay(day10);
    break;
  }
  case "day11": {
    runDay(day11);
    break;
  }
  default:
    console.log("can't find the day and part");
    process.exit(0);
}
