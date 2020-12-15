import World from "./world";
import Point from "./point";

test("min/max", () => {
  const w = new World();
  [0, 1, 2, 3, 4].forEach((i) => w.set(new Point(i, i), 100));
  expect(w.minX).toBe(0);
  expect(w.minY).toBe(0);
  expect(w.maxX).toBe(4);
  expect(w.maxY).toBe(4);
});

test("has", () => {
  const w = new World();
  [0, 1, 2, 3, 4].forEach((i) => w.set(new Point(i, i), 100));
  expect(w.world.has(new Point(2, 2))).toBeTruthy();
});
