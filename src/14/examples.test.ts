import a, { applyMask } from "./a";

test.each([
  [11, 73],
  [101, 101],
  [0, 64],
])("masking", (input, value) => {
  expect(
    applyMask("XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X", BigInt(input)).toString()
  ).toBe(value.toString());
});

test("another mask", () => {
  expect(
    applyMask("1XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", BigInt(0)).toString()
  ).toEqual(BigInt("0b100000000000000000000000000000000000").toString());
});

test("a examples", () => {
  expect(a(`${__dirname}/example1.txt`)).toBe("165");
});

import b from "./b";

test("b examples", () => {
  expect(b(`${__dirname}/example2.txt`)).toBe("208");
});
