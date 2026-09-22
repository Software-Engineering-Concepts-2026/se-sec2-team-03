def is_multiple(n: int, divisor: int) -> bool:
    """Helper function to check if n is divisible by divisor."""
    return n % divisor == 0


def fizzbuzz(n: int) -> str:
    if is_multiple(n, 3):
        return "Fizz"
    return str(n)
