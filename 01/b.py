import pprint

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
            for c in data:
                if a == b or b == c or c == a:
                    continue
                if (a + b + c) == 2020:
                    return a * b * c


def main():
    print(solve())


if __name__ == "__main__":
    main()
