import day1 from "../src/day1";
import day2 from "../src/day2";
import day3 from "../src/day3";
import day4 from "../src/day4";
import day5 from "../src/day5";
import day6 from "../src/day6";

test("day 1, part 1", () => {
  expect(day1.part1()).toBe("54708");
});

test("day 1, part 2", () => {
  expect(day1.part2()).toBe("54087");
});

test("day 2, part 1", () => {
  expect(day2.part1()).toBe("2331");
});

test("day 2, part 2", () => {
  expect(day2.part2()).toBe("71585");
});

test("day 3, part 1", () => {
  expect(day3.part1()).toBe("535351");
});

test("day 3, part 2", () => {
  expect(day3.part2()).toBe("87287096");
});

test("day 4, part 1", () => {
  expect(day4.part1()).toBe("21088");
});

test("day 4, part 2", () => {
  expect(day4.part2()).toBe("6874754");
});

test("day 5, part 1", () => {
  expect(day5.part1()).toBe("825516882");
});

test("day 5, part 2", () => {
  expect(day5.part2()).toBe("136096660");
});

test("day 6, part 1", () => {
  expect(day6.part1()).toBe("220320");
});

test("day 6, part 2", () => {
  expect(day6.part2()).toBe("34454850");
});
