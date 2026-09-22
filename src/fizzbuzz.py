def is_multiple(n: int, divisor: int) -> bool:
    """Helper function to check if n is divisible by divisor."""
    return n % divisor == 0


def fizzbuzz(n: int) -> str:
    """FizzBuzz kata implementation.
    
    Rules:
    - Returns 'FizzBuzz' if n is divisible by both 3 and 5 (15)
    - Returns 'Fizz' if n is divisible by 3
    - Returns 'Buzz' if n is divisible by 5
    - Returns str(n) otherwise
    """
    if is_multiple(n, 15):
        return "FizzBuzz"
    if is_multiple(n, 3):
        return "Fizz"
    if is_multiple(n, 5):
        return "Buzz"
    return str(n)
