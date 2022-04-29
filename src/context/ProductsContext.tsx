import React, {createContext, useReducer, useState} from 'react';

import {Producto} from '../interfaces/productsInterfaces';
// import {productsReducer, ProductsState} from './productsReducer';

type ProductsContextProps = {
  products: Producto[];
  loadProducts: () => Promise<void>;
  addProduct: (categoryId: string, productName: string) => Promise<void>;
  updateProduct: (
    categoryId: string,
    productName: string,
    productId: string,
  ) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  loadProductById: (id: string) => Promise<Producto>;
  uploadImage: (data: any, id: string) => Promise<void>;
};

// const productsInitialState: ProductsState = {
//   products: [],
// };

export const ProductsContext = createContext({} as ProductsContextProps);

export const ProductsProvider = ({children}: any) => {
  // const [state, dispatch] = useReducer(productsReducer, productsInitialState);
  const [products, setProducts] = useState<Producto[]>([]);

  const loadProducts = async () => {};

  const addProduct = async (categoryId: string, productName: string) => {};

  const updateProduct = async (
    categoryId: string,
    productName: string,
    productId: string,
  ) => {};

  const deleteProduct = async (id: string) => {};

  const loadProductById = async (id: string) => {};

  const uploadImage = async (data: any, id: string) => {};

  return (
    <ProductsContext.Provider
      value={{
        //...state,
        products,
        loadProducts,
        addProduct,
        deleteProduct,
        updateProduct,
        loadProductById,
        uploadImage,
      }}>
      {children}
    </ProductsContext.Provider>
  );
};
