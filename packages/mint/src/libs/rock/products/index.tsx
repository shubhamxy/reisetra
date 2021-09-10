import React, { createContext, useContext, useReducer } from 'react'

const ProductsStateContext = createContext<ProductsState>(null)
const ProductsDispatchContext = createContext(null)

export function useProductsState(): ProductsState {
    const context = useContext(ProductsStateContext)
    if (context === undefined) {
        throw new Error(
            'useProductsState must be used within a ProductsStateContextProvider'
        )
    }
    return context
}

export function useProductsDispatch(): React.Dispatch<Action> {
    const context = useContext<React.Dispatch<Action>>(ProductsDispatchContext)
    if (context === undefined) {
        throw new Error(
            'useProductsDispatch must be used within a ProductsDispatchContext'
        )
    }
    return context
}

interface ProductsState {}

const initialState: ProductsState = {}

enum ActionKind {}

type Action = {
    type: ActionKind
    payload?: any
}

function reducer(state: ProductsState, action: Action): ProductsState {
    const { type, payload } = action
    switch (type) {
        default:
            return state
    }
}

export const ProductsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <ProductsStateContext.Provider value={state}>
            <ProductsDispatchContext.Provider value={dispatch}>
                {children}
            </ProductsDispatchContext.Provider>
        </ProductsStateContext.Provider>
    )
}

export * from './useProducts'
