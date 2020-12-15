import pprint
import re
from typing import List

pp = pprint.PrettyPrinter(indent=4)


def read_input():
    file = "input.txt"
    with open(file) as f:
        return f.readlines()


def parse_input(data: str = None):
    if not data:
        data = read_input()
    else:
        data = data.splitlines()
    data = [_.strip() for _ in data]
    return list(map(int, data))


def solve(data=None):
    data = parse_input(data)
    for a in data:
        for b in data:
            if a == b:
                continue
            if (a + b) == 2020:
                return a * b


def main():
    print(solve())


if __name__ == "__main__":
    main()
