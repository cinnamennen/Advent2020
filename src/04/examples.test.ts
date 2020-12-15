import a from "./a";
import b from "./b";

test("a examples", () => {
  expect(a("src/04/example1.txt")).toBe("2");
});
test("b examples", () => {
  expect(b("src/04/example2.txt")).toBe("0");
});
test("b examples", () => {
  expect(b("src/04/example3.txt")).toBe("4");
});
