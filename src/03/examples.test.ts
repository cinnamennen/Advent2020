import a from "./a";
import b from "./b";

test("a examples", () => {
  expect(a("src/03/example1.txt")).toBe("7");
});
test("b examples", () => {
  expect(b("src/03/example1.txt")).toBe("336");
});
