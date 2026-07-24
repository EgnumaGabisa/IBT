# Question 1: Get even numbers at even indexes
def getOnlyEvens(arr):
    result = []
    for i in range(0, len(arr), 2):  # Only check even indexes
        if arr[i] % 2 == 0:
            result.append(arr[i])
    print(result)
    return result

# Question 2: Compare number with its reverse
def reverseCompare(num):
    reversed_num = int(str(num)[::-1])
    if num > reversed_num:
        print("ok")
    else:
        print("Not ok")

# Question 3: Factorial calculation
def returnFactorial(n):
    if n == 0:
        return 1
    result = 1
    for i in range(1, n + 1):
        result *= i
    return result

# Question 4: Meera array check
def checkMeera(arr):
    for n in arr:
        if n * 2 in arr:
            print("I am NOT a Meera array")
            return
    print("I am a Meera array")

# Question 5: Dual array check
def isDual(arr):
    from collections import Counter
    count = Counter(arr)
    for value in count.values():
        if value != 2:
            return 0
    return 1

# Question 6: Digital clock conversion
def digitalClock(seconds):
    hours = (seconds // 3600) % 24
    minutes = (seconds % 3600) // 60
    seconds = seconds % 60
    return f"{hours:02d}:{minutes:02d}:{seconds:02d}"

# Test cases for verification
if __name__ == "__main__":
    # Test Question 1
    print("Question 1 Tests:")
    getOnlyEvens([1, 2, 3, 6, 4, 8])  # Should print [4]
    getOnlyEvens([0, 1, 2, 3, 4])     # Should print [0, 2, 4]
    
    print("\nQuestion 2 Tests:")
    reverseCompare(72)  # Should print "ok"
    reverseCompare(23)  # Should print "Not ok"
    
    print("\nQuestion 3 Tests:")
    print(returnFactorial(5))  # Should output 120
    print(returnFactorial(6))  # Should output 720
    print(returnFactorial(0))  # Should output 1
    
    print("\nQuestion 4 Tests:")
    checkMeera([10, 4, 0, 5])      # Should print "I am NOT a Meera array"
    checkMeera([7, 4, 9])          # Should print "I am a Meera array"
    checkMeera([1, -6, 4, -3])     # Should print "I am NOT a Meera array"
    
    print("\nQuestion 5 Tests:")
    print(isDual([1, 2, 1, 3, 3, 2]))  # Should return 1
    print(isDual([2, 5, 2, 5, 5]))     # Should return 0
    print(isDual([3, 1, 1, 2, 2]))     # Should return 0
    
    print("\nQuestion 6 Tests:")
    print(digitalClock(5025))   # Should return "01:23:45"
    print(digitalClock(61201))  # Should return "17:00:01"
    print(digitalClock(87000))  # Should return "00:10:00"
