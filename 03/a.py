import pprint
from typing import List

from cinnamon_tools.point import Point
from cinnamon_tools.world import World

pp = pprint.PrettyPrinter(indent=4)


def read_input():
    file = "input.txt"
    with open(file) as f:
        return f.readlines()


def parse_input(data: str = None) -> List[str]:
    if not data:
        data_out = read_input()
    else:
        data_out = data.splitlines()
    return [_.strip() for _ in data_out]


def solve(data=None):
    data = parse_input(data)
    pp.pprint(data)
    w = World()
    for row, y in enumerate(data):
        for value, x in enumerate(row):
            w[Point(x, y)] = value
    return 1


def main():
    print(solve())


if __name__ == "__main__":
    main()
