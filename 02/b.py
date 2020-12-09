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
    return data


def solve(data=None):
    data = parse_input(data)
    regex = r"(\d+)-(\d+) (\w): (\w+)"
    count = 0
    for d in data:
        char: str
        password: str
        low, high, char, password = re.match(regex, d).groups()
        low = int(low) - 1
        high = int(high) - 1
        low = password[low] == char
        high = password[high] == char
        valid = low ^ high
        if valid:
            count += 1
    return count


def main():
    print(solve())


if __name__ == "__main__":
    main()
