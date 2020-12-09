import importlib
import unittest

a_solve = getattr(importlib.import_module("03.a"), "solve")
# b_solve = getattr(importlib.import_module("03.b"), "solve")


class TestAExamples(unittest.TestCase):
    def test_one(self):
        self.assertEqual(
            7,
            a_solve(
                data=(
                    "..##.......\n"
                    "#...#...#..\n"
                    ".#....#..#.\n"
                    "..#.#...#.#\n"
                    ".#...##..#.\n"
                    "..#.##.....\n"
                    ".#.#.#....#\n"
                    ".#........#\n"
                    "#.##...#...\n"
                    "#...##....#\n"
                    ".#..#...#.#"
                )
            ),
        )
