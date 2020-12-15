import Point from "./point";
import { Map, Seq } from "immutable";
import { range } from "lodash";
import { isDefined } from "ts-is-present";

export enum Y {
  BOTTOM,
  TOP,
}

export enum X {
  LEFT,
  RIGHT,
}

export const defaultPrintFunction = (value?: any) => {
  if (isDefined(value)) return value.toString();
};

export default class World<V> extends Object {
  private readonly printWidth: number;
  public world: Map<Point, V>;
  private readonly printFunction: (value?: V) => string;

  constructor(printFunction = defaultPrintFunction, printWidth: number = 1) {
    super();
    this.printFunction = printFunction;
    this.printWidth = printWidth;
    this.world = Map();
  }

  private get _x_set() {
    return this.world.keySeq().map((p) => p.x);
  }

  private get _y_set(): Seq.Indexed<number> {
    return this.world.keySeq().map((p) => p.y);
  }

  get minX(): number {
    return this._x_set.min() as number;
  }

  get minY(): number {
    return this._y_set.min() as number;
  }

  get maxX(): number {
    return this._x_set.max() as number;
  }

  get maxY(): number {
    return this._y_set.max() as number;
  }

  yRange(lowY?: Y) {
    if (lowY === Y.BOTTOM) {
      return range(this.maxY, this.minY - 1, -1);
    } else {
      return range(this.minY, this.maxY + 1);
    }
  }

  xRange(lowX?: X) {
    if (lowX === X.LEFT) {
      return range(this.minX, this.maxX + 1);
    } else {
      return range(this.maxX, this.minX - 1, 1);
    }
  }

  printWorld({
    lowX = X.LEFT,
    lowY = Y.BOTTOM,
  }: { lowX?: X; lowY?: Y } = {}): void {
    let output = "";
    for (const y of this.yRange(lowY)) {
      let line: string = "";
      for (const x of this.xRange(lowX)) {
        for (const l of range(this.printWidth)) {
          line += this.printFunction(this.world.get(new Point(x, y)));
        }
      }
      output += line + "\n";
    }
    // tslint:disable-next-line:no-console
    console.log(output);
  }

  set(point: Point, n: V) {
    this.world = this.world.set(point, n);
  }
}
