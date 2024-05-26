import { defineStore } from 'pinia';

interface CartItem {
  gameId: string;
  title: string;
  price: number;
  image: string;
  operatingSystem: string;
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: JSON.parse(sessionStorage.getItem('cartItems') || '[]') as CartItem[],
    totalAmount: JSON.parse(sessionStorage.getItem('totalAmount') || '0'),
    totalQuantity: JSON.parse(sessionStorage.getItem('totalQuantity') || '0'),
    loading: false,
  }),
  actions: {
    setLoading(loading: boolean) {
      this.loading = loading;
    },
    addToCart(newItem: CartItem) {
      this.loading = false;
      const existingItem = this.items.find(item => item.gameId === newItem.gameId);
      this.totalAmount = parseFloat((this.totalAmount + newItem.price).toFixed(2));
      this.totalQuantity = this.items.length + 1;
      if (!existingItem) {
        this.items.push({
          ...newItem,
        });
      }
      this.saveCartToStorage();
    },
    removeFromCart(id: string) {
      const existingItem = this.items.find(item => item.gameId === id);
      if (existingItem) {
        this.items = this.items.filter(item => item.gameId !== id);
        this.totalAmount = parseFloat((this.totalAmount - existingItem.price).toFixed(2));
        this.totalQuantity = this.items.length;
        this.saveCartToStorage();
      }
    },
    clearCart() {
      this.items = [];
      this.totalAmount = 0;
      this.totalQuantity = 0;
      this.saveCartToStorage();
    },
    saveCartToStorage() {
      sessionStorage.setItem('cartItems', JSON.stringify(this.items));
      sessionStorage.setItem('totalAmount', JSON.stringify(this.totalAmount));
      sessionStorage.setItem('totalQuantity', JSON.stringify(this.totalQuantity));
    }
  },
});