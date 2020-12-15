import importlib
import unittest

a_solve = getattr(importlib.import_module("02.a"), "solve")
b_solve = getattr(importlib.import_module("02.b"), "solve")


class TestAExamples(unittest.TestCase):
    def test_one(self):
        self.assertEqual(
            2,
            a_solve(
                data="""1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc"""
            ),
        )


class TestBExamples(unittest.TestCase):
    def test_one(self):
        self.assertEqual(
            1,
            b_solve(
                data="""1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc"""
            ),
        )
