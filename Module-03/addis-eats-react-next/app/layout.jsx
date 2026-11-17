import "./globals.css";
import CartProvider from "@/components/providers/CartProvider";
import Header from "@/components/ui/Header";

export const metadata = {
  title: "Addis Eats (Mesob House)",
  description: "Authentic Ethiopian Cuisine Delivered Fast",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-amber-50/30 text-gray-900 antialiased">
        <CartProvider>
          <Header />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}