import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
id: string;
name: string;
price: number;
quantity: number;
size: 'Small' | 'Medium' | 'Large';
image: string;
notes?: string;
}

interface CartContextType {
items: CartItem[];
addItem: (item: CartItem) => void;
removeItem: (id: string, size: string) => void;
updateQuantity: (id: string, size: string, quantity: number) => void;
clearCart: () => void;
totalItems: number;
totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
// Inicializar o estado com os itens do localStorage
const [items, setItems] = useState<CartItem[]>(() => {
  try {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error('Erro ao carregar carrinho do localStorage:', error);
    return [];
  }
});

// Atualizar o localStorage sempre que os itens mudarem
useEffect(() => {
  try {
    localStorage.setItem('cart', JSON.stringify(items));
    console.log('Carrinho salvo no localStorage:', items);
  } catch (error) {
    console.error('Erro ao salvar carrinho no localStorage:', error);
  }
}, [items]);

const addItem = (newItem: CartItem) => {
  setItems(currentItems => {
    // Verificar se o item já existe no carrinho (mesmo id e tamanho)
    const existingItemIndex = currentItems.findIndex(
      item => item.id === newItem.id && item.size === newItem.size
    );
    
    if (existingItemIndex >= 0) {
      // Se existir, atualiza a quantidade
      const updatedItems = [...currentItems];
      updatedItems[existingItemIndex].quantity += newItem.quantity;
      return updatedItems;
    } else {
      // Se não existir, adiciona ao carrinho
      return [...currentItems, newItem];
    }
  });
};

const removeItem = (id: string, size: string) => {
  setItems(currentItems => 
    currentItems.filter(item => !(item.id === id && item.size === size))
  );
};

const updateQuantity = (id: string, size: string, quantity: number) => {
  setItems(currentItems => 
    currentItems.map(item => 
      (item.id === id && item.size === size) 
        ? { ...item, quantity } 
        : item
    )
  );
};

const clearCart = () => {
  setItems([]);
  localStorage.removeItem('cart');
};

// Calcular total de itens
const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

// Calcular preço total
const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

return (
  <CartContext.Provider value={{ 
    items, 
    addItem, 
    removeItem, 
    updateQuantity, 
    clearCart,
    totalItems,
    totalPrice
  }}>
    {children}
  </CartContext.Provider>
);
};

export const useCart = () => {
const context = useContext(CartContext);
if (context === undefined) {
  throw new Error('useCart must be used within a CartProvider');
}
return context;
};