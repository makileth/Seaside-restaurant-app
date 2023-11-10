import { ActionTypes, CartType } from "@/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define the initial state for the shopping cart.
const INITIAL_STATE = {
  products: [],
  totalItems: 0,
  totalPrice: 0,
};

// a custom store for managing the shopping cart
export const useCartStore = create(
  persist<CartType & ActionTypes>(
    (set, get) => ({
      // Define the state properties and their initial values.
      products: INITIAL_STATE.products, // Initialize products with an empty array.
      totalItems: INITIAL_STATE.totalItems, // Initialize with 0.
      totalPrice: INITIAL_STATE.totalPrice,

      addToCart(item: any) {
        const products = get().products;

        const productInState = products.find(
          (product) => product.id === item.id
        );

        if (productInState) {
          const updatedProducts = products.map((product) =>
            product.id === productInState.id // change properties if match
              ? {
                  ...item, // all item's properties
                  quantity: item.quantity + product.quantity,
                  price: item.price + product.price,
                }
              : item
          );

          // update the state
          set((state: any) => ({
            products: updatedProducts,
            totalItems: state.totalItems + item.quantity,
            totalPrice: state.totalPrice + item.price,
          }));

          // by default do this:
        } else {
          set((state: any) => ({
            // Append the 'item' to the 'products' array.
            products: [...state.products, item],
            // Update the 'totalItems' by adding the quantity of the 'item'.
            totalItems: state.totalItems + item.quantity,

            totalPrice: state.totalPrice + item.price,
          }));
        }
      },

      removeFromCart(item: any) {
        set((state: any) => ({
          //  stores products that do not match
          products: state.products.filter(
            (product: any) => product.id !== item.id
          ),

          totalItems: state.totalItems - item.quantity,

          totalPrice: state.totalPrice - item.price,
        }));
      },

      adminResetCart(item: any) {
        set((state: any) => ({
          products: [],
          totalItems: 0,
          totalPrice: 0,
        }));
      },
    }),

    { name: "cart", skipHydration: true }
  )
);
