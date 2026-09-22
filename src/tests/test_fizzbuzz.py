import sys
from pathlib import Path
import pytest

# เพิ่ม Path สำหรับอ้างอิงไดเรกทอรีหลัก
sys.path.append(str(Path(_file_).resolve().parents[1]))

from fizzbuzz import fizzbuzz, is_multiple


@pytest.mark.parametrize(
    "input_val, expected",
    [
        (1, "1"),
        (3, "Fizz"),
        (5, "Buzz"),
        (7, "7"),
        (15, "FizzBuzz"),
    ],
)
def test_fizzbuzz(input_val, expected):
    assert fizzbuzz(input_val) == expected


def test_is_multiple_helper():
    assert is_multiple(10, 5) is True
    assert not is_multiple(10, 3)