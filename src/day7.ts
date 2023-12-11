import { readInputByLine } from "./util.ts";

type handBid = {
  cards: string;
  bid: number;
};

type ranked = {
  handBid: handBid;
  type: number;
  highCards: number[];
};

type cardCounts = {
  [key: string]: number;
};

function parseInp(inp: string[]): handBid[] {
  return inp.map((x) => {
    const handNBid: string[] = x.split(" ");
    return { cards: handNBid[0], bid: Number(handNBid[1]) };
  });
}

function evaluate(withJokers: boolean, player: handBid): ranked {
  const cardVal: number[] = [...player.cards].map((x) => {
    const asNum: number = Number(x);
    if (!isNaN(asNum)) return asNum;
    switch (x) {
      case "T": {
        return 10;
      }
      case "J": {
        return withJokers ? 1 : 11;
      }
      case "Q": {
        return 12;
      }
      case "K": {
        return 13;
      }
      default: {
        return 14;
      }
    }
  });

  const charCounts: cardCounts = Array.from(player.cards).reduce(
    (counts, char) => {
      counts[char] = (counts[char] || 0) + 1;
      return counts;
    },
    Object.create(null)
  );
  const numJokers: number = charCounts["J"] > 0 ? charCounts["J"] : 0;
  if (withJokers) {
    delete charCounts["J"];
  }
  const sorted: number[] = Object.values(charCounts).sort().reverse();
  function sortedToType(sortedCards: number[]) {
    if (numJokers === 5 && withJokers) return 6;
    const mostCommon: number = withJokers
      ? sortedCards[0] + numJokers
      : sortedCards[0];
    if (4 <= mostCommon) return mostCommon + 1;
    if (3 === mostCommon) return sortedCards[1] + 2;
    if (2 === mostCommon) return 2 === sortedCards[1] ? 2 : 1;
    return 0;
  }

  return {
    handBid: player,
    type: sortedToType(sorted),
    highCards: cardVal,
  };
}

function part1(): string {
  const inp: string[] = readInputByLine("inputs/day7Input.txt");
  const players: handBid[] = parseInp(inp);
  const evaluateHands: ranked[] = players.map((x) => evaluate(false, x));
  const rank: ranked[] = evaluateHands.sort((a, b) => {
    if (a.type === b.type) {
      for (let i = 0; i < a.highCards.length; i++) {
        if (a.highCards[i] !== b.highCards[i])
          return a.highCards[i] - b.highCards[i];
      }
    }
    return a.type - b.type;
  });
  const res: number = rank.reduce(
    (acc, el, i) => acc + el.handBid.bid * (i + 1),
    0
  );
  return res.toString();
}

function part2(): string {
  const inp: string[] = readInputByLine("inputs/day7Input.txt");
  const players: handBid[] = parseInp(inp);
  const evaluateHands: ranked[] = players.map((x) => evaluate(true, x));
  const rank: ranked[] = evaluateHands.sort((a, b) => {
    if (a.type === b.type) {
      for (let i = 0; i < a.highCards.length; i++) {
        if (a.highCards[i] !== b.highCards[i])
          return a.highCards[i] - b.highCards[i];
      }
    }
    return a.type - b.type;
  });
  const res: number = rank.reduce(
    (acc, el, i) => acc + el.handBid.bid * (i + 1),
    0
  );

  return res.toString();
}

export default { part1, part2 };
