import a from "./a";

test.each([
  [1, "436"],
  [2, "1"],
  [3, "10"],
  [4, "27"],
  [5, "78"],
  [6, "438"],
  [7, "1836"],
])("examples a%i", (test, result) => {
  expect(a(`${__dirname}/example${test}.txt`)).toBe(result);
});

// import b from "./b";
//
// test("b examples", () => {
//   expect(b(`${__dirname}/example2.txt`)).toBe("208");
// });
