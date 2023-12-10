import { readInputByLine } from "./util.ts";

type mapStep = {
  dest: number;
  source: number;
  range: number;
};

type seeds = number[];
type seedPair = { lower: number; upper: number };
type soilmap = {
  seedToSoil: mapStep[];
  soilToFert: mapStep[];
  fertToWater: mapStep[];
  waterToLight: mapStep[];
  lightToTemp: mapStep[];
  tempToHumidity: mapStep[];
  humidityToLocation: mapStep[];
};

function toIntArr(row: string): number[] {
  const elByString: string[] = row.split(/(\s+)/).filter(function (e) {
    return e.trim().length > 0;
  });
  return elByString.map((x) => Number(x));
}

function parseInpToSoilmap(inp: string[]): soilmap {
  function toMapStep(row: string): mapStep {
    const dsr: number[] = toIntArr(row);
    return { dest: dsr[0], source: dsr[1], range: dsr[2] };
  }
  function makeMapSteps(startRow: string, endRow: string) {
    return inp
      .slice(
        inp.indexOf(startRow) + 1,
        inp.indexOf(endRow) !== -1 ? inp.indexOf(endRow) : inp.length
      )
      .map((x) => toMapStep(x));
  }

  return {
    seedToSoil: makeMapSteps("seed-to-soil map:", "soil-to-fertilizer map:"),
    soilToFert: makeMapSteps(
      "soil-to-fertilizer map:",
      "fertilizer-to-water map:"
    ),
    fertToWater: makeMapSteps(
      "fertilizer-to-water map:",
      "water-to-light map:"
    ),
    waterToLight: makeMapSteps(
      "water-to-light map:",
      "light-to-temperature map:"
    ),
    lightToTemp: makeMapSteps(
      "light-to-temperature map:",
      "temperature-to-humidity map:"
    ),
    tempToHumidity: makeMapSteps(
      "temperature-to-humidity map:",
      "humidity-to-location map:"
    ),
    humidityToLocation: makeMapSteps("humidity-to-location map:", ""),
  };
}

function findNextLoc(map: mapStep[], curr: number): number {
  for (let i = 0; i < map.length; i++) {
    if (map[i].source <= curr && curr <= map[i].source + map[i].range) {
      return map[i].dest + curr - map[i].source;
    }
  }
  return curr;
}

function seedToLocations(parsedInp: soilmap, seed: number): number {
  for (const [key, value] of Object.entries(parsedInp)) {
    seed = findNextLoc(value, seed);
  }
  return seed;
}

function part1(): string {
  const inp: string[] = readInputByLine("inputs/day5Input.txt");
  const parsedInp: soilmap = parseInpToSoilmap(inp);
  const seeds: seeds = toIntArr(inp[0]?.split(":")[1]);
  const locations: number[] = seeds.map((x) => seedToLocations(parsedInp, x));
  return Math.min(...locations).toString();
}

function findNextRanges(map: mapStep[], curr: seedPair[]): seedPair[] {
  var nextRanges: seedPair[] = [];
  function step(i: number): { res: seedPair; new: seedPair[] } {
    for (let j = 0; j < map.length; j++) {
      if (
        map[j].source <= curr[i].lower &&
        curr[i].lower < map[j].source + map[j].range
      ) {
        if (curr[i].upper + curr[i].lower <= map[j].source + map[j].range) {
          return {
            res: {
              lower: map[j].dest + curr[i].lower - map[j].source,
              upper: curr[i].upper,
            },
            new: [],
          };
        } else {
          return {
            res: {
              lower: map[j].dest + curr[i].lower - map[j].source,
              upper: map[j].range + map[j].source - curr[i].lower,
            },
            new: [
              {
                lower: map[j].source + map[j].range,
                upper:
                  curr[i].lower +
                  curr[i].upper -
                  (map[j].source + map[j].range),
              },
            ],
          };
        }
      }
    }
    return { res: curr[i], new: [] };
  }

  let i: number = 0;
  while (i < curr.length) {
    const ranges: { res: seedPair; new: seedPair[] } = step(i);
    nextRanges.push(ranges.res);
    if (0 < ranges.new.length && ranges.new[0].upper > 0) {
      curr.push(ranges.new[0]);
    }
    i += 1;
  }
  return nextRanges;
}

function seedRangesToLocations(parsedInp: soilmap, seed: seedPair[]): number {
  for (const [key, value] of Object.entries(parsedInp)) {
    seed = findNextRanges(value, seed);
  }
  return seed.reduce((acc, x) => (acc < x.lower ? acc : x.lower), Infinity);
}

function part2(): string {
  const inp: string[] = readInputByLine("inputs/day5Input.txt");
  const parsedInp: soilmap = parseInpToSoilmap(inp);
  const seeds: seeds = toIntArr(inp[0]?.split(":")[1]);
  const seedRanges: seedPair[] = seeds.reduce(function (
    result: seedPair[],
    value: number,
    index: number,
    array: number[]
  ) {
    if (index % 2 === 0) result.push({ lower: value, upper: array[index + 1] });
    return result;
  },
  []);
  const locations: number[] = seedRanges
    .map((x) => seedRangesToLocations(parsedInp, [x]))
    .flat();
  return Math.min(...locations).toString();
}

export default { part1, part2 };
