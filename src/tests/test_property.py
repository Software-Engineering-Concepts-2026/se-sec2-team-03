import sys
from pathlib import Path
from hypothesis import given, strategies as st

SRC_DIR = Path(__file__).resolve().parent.parent
if str(SRC_DIR) not in sys.path:
    sys.path.insert(0, str(SRC_DIR))

SERVICES_DIR = Path(__file__).resolve().parent.parent.parent / "services" / "stats-service"
if str(SERVICES_DIR) not in sys.path:
    sys.path.insert(0, str(SERVICES_DIR))

try:
    from discount import apply_discount
except ImportError:
    from app import apply_discount


@given(
    amount=st.floats(min_value=0.0, max_value=100000.0, allow_nan=False, allow_infinity=False),
    percentage=st.floats(min_value=0.0, max_value=100.0, allow_nan=False, allow_infinity=False)
)
def test_apply_discount_bounded(amount, percentage):
    """Property 1: The discounted amount is bounded within [0, amount]."""
    result = apply_discount(amount, percentage)
    rounded_amount = round(amount, 2)
    assert 0.0 <= result <= (rounded_amount + 0.01)


@given(
    amount=st.floats(min_value=0.0, max_value=100000.0, allow_nan=False, allow_infinity=False)
)
def test_apply_discount_identity_at_zero(amount):
    """Property 2 (Identity): 0% discount always preserves the original amount (rounded)."""
    result = apply_discount(amount, 0.0)
    assert result == round(amount, 2)


@given(
    amount=st.floats(min_value=0.0, max_value=100000.0, allow_nan=False, allow_infinity=False)
)
def test_apply_discount_zero_at_hundred(amount):
    """Property 3 (Upper Bound): 100% discount always results in 0.0."""
    result = apply_discount(amount, 100.0)
    assert result == 0.0


@given(
    amount=st.floats(min_value=0.0, max_value=100000.0, allow_nan=False, allow_infinity=False),
    p1=st.floats(min_value=0.0, max_value=100.0, allow_nan=False, allow_infinity=False),
    p2=st.floats(min_value=0.0, max_value=100.0, allow_nan=False, allow_infinity=False)
)
def test_apply_discount_monotonicity(amount, p1, p2):
    """Property 4 (Monotonicity): Higher discount percentage yields lower or equal final amount."""
    low_p = min(p1, p2)
    high_p = max(p1, p2)
    
    result_low = apply_discount(amount, low_p)
    result_high = apply_discount(amount, high_p)
    
    assert result_low >= result_high
