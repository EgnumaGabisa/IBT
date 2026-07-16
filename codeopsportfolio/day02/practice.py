# # Temperature Label
# temp = float(input("Enter temp in °C: "))
# if temp < 15:
#     print("cold")
# elif 15 <= temp <= 28:
#     print("warm")
# else:
#     print("hot")

# # Receipt Loop
# for num in range(1, 11):
#     print(f"Receipt #{num}")

# # Even Numbers
# for i in range(1, 21):
#     if i % 2 == 0:
#         print(i)

# # Discount Function
# def apply_discount(price, percent=10):
#     return price - (price * (percent / 100))

# print(apply_discount(200))      # Uses default (10%)
# print(apply_discount(200, 25))  # Uses custom (25%)

# # Countdown
# count = 5
# while count >= 1:
#     print(count)
#     count -= 1
# print("Liftoff!")

# #Store the customers as a list of (name, balance) pairs
# customers = [
#     ("Almaz", 1500), 
#     ("Dawit", 700), 
#     ("Tigist", 200),
#     ("Hanna", 1200), 
#     ("Samuel", 450),
# ]

# # Function to determine the tier based on the balance
# def tier(balance):
#     if balance >= 1000:
#         return "Premium"
#     elif balance >= 500:
#         return "Standard"
#     return "Basic"

# # Initialize counter variables to track the summary counts
# premium_count = 0
# standard_count = 0
# basic_count = 0

# # Print a tidy report header
# print("=")
# print(" CUSTOMER REPORT ")
# print("=")

# # Loop over the customers, print their info, and update the counters
# for name, balance in customers:
#     customer_tier = tier(balance)
    
#     # Print a tidy, aligned row for each customer
#     print(f"👤 {name:<8} | Tier: {customer_tier:<8} | Balance: {balance:>4} ETB")
    
#     # Increment the correct counter based on the tier
#     if customer_tier == "Premium":
#         premium_count += 1
#     elif customer_tier == "Standard":
#         standard_count += 1
#     else:
#         basic_count += 1

# # Print the summary count of how many customers are in each tier
# print("=")
# print("            SUMMARY BY TIER               ")
# print("=")
# print(f"🏆 Premium Customers : {premium_count}")
# print(f"⭐️ Standard Customers: {standard_count}")
# print(f"Basic Customers   : {basic_count}")
# print("=")




