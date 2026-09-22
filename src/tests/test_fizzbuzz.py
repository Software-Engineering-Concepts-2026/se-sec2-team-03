import sys
from pathlib import Path
import pytest

# กำหนด Path สำหรับดึงไฟล์จาก src
SRC_DIR = Path(__file__).resolve().parent.parent / "src"
if str(SRC_DIR) not in sys.path:
    sys.path.insert(0, str(SRC_DIR))

from fizzbuzz import fizzbuzz, is_multiple


# 1. รวบเคสทดสอบ fizzbuzz ด้วย Parametrize
@pytest.mark.parametrize(
    "number, expected",
    [
        (1, "1"),
        (3, "Fizz"),
        (5, "Buzz"),
        (15, "FizzBuzz"),
        (7, "7"),
    ],
)
def test_fizzbuzz(number, expected):
    assert fizzbuzz(number) == expected


# 2. เคสทดสอบ Helper Function
@pytest.mark.parametrize(
    "number, multiple, expected",
    [
        (10, 5, True),
        (10, 3, False),
    ],
)
def test_is_multiple(number, multiple, expected):
    assert is_multiple(number, multiple) is expected