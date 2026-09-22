"""Discount and Expense Calculation Module
Provides core calculation functions with validation for discounts and expense tracking.
"""

def calculate_discount(amount: float, percentage: float) -> float:
    """Calculate the final amount after deducting the discount percentage.
    
    Args:
        amount: Initial amount before discount (must be >= 0)
        percentage: Discount percentage (must be 0 <= percentage <= 100)
        
    Returns:
        float: Amount after discount rounded to 2 decimal places.
        
    Raises:
        ValueError: If amount is negative or percentage is outside [0, 100].
    """
    if amount < 0:
        raise ValueError("Amount must be non-negative")
    if percentage < 0 or percentage > 100:
        raise ValueError("Percentage must be between 0 and 100")
    
    discount_value = amount * (percentage / 100.0)
    return round(amount - discount_value, 2)


def apply_discount(amount: float, percentage: float) -> float:
    """Convenience alias for calculate_discount used across services and property tests."""
    return calculate_discount(amount, percentage)
