import a, { getCol, getRow, getSeat } from "./a";
// import b from "./b";

test.each([
  ["FBFBBFF", 44],
  ["BFFFBBF", 70],
  ["FFFBBBF", 14],
  ["BBFFBBF", 102],
])("row %s", (a, e) => {
  expect(getRow(a)).toBe(e);
});
test.each([
  ["RLR", 5],
  ["RRR", 7],
  ["RRR", 7],
  ["RLL", 4],
])("col %s", (a, e) => {
  expect(getCol(a)).toBe(e);
});
test.each([
  ["FBFBBFFRLR", 357],
  ["BFFFBBFRRR", 567],
  ["FFFBBBFRRR", 119],
  ["BBFFBBFRLL", 820],
])("seat %s", (a, e) => {
  expect(getSeat(a)).toBe(e);
});

// test("b examples", () => {
//   expect(b("src/05/example2.txt")).toBe("0");
// });
// test("b examples", () => {
//   expect(b("src/05/example3.txt")).toBe("4");
// });
