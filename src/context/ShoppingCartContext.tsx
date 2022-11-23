import { createContext, ReactNode, useContext, useState } from "react";
import { ShoppingCart } from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ShoppingCartProviderProps = {
    children: ReactNode
}

type CartItem = {
    id: number
    quantity: number
}

type ShoppingCartContext = {
    openCart: () => void
    closeCart: () => void
    getItemQuantity: (id: number) => number
    increaseItemQuantity: (id: number) => void
    decreaseItemQuantity: (id: number) => void
    removeItemQuantity: (id: number) => void
    cartQuantity: number
    cartItems: CartItem[]

}
const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart() {

    return useContext(ShoppingCartContext)

}
export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    const [isOpen, setIsopen] = useState(false)
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping cart", [])

    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0)

    const openCart = () => setIsopen(true)
    const closeCart = () => setIsopen(false)

    function getItemQuantity(id: number) {

        return cartItems.find(item => item.id === id)?.quantity || 0

    }

    function increaseItemQuantity(id: number) {

        setCartItems(currItems => {
            if (currItems.find(item => item.id === id) == null) {
                return [...currItems, { id, quantity: 1 }]
            }
            else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 }
                    }
                    else {
                        return item

                    }
                })
            }
        })

    }

    function decreaseItemQuantity(id: number) {

        setCartItems(currItems => {
            if (currItems.find(item => item.id === id)?.quantity === 1) {
                return currItems.filter(item => item.id !== id)
            }
            else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 }
                    }
                    else {
                        return item

                    }
                })
            }
        })

    }

    function removeItemQuantity(id: number) {
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id)

        })
    }



    return (<ShoppingCartContext.Provider value={{
        getItemQuantity,
        increaseItemQuantity,
        decreaseItemQuantity,
        removeItemQuantity,
        openCart,
        closeCart,
        cartItems,
        cartQuantity
    }}>
        {children}
        <ShoppingCart isOpen={isOpen}/>
    </ShoppingCartContext.Provider>)

}