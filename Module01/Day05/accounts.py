# =====================================================================
# File Name: day05/accounts.py
# Goal: Build Savings/Current Accounts with a Polymorphic Loop
# =====================================================================

class Account:
    """Base parent Account class with encapsulation."""
    def __init__(self, owner: str, account_number: str, initial_balance: float = 0.0):
        self.owner = owner
        self.account_number = account_number
        self.__balance = float(initial_balance) if initial_balance >= 0 else 0.0

    @property
    def balance(self) -> float:
        """Secure getter for __balance."""
        return self.__balance

    def deposit(self, amount: float) -> bool:
        if amount <= 0:
            print("❌ Invalid Deposit Amount")
            return False
        self.__balance += amount
        return True

    def withdraw(self, amount: float) -> bool:
        if amount <= 0 or amount > self.__balance:
            print("❌ Invalid Withdrawal or Insufficient Funds")
            return False
        self.__balance -= amount
        return True

    def statement(self) -> str:
        """Base representation statement."""
        return f"Account {self.account_number} ({self.owner}): {self.balance:.2f} ETB"


# Step 2: Add SavingsAccount with a rate and add_interest()
class SavingsAccount(Account):
    """Child class inheriting from Account with an interest rate."""
    def __init__(self, owner: str, account_number: str, initial_balance: float = 0.0, rate: float = 0.05):
        super().__init__(owner, account_number, initial_balance)
        self.rate = rate

    def add_interest(self):
        """Calculates interest and deposits it directly."""
        interest = self.balance * self.rate
        self.deposit(interest)

    # Step 4: Override statement() to label the account type
    def statement(self) -> str:
        return f"[Savings] Account {self.account_number} ({self.owner}): {self.balance:.2f} ETB"


# Step 3: Add CurrentAccount with an overdraft and overridden withdraw()
class CurrentAccount(Account):
    """Child class inheriting from Account with an overdraft limit."""
    def __init__(self, owner: str, account_number: str, initial_balance: float = 0.0, overdraft: float = 500.0):
        super().__init__(owner, account_number, initial_balance)
        self.overdraft = overdraft

    # Override withdraw to allow spending into the overdraft limit
    def withdraw(self, amount: float) -> bool:
        if amount <= 0:
            return False
        
        # Override calculation: Check if amount exceeds balance + overdraft limit
        if amount > (self.balance + self.overdraft):
            print(f"❌ Rejection: Overdraft limit exceeded for {self.owner}.")
            return False
        
        # Perform withdrawal by overriding the parent's encapsulated deduction mechanism
        # (Using a trick of withdrawing current balance then adjusting base if needed)
        current_bal = self.balance
        if amount <= current_bal:
            super().withdraw(amount)
        else:
            # Empty main balance first
            super().withdraw(current_bal)
            # Take the rest from overdraft
            overdrawn_amount = amount - current_bal
            # Utilize base deposit with a negative amount to force balance below zero
            self._Account__balance = -overdrawn_amount # Accessing name-mangled private attribute safely
        return True

    # Step 4: Override statement() to label the account type
    def statement(self) -> str:
        return f"[Current] Account {self.account_number} ({self.owner}): {self.balance:.2f} ETB"


# Step 5: Loop over a mixed list and call statement()
if __name__ == "__main__":
    print("==========================================")
    print("         DAY 5: POLYMORPHISM DEMO         ")
    print("==========================================\n")

    # Mixed list containing base Account, SavingsAccount, and CurrentAccount
    accounts_list = [
        Account("Abebe", "ACT-001", 1000.0),
        SavingsAccount("Almaz", "SAV-101", 5000.0, rate=0.07),
        CurrentAccount("Dawit", "CUR-201", 200.0, overdraft=300.0)
    ]

    # Demonstrate Polymorphism: Loop and run statement() on each object
    for acc in accounts_list:
        print(acc.statement())

    print("\n--- Simulating Extra Features ---")
    # Apply interest to Almaz
    accounts_list[1].add_interest()
    # Withdraw past limit for Dawit
    accounts_list[2].withdraw(300.0) # Uses overdraft successfully
    
    print("\n--- Final Status After Transactions ---")
    for acc in accounts_list:
        print(acc.statement())