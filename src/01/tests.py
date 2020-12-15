import importlib
import unittest

a_solve = getattr(importlib.import_module("01.a"), "solve")
b_solve = getattr(importlib.import_module("01.b"), "solve")


class TestAExamples(unittest.TestCase):
    def test_one(self):
        self.assertEqual(
            514579,
            a_solve(
                data="""1721
979
366
299
675
1456"""
            ),
        )


class TestBExamples(unittest.TestCase):
    def test_one(self):
        self.assertEqual(
            241861950,
            b_solve(
                data="""1721
979
366
299
675
1456"""
            ),
        )
