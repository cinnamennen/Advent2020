import RuntimeError = WebAssembly.RuntimeError;
import { ValueObject } from "immutable";

export default class Point extends Array<number> implements ValueObject {
  constructor(...args: number[]) {
    if (args.length === 1) {
      // Bc js has a weird constructor for Array(single_number)
      super(1);
      this[0] = args[0];
    } else {
      super(...args);
    }
  }

  toString(): string {
    return `(${this.join(",")})`;
  }

  add(point: Point): Point {
    return new Point(...this.map((a, index) => a + point[index]));
  }

  sub(point: Point): Point {
    return new Point(...this.map((a, index) => a - point[index]));
  }

  mul(b: number): Point {
    return new Point(...this.map((a) => a * b));
  }

  mod(point: Point): Point {
    return new Point(...this.map((a, index) => a % point[index]));
  }

  get x(): number {
    return this[0];
  }

  get y(): number {
    return this[1];
  }

  get z(): number {
    return this[2];
  }

  zero_distance(): number {
    return this.distance_to(this.zero_point());
  }

  zero_point(): Point {
    return new ZeroPoint(this.length);
  }

  distance_to(point: Point): number {
    return this.map((a, index) => Math.abs(a - point[index])).reduce(
      (a, b) => a + b,
      0
    );
  }

  adjacent() {
    return [
      new Point(-1, 0),
      new Point(1, 0),
      new Point(0, -1),
      new Point(0, 1),
    ].map((p) => p.add(this));
  }

  equals(other: Point): boolean {
    return this.map((a, index) => a === other[index]).reduce(
      (previousValue, currentValue) => previousValue && currentValue
    );
  }

  hashCode(): number {
    return parseInt(
      this.map((v) => v.toString()).reduce(
        (previousValue, currentValue) => previousValue + currentValue
      ),
      10
    );
  }
}

export class ZeroPoint extends Point {
  constructor(props: number) {
    super(...Array<number>(props).fill(0));
  }
}

export function compare(a: Point, b: Point): number {
  if (a.length !== b.length) throw RuntimeError;
  let i: number;
  for (i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) break;
  }
  if (i === a.length) return 0;
  return a[i] - b[i];
}

export const Direction = {
  UP: new Point(0, 1),
  DOWN: new Point(0, -1),
  LEFT: new Point(-1, 0),
  RIGHT: new Point(1, 0),
} as const;

export const FileDirection = {
  RIGHT: new Point(0, 1),
  LEFT: new Point(0, -1),
  UP: new Point(-1, 0),
  DOWN: new Point(1, 0),
} as const;
