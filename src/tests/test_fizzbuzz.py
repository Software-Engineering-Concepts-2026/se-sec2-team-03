import sys
from pathlib import Path

SRC_DIR = Path(__file__).resolve().parent.parent
if str(SRC_DIR) not in sys.path:
    sys.path.insert(0, str(SRC_DIR))

from fizzbuzz import fizzbuzz, is_multiple


def test_fizzbuzz_three():
    assert fizzbuzz(3) == "Fizz"


def test_fizzbuzz_one():
    assert fizzbuzz(1) == "1"


def test_fizzbuzz_five():
    assert fizzbuzz(5) == "Buzz"


def test_fizzbuzz_fifteen():
    assert fizzbuzz(15) == "FizzBuzz"


def test_fizzbuzz_seven():
    assert fizzbuzz(7) == "7"


def test_is_multiple_helper():
    assert is_multiple(10, 5) is True
    assert is_multiple(10, 3) is False