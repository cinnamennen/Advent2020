import a from "./a";
import b from "./b";

test("a examples", () => {
  expect(a("src/06/example1.txt")).toBe("11");
});

test("b examples", () => {
  expect(b("src/06/example1.txt")).toBe("6");
});
