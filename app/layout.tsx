// app/layout.tsx
import { CartProvider } from './context/CartContext'; // 1. Make sure this import path is correct
import './globals.css';
// ... your other imports like fonts

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* 2. This provider MUST wrap your {children} */}
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}