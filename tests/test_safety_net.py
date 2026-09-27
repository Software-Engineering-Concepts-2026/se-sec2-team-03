"""Unit tests for calculate_discount function (Lab 12B Phase B - Safety Net).

Test suite applying AAA pattern across:
- 2 Happy Path cases
- 2 Boundary / Edge cases
- 2 Error / Exception cases
"""
import pytest
from app import calculate_discount


# ==============================================================================
# 1. Happy Path Cases
# ==============================================================================

def test_calculate_discount_standard_percentage():
    """Happy Path: Standard 20% discount on a 500 THB expense."""
    # Arrange
    amount = 500.0
    percentage = 20.0

    # Act
    result = calculate_discount(amount, percentage)

    # Assert
    assert result == 400.0


def test_calculate_discount_with_decimal_precision():
    """Happy Path: Fractional percentage rounding to two decimal places."""
    # Arrange
    amount = 99.90
    percentage = 15.0  # 99.90 - 14.985 = 84.915 -> 84.92

    # Act
    result = calculate_discount(amount, percentage)

    # Assert
    assert result == 84.92


# ==============================================================================
# 2. Edge Cases (Boundary Values)
# ==============================================================================

def test_calculate_discount_boundary_zero_percent():
    """Edge Case: 0% discount lower boundary returns full original amount."""
    # Arrange
    amount = 100.0
    percentage = 0.0

    # Act
    result = calculate_discount(amount, percentage)

    # Assert
    assert result == 100.0


def test_calculate_discount_boundary_hundred_percent():
    """Edge Case: 100% discount upper boundary reduces amount to 0.0."""
    # Arrange
    amount = 250.0
    percentage = 100.0

    # Act
    result = calculate_discount(amount, percentage)

    # Assert
    assert result == 0.0


# ==============================================================================
# 3. Error Cases (Validation & Exceptions)
# ==============================================================================

def test_calculate_discount_negative_percentage_raises_error():
    """Error Case: Negative percentage (< 0) must raise ValueError."""
    # Arrange
    amount = 100.0
    invalid_percentage = -5.0

    # Act & Assert
    with pytest.raises(ValueError, match="Percentage must be between 0 and 100"):
        calculate_discount(amount, invalid_percentage)


def test_calculate_discount_negative_amount_raises_error():
    """Error Case: Negative amount (< 0) must raise ValueError."""
    # Arrange
    negative_amount = -50.0
    percentage = 10.0

    # Act & Assert
    with pytest.raises(ValueError, match="Amount must be non-negative"):
        calculate_discount(negative_amount, percentage)
