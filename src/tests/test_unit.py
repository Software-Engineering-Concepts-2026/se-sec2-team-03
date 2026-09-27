import sys
from pathlib import Path

import pytest

# Import from existing codebase (services/stats-service/app.py)
SERVICES_DIR = Path(__file__).resolve().parent.parent.parent / "services" / "stats-service"
if str(SERVICES_DIR) not in sys.path:
    sys.path.insert(0, str(SERVICES_DIR))

from app import calculate_discount

# ==============================================================================
# Unit Tests: Equivalence Partitioning & Boundary Value Analysis (AAA Pattern)
# ==============================================================================

def test_calculate_discount_boundary_zero():
    """EP1 (Boundary - Lower Bound): 0% discount should return full original amount."""
    # Arrange
    amount, percentage = 100.0, 0.0
    
    # Act
    result = calculate_discount(amount, percentage)
    
    # Assert
    assert result == 100.0


def test_calculate_discount_normal_partition():
    """EP2 (Valid Normal Partition): Standard discount percentage (e.g. 20% of 500)."""
    # Arrange
    amount, percentage = 500.0, 20.0
    
    # Act
    result = calculate_discount(amount, percentage)
    
    # Assert
    assert result == 400.0


def test_calculate_discount_boundary_hundred():
    """EP3 (Boundary - Upper Bound): 100% discount should reduce amount to 0.0."""
    # Arrange
    amount, percentage = 250.0, 100.0
    
    # Act
    result = calculate_discount(amount, percentage)
    
    # Assert
    assert result == 0.0


def test_calculate_discount_fractional_rounding():
    """EP4 (Valid Partition - Precision): Fractional percentage with 2-decimal precision."""
    # Arrange
    amount, percentage = 99.90, 15.0  # 99.90 - 14.985 = 84.915 -> 84.92
    
    # Act
    result = calculate_discount(amount, percentage)
    
    # Assert
    assert result == 84.92


def test_calculate_discount_negative_percentage_error():
    """EP5 (Invalid Partition - Below Lower Bound): Negative percentage should raise ValueError."""
    # Arrange
    amount, percentage = 100.0, -5.0
    
    # Act & Assert
    with pytest.raises(ValueError, match="Percentage must be between 0 and 100"):
        calculate_discount(amount, percentage)


def test_calculate_discount_exceed_percentage_error():
    """EP6 (Invalid Partition - Above Upper Bound): Percentage > 100 should raise ValueError."""
    # Arrange
    amount, percentage = 100.0, 100.1
    
    # Act & Assert
    with pytest.raises(ValueError, match="Percentage must be between 0 and 100"):
        calculate_discount(amount, percentage)


def test_calculate_discount_negative_amount_error():
    """EP7 (Invalid Partition - Negative Amount): Negative amount should raise ValueError."""
    # Arrange
    amount, percentage = -50.0, 10.0
    
    # Act & Assert
    with pytest.raises(ValueError, match="Amount must be non-negative"):
        calculate_discount(amount, percentage)
