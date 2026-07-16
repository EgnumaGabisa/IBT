# class Account:
#     # Step 1: Define Account with owner, account_number, and a private __balance
#     def __init__(self, owner: str, account_number: str, initial_balance: float = 0.0):
#         self.owner = owner
#         self.account_number = account_number
#          # Private attribute (prefixed with double underscore)
#         if initial_balance < 0:
#             print("⚠️ Initial balance cannot be negative. Setting to 0.0 ETB.")
#             self.__balance = 0.0
#         else:
#             self.__balance = float(initial_balance)
#              # Step 2: Add a @property to read the balance (no direct edits allowed)
#     @property
#     def balance(self) -> float:
#         """Getter method to securely read the balance."""
#         return self.__balance

#     # Step 3 & 4: Write deposit() with validation
#     def deposit(self, amount: float) -> bool:
#         """Deposits a positive amount into the account."""
#         if amount <= 0:
#             print(f"❌ Transaction Rejected: Cannot deposit a negative or zero amount ({amount} ETB) for {self.owner}.")
#             return False
        
#         self.__balance += amount
#         print(f"✅ Deposit Successful: Added {amount:.2f} ETB to {self.owner}'s account. New Balance: {self.balance:.2f} ETB.")
#         return True

#     # Step 3 & 4: Write withdraw() with validation
#     def withdraw(self, amount: float) -> bool:
#         """Withdraws a valid amount if there are sufficient funds."""
#         if amount <= 0:
#             print(f"❌ Transaction Rejected: Withdrawal amount must be positive ({amount} ETB) for {self.owner}.")
#             return False
            
#         # Reject overdrafts
#         if amount > self.__balance:
#             print(f"❌ Transaction Rejected: Insufficient funds for {self.owner}. Attempted: {amount:.2f} ETB | Available: {self.balance:.2f} ETB.")
#             return False
            
#         self.__balance -= amount
#         print(f"✅ Withdrawal Successful: Deducted {amount:.2f} ETB from {self.owner}'s account. New Balance: {self.balance:.2f} ETB.")
#         return True


# # Step 5: Create two accounts and run some transactions to test
# if __name__ == "__main__":
#     print("==================================================")
#     print("            ADDIS BANK TRANSACTION TEST           ")
#     print("==================================================\n")

#     # 1. Create two separate accounts
#     print("--- Creating Accounts ---")
#     acct1 = Account(owner="Almaz", account_number="AB-1001", initial_balance=1500.0)
#     acct2 = Account(owner="Dawit", account_number="AB-1002", initial_balance=500.0)
#     print(f"Account 1: {acct1.owner} ({acct1.account_number}) | Balance: {acct1.balance:.2f} ETB")
#     print(f"Account 2: {acct2.owner} ({acct2.account_number}) | Balance: {acct2.balance:.2f} ETB\n")

#     # 2. Run transactions on Almaz's account
#     print(f"--- Transactions for {acct1.owner} ---")
#     acct1.deposit(500.0)         # Valid deposit
#     acct1.withdraw(300.0)        # Valid withdrawal
#     acct1.deposit(-100.0)        # Invalid negative deposit
#     acct1.withdraw(2000.0)       # Invalid withdrawal (overdraft)
#     print("")

#     # 3. Run transactions on Dawit's account
#     print(f"--- Transactions for {acct2.owner} ---")
#     acct2.withdraw(600.0)        # Invalid withdrawal (overdraft)
#     acct2.deposit(250.50)        # Valid deposit
#     acct2.withdraw(100.0)        # Valid withdrawal
#     print("\n==================================================")
#     print("            FINAL ACCOUNT STATUSES                ")
#     print("==================================================")
#     print(f"👤 {acct1.owner:<8} ({acct1.account_number}) | Final Balance: {acct1.balance:>8.2f} ETB")
#     print(f"👤 {acct2.owner:<8} ({acct2.account_number}) | Final Balance: {acct2.balance:>8.2f} ETB")
#     print("==================================================")


# =====================================================================
# File Name: day05/accounts.py
# Goal: Implement Inheritance and Polymorphism
# =====================================================================

# Parent class (from day 04)
class Account:
    def __init__(self, owner, account_number, balance=0.0):
        self.owner = owner
        self.account_number = account_number
        self.__balance = float(balance)

    @property
    def balance(self):
        return self.__balance

    def deposit(self, amount):
        self.__balance += amount

    def withdraw(self, amount):
        if amount <= self.__balance:
            self.__balance -= amount
            return True
        return False

    def statement(self):
        return f"Account {self.account_number} ({self.owner}): {self.balance:.2f} ETB"

# Child Class 1: Savings Account
class SavingsAccount(Account):
    def __init__(self, owner, account_number, balance=0.0, rate=0.05):
        super().__init__(owner, account_number, balance)
        self.rate = rate

    def add_interest(self):
        interest = self.balance * self.rate
        self.deposit(interest)

    def statement(self): # Overridden method
        return f"Savings Account {self.account_number} ({self.owner}): {self.balance:.2f} ETB"

# Child Class 2: Current Account
class CurrentAccount(Account):
    def __init__(self, owner, account_number, balance=0.0, overdraft=500.0):
        super().__init__(owner, account_number, balance)
        self.overdraft = overdraft

    def withdraw(self, amount): # Overridden method
        if amount <= (self.balance + self.overdraft):
            self.deposit(-amount) # simplified logic for overdraft
            return True
        return False

    def statement(self): # Overridden method
        return f"Current Account {self.account_number} ({self.owner}): {self.balance:.2f} ETB"

# Step 5: Polymorphic Loop
accounts = [
    SavingsAccount("Almaz", "S-001", 1000),
    CurrentAccount("Dawit", "C-001", 200),
    SavingsAccount("Hanna", "S-002", 500)
]

print("--- Account Statements ---")
for acc in accounts:
    # Polymorphism: calling statement() works for different classes automatically
    print(acc.statement())