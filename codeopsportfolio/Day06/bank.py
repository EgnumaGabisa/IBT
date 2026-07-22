# =====================================================================
# File Name: day06/bank.py
# Goal: Implement Factory Pattern & Observer Pattern (SOLID Compliant)
# =====================================================================

# --- OBSERVER PATTERN (Step 2 & 4) ---

class AlertService:
    """
    Abstract Observer Interface.
    SRP: Separates the notification logic entirely out of the transactional Account class.
    """
    def update(self, message: str):
        raise NotImplementedError("Subclasses must implement the update method!")


class SMSAlert(AlertService):
    """Concrete Observer representing an SMS Alert subscription."""
    def __init__(self, phone_number: str):
        self.phone_number = phone_number

    def update(self, message: str):
        print(f"📱 [SMS to {self.phone_number}]: {message}")


# --- ACCOUNT CLASSES ---

class Account:
    """Base Account class equipped with subscriber/observer support."""
    def __init__(self, owner: str, account_number: str, balance: float = 0.0):
        self.owner = owner
        self.account_number = account_number
        self._balance = float(balance) # Protected attribute so child classes can read/write
        self._observers = []           # List of registered observers

    @property
    def balance(self) -> float:
        return self._balance

    # Step 4: Add subscribe/_notify to Account
    def subscribe(self, observer: AlertService):
        if observer not in self._observers:
            self._observers.append(observer)

    def _notify(self, message: str):
        for observer in self._observers:
            observer.update(message)

    def deposit(self, amount: float) -> bool:
        if amount <= 0:
            return False
        self._balance += amount
        self._notify(f"Deposit of {amount:.2f} ETB was successful! New Balance: {self.balance:.2f} ETB.")
        return True

    def withdraw(self, amount: float) -> bool:
        if amount <= 0:
            return False
        if amount <= self._balance:
            self._balance -= amount
            self._notify(f"Withdrawal of {amount:.2f} ETB was successful! Current Balance: {self.balance:.2f} ETB.")
            return True
        self._notify("Withdrawal failed: Insufficient funds.")
        return False

    def statement(self) -> str:
        return f"Standard Account {self.account_number} ({self.owner}): {self.balance:.2f} ETB"


class SavingsAccount(Account):
    """Child class specialized for Savings."""
    def __init__(self, owner: str, account_number: str, balance: float = 0.0, rate: float = 0.05):
        super().__init__(owner, account_number, balance)
        self.rate = rate

    def add_interest(self):
        interest = self._balance * self.rate
        self._balance += interest
        self._notify(f"Interest of {interest:.2f} ETB applied at {self.rate*100}%. New Balance: {self.balance:.2f} ETB.")

    def statement(self) -> str:
        return f"[Savings] Account {self.account_number} ({self.owner}): {self.balance:.2f} ETB"


class CurrentAccount(Account):
    """Child class specialized for Current account transactions with overdrafts."""
    def __init__(self, owner: str, account_number: str, balance: float = 0.0, overdraft: float = 500.0):
        super().__init__(owner, account_number, balance)
        self.overdraft = overdraft

    # Override withdraw to accommodate overdraft
    def withdraw(self, amount: float) -> bool:
        if amount <= 0:
            return False
        if amount <= (self._balance + self.overdraft):
            self._balance -= amount
            self._notify(f"Withdrawal of {amount:.2f} ETB was successful (Overdraft utilized). Current Balance: {self.balance:.2f} ETB.")
            return True
        self._notify(f"Withdrawal of {amount:.2f} ETB failed: Exceeded your overdraft limit.")
        return False

    def statement(self) -> str:
        return f"[Current] Account {self.account_number} ({self.owner}): {self.balance:.2f} ETB"


# --- FACTORY PATTERN (Step 3) ---

class AccountFactory:
    """Factory Class to safely instantiate different account subclasses."""
    @staticmethod
    def create(kind: str, owner: str, account_number: str, balance: float = 0.0, **kwargs) -> Account:
        kind = kind.lower().strip()
        if kind == "savings":
            rate = kwargs.get("rate", 0.05)
            return SavingsAccount(owner, account_number, balance, rate)
        elif kind == "current":
            overdraft = kwargs.get("overdraft", 500.0)
            return CurrentAccount(owner, account_number, balance, overdraft)
        else:
            raise ValueError(f"Unknown account type: '{kind}'")


# --- TRANSACTION DRIVER (Step 5) ---

if __name__ == "__main__":
    print("==================================================")
    print("         REFACTORED ADDIS BANK SYSTEM             ")
    print("==================================================\n")

    # 1. Open accounts via the Factory
    print("--- 1. Opening Accounts via Factory ---")
    acct1 = AccountFactory.create("savings", "Almaz", "SA-101", 1000.0, rate=0.07)
    acct2 = AccountFactory.create("current", "Dawit", "CA-102", 200.0, overdraft=300.0)
    
    print(acct1.statement())
    print(acct2.statement())
    print("")

    # 2. Attach the alert observer
    print("--- 2. Attaching SMS Observers ---")
    almaz_sms = SMSAlert("+251911223344")
    dawit_sms = SMSAlert("+251922334455")
    
    acct1.subscribe(almaz_sms)
    acct2.subscribe(dawit_sms)
    print("Observers attached.\n")

    # 3. Simulate operations that trigger the alerts automatically
    print("--- 3. Running Financial Operations ---")
    acct1.deposit(500.0)
    acct1.add_interest()
    print("--------------------------------------------------")
    acct2.withdraw(400.0)  # Utilizes overdraft limit
    acct2.withdraw(200.0)  # Fails because it exceeds limit