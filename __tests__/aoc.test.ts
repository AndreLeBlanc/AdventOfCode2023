import day1 from "../src/day1";
import day2 from "../src/day2";

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
