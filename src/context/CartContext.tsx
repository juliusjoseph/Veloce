// context/CartContext.tsx
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type CartLine = { productId: string; quantity: number };

type CartContextValue = {
  lines: CartLine[];
  count: number; // total items, handy for a cart badge later
  addItem: (productId: string) => void;
  changeQuantity: (productId: string, delta: number) => void; // reaching 0 removes the line
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  const addItem = useCallback((productId: string) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.productId === productId);
      if (existing) {
        return prev.map((l) =>
          l.productId === productId ? { ...l, quantity: l.quantity + 1 } : l,
        );
      }
      return [...prev, { productId, quantity: 1 }];
    });
  }, []);

  const changeQuantity = useCallback((productId: string, delta: number) => {
    setLines((prev) =>
      prev
        .map((l) =>
          l.productId === productId
            ? { ...l, quantity: l.quantity + delta }
            : l,
        )
        .filter((l) => l.quantity > 0),
    );
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo(
    () => ({
      lines,
      count: lines.reduce((n, l) => n + l.quantity, 0),
      addItem,
      changeQuantity,
      clear,
    }),
    [lines, addItem, changeQuantity, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
