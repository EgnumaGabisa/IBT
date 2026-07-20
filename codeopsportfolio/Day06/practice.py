# =====================================================================
# Goal: Practice SOLID Principles & Core Design Patterns in Python
import math
# 1. SPOT THE SRP VIOLATION (Single Responsibility Principle)
# Concept: Split one bloated class into three specialized classes.
class ReportGenerator:
    """Class responsible ONLY for generating report content."""
    def generate(self, data): # File Name: day06/practice.py

        return f"--- Business Report ---\nData Summary: {data}"


class ReportSaver:
    """Class responsible ONLY for saving the report to a file."""
    def save_to_file(self, content, filename="report.txt"):
        with open(filename, "w") as file:
            file.write(content)
        print(f"[SRP] Report successfully saved to {filename}")


class ReportMailer:
    """Class responsible ONLY for sending email notifications."""
    def send_email(self, content, email_address):
        print(f"[SRP] Sending report to {email_address}:\n{content}\n")


# =====================================================================
# 2. REFACTOR TO OCP (Open/Closed Principle)
# =====================================================================
# Concept: Extend code by adding new classes, not by modifying old if/elif blocks.

class Shape:
    """Abstract Base Class for shapes."""
    def area(self) -> float:
        raise NotImplementedError("Subclasses must implement this method!")


class Square(Shape):
    def __init__(self, side):
        self.side = side

    def area(self):
        return self.side ** 2


class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return math.pi * (self.radius ** 2)


class Triangle(Shape):
    def __init__(self, base, height):
        self.base = base
        self.height = height

    def area(self):
        return 0.5 * self.base * self.height


# =====================================================================
# 3. WRITE A SINGLETON (Creational Pattern)
# =====================================================================
# Concept: Ensure a class has only one instance and provides a global access point.

class AppSettings:
    _instance = None

    def __new__(cls):
        # If no instance exists, create one; otherwise, return the existing one.
        if cls._instance is None:
            cls._instance = super(AppSettings, cls).__new__(cls)
            cls._instance.currency = "ETB"  # Default configuration setting
        return cls._instance


# =====================================================================
# 4. WRITE A FACTORY (Creational Pattern)
# =====================================================================
# Concept: Delegate the instantiation logic of objects to a specialized factory class.

class ShapeFactory:
    @staticmethod
    def create(kind, *args):
        kind = kind.lower()
        if kind == "circle":
            return Circle(*args)
        elif kind == "square":
            return Square(*args)
        elif kind == "triangle":
            return Triangle(*args)
        else:
            raise ValueError(f"Unknown shape type: {kind}")


# =====================================================================
# 5. WRITE AN OBSERVER PAIR (Behavioral Pattern)
# =====================================================================
# Concept: Set up a subscription mechanism to notify multiple observers of events.

class NewsAgency:
    """The Subject (Publisher) being observed."""
    def __init__(self):
        self._subscribers = []
        self._latest_news = None

    def attach(self, subscriber):
        if subscriber not in self._subscribers:
            self._subscribers.append(subscriber)

    def detach(self, subscriber):
        self._subscribers.remove(subscriber)

    def set_news(self, news):
        self._latest_news = news
        self.notify_all()

    def notify_all(self):
        for subscriber in self._subscribers:
            subscriber.update(self._latest_news)


class EmailSubscriber:
    """Observer 1: Listens for news via Email."""
    def __init__(self, email):
        self.email = email

    def update(self, news):
        print(f"📧 [Email Alert to {self.email}] Breaking News: {news}")


class MobileAppSubscriber:
    """Observer 2: Listens for news via Push Notifications."""
    def __init__(self, username):
        self.username = username

    def update(self, news):
        print(f"📱 [Push Notification for {self.username}] Broadcast: {news}")


# =====================================================================
# EXECUTION AND TESTING
# =====================================================================
if __name__ == "__main__":
    print("==================================================")
    print("            RUNNING DAY 06 PRACTICE               ")
    print("==================================================\n")

    # --- Test 1: SRP ---
    print("--- 1. Testing Single Responsibility Principle ---")
    data_source = {"Sales": 120000, "Users": 450}
    generator = ReportGenerator()
    saver = ReportSaver()
    mailer = ReportMailer()

    report_content = generator.generate(data_source)
    saver.save_to_file(report_content)
    mailer.send_email(report_content, "manager@egnumadigital.com")

    # --- Test 2: OCP ---
    print("--- 2. Testing Open/Closed Principle ---")
    shapes = [Square(10), Circle(5), Triangle(10, 5)]
    for shape in shapes:
        # Polymorphism: Calls the correct area method automatically
        print(f"   Shape: {shape.__class__.__name__:<8} | Area: {shape.area():.2f}")
    print("")

    # --- Test 3: Singleton ---
    print("--- 3. Testing Singleton Pattern ---")
    settings_one = AppSettings()
    settings_two = AppSettings()
    
    print(f"   Settings 1 currency: {settings_one.currency}")
    print(f"   Are both settings identical in memory? {settings_one is settings_two}")
    # Change currency on one instance
    settings_one.currency = "USD"
    print(f"   Settings 2 currency (automatically updated): {settings_two.currency}\n")

    # --- Test 4: Factory ---
    print("--- 4. Testing Factory Pattern ---")
    factory_circle = ShapeFactory.create("circle", 7)
    factory_square = ShapeFactory.create("square", 4)
    print(f"   Factory created a: {type(factory_circle).__name__} with area {factory_circle.area():.2f}")
    print(f"   Factory created a: {type(factory_square).__name__} with area {factory_square.area():.2f}\n")

    # --- Test 5: Observer ---
    print("--- 5. Testing Observer Pattern ---")
    agency = NewsAgency()
    
    sub1 = EmailSubscriber("egnuma@gmail.com")
    sub2 = MobileAppSubscriber("Captain1_M")

    # Subscribe to agency
    agency.attach(sub1)
    agency.attach(sub2)

    # Publish news (both subscribers will print notifications automatically)
    agency.set_news("ZTE Project successfully completed!")