import Point, { compare, ZeroPoint } from "./point";

describe("Point", () => {
  test("printing", () => {
    expect(new Point(1, 2, 3).toString()).toBe("(1,2,3)");
    expect(new Point(10).toString()).toBe("(10)");
  });
  test("addition", () => {
    expect(new Point(1, 2, 3).add(new Point(1, 2, 3))).toEqual(
      new Point(2, 4, 6)
    );
    expect(new Point(10, 0).add(new Point(0, 3))).toEqual(new Point(10, 3));
  });
  test("subtraction", () => {
    expect(new Point(2, 4, 6).sub(new Point(1, 2, 3))).toEqual(
      new Point(1, 2, 3)
    );
  });
  test("multiplication", () => {
    expect(new Point(1, 2, 3).mul(2)).toEqual(new Point(2, 4, 6));
  });
  test.each([0, 1, 2, 3])("access %i", (a) => {
    expect(new Point(0, 1, 2, 3)[a]).toBe(a);
  });
  test.each([
    [new Point(10, 0), 10],
    [new Point(10), 10],
    [new Point(10, 10, 10), 30],
    [new Point(-10, 10), 20],
  ])("zero distance %o %i", (point: Point, distance: number) => {
    expect(point.zero_distance()).toBe(distance);
  });

  test("adjacent", () => {
    expect(new Point(2, 2).adjacent().sort(compare)).toEqual(
      [new Point(2, 3), new Point(1, 2), new Point(2, 1), new Point(3, 2)].sort(
        compare
      )
    );
  });
});

describe("ZeroPoint", () => {
  test("initializes", () => {
    expect(new ZeroPoint(4)).toEqual(new Point(0, 0, 0, 0));
  });
});

describe("sorts", () => {
  test("complex", () => {
    function shuffleArray<T>(array: T[]): T[] {
      const x = array.slice();
      for (let i = x.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [x[i], x[j]] = [x[j], x[i]];
      }
      return array;
    }

    const ordered = [
      new Point(0, 0, 0),
      new Point(0, 0, 1),
      new Point(0, 1, 0),
      new Point(0, 1, 1),
      new Point(1, 0, 0),
      new Point(1, 0, 1),
      new Point(1, 1, 0),
      new Point(1, 1, 1),
      new Point(2, 2, 2),
      new Point(3, 3, -1),
      new Point(4, 4, 4),
      new Point(5, 5, 5),
    ];
    expect(
      shuffleArray(ordered)
        .sort(compare)
        .map((x) => x.toString())
    ).toEqual(ordered.map((x) => x.toString()));
  });
  test("short", () => {
    expect(
      [new Point(1, 0), new Point(0, 1)].sort(compare).map((x) => x.toString())
    ).toEqual([new Point(0, 1), new Point(1, 0)].map((x) => x.toString()));
  });
});
