# #1 Unique cities. Given a list with repeated city names, use a set to print the distinct cities, then the count.

# cities=["Addis Ababa","Addis Ababa","Bahdar","Gondar","Mekelle","Hawasa","Diredawa","Jimma","Harar","Bishoftu","Shashemane"]
# cities[0]="Adama"
# cities.append("Debre Birhan")
# cities.insert(2,"Wolkite")
# cities.remove("Wolkite")
# cities.reverse()
# print(cities)
# unique=set(cities)
# print(unique)
# print(len(unique))
# cities.pop()

# #2. Price report. Make a dictionary of five grocery items and prices in ETB. Loop with .items() to 
# #print each on its own line.
# prices={"meat":500,"drink":100,"Eggs":300,"caccabsa":200, "dorowat":250} #ETB
# for item, price in prices.items():
#     print(f"{item}:{price} ETB")
    
    
#     #3. Tax comprehension. Given prices = [100, 250, 400, 80], use one comprehension to build a list with 15% tax added.
# prices =[100, 250, 400, 80]
# with_tax = [p * 1.15 for p in prices]
# print(with_tax)


# with open("customers.txt") as file:
#     for line in file:
#       print(line.strip())

# with open("customers.txt", "w") as f:
#  f.write("hello World\n")
#  f.write("python programming\n")
# with open("customers.txt") as file:
#  text= file.read()
# print(text) 
# with open("customers.txt", "a") as f:
#     f.write("Abdii\n")
# with open("customers.txt") as file:
#       text= file.read()
#       print(text)



# try:
#  amount = int(input("Amount: "))
#  result = 1000 / amount
# except ValueError:
#  print("Please enter a number")
# except ZeroDivisionError:
#  print("Amount can't be zero")
# else:
#  print(result) # runs only if no error
# finally:
#  print("Done") # always runs


# stock = {}
# try:
#  with open("stock.txt") as f:
#   for line in f:
#    item, qty = line.strip().split(",")
#  stock[item] = int(qty)
# except FileNotFoundError:
#  print("No stock file yet — starting empty")
# def adjust(item, amount):
#  stock[item] = stock.get(item, 0) + amount
# low = [item for item, qty in stock.items() if qty < 10]
# print("Low stock:", low)



# 4. Cheap items. From the same list, use a comprehension with a condition to keep only prices under 200
   # The original list of prices
# prices = [100, 250, 400, 80]

# cheap_prices = [price for price in prices if price < 200]
# print("4. Cheap Items (under 200 ETB):")
# print(cheap_prices)
# Output will be:[100, 80]

# # 5. Write & read. Write three customer names to names.txt, then open it and print each name 
# # back, one per line.
# # Step A: Write three customer names to names.txt
# customer_names = ["Abebe", "Chaltu", "Biniam"]

# # 'w' mode opens the file for writing (creates it if it doesn't exist)
# with open("names.txt", "w") as file:
#     for name in customer_names:
#         file.write(name + "\n")  # \n adds a new line after each name

# # Step B: Open the file and print each name back, one per line
# print("5. Reading names back from 'names.txt':")
# with open("names.txt", "r") as file:
#     for line in file:
#         # .strip() removes the trailing newline character (\n)
#         print(line.strip())
# 6. Safe division. Ask the user for a number and divide 1000 by it, catching both ValueError and ZeroDivisionError

print("6. Safe Division Program:")

try:
    # Ask the user for a number
    user_input = input("Enter a number to divide 1000 by: ")
    number = float(user_input)  # Convert the input string to a decimal float
    
    result = 1000 / number
    print(f"Success! 1000 / {number} = {result}")

except ValueError:
    # Triggers if the user inputs something that cannot be converted to a float (like "abc")
    print("Error: That is not a valid number!")

except ZeroDivisionError:
    # Triggers if the user inputs 0
    print("Error: You cannot divide by zero!")
