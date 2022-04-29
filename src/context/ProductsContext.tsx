import React, {createContext, useReducer, useState, useEffect} from 'react';

import {Producto, ProductsResponse} from '../interfaces/productsInterfaces';
// import {productsReducer, ProductsState} from './productsReducer';
import cafeApi from '../api/cafeApi';

type ProductsContextProps = {
  products: Producto[];
  loadProducts: () => Promise<void>;
  addProduct: (categoryId: string, productName: string) => Promise<Producto>;
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

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const resp = await cafeApi.get<ProductsResponse>('/productos?limite=50');
    // setProducts([...products, ...resp.data.productos]);
    setProducts([...resp.data.productos]);
  };

  const addProduct = async (
    categoryId: string,
    productName: string,
  ): Promise<Producto> => {
    const resp = await cafeApi.post<Producto>('/productos', {
      nombre: productName,
      categoria: categoryId,
    });
    setProducts([...products, resp.data]);
    return resp.data;
  };

  const updateProduct = async (
    categoryId: string,
    productName: string,
    productId: string,
  ) => {
    const resp = await cafeApi.put<Producto>(`/productos/${productId}`, {
      nombre: productName,
      categoria: categoryId,
    });
    setProducts(
      products.map(prod => {
        return prod._id === productId ? resp.data : prod;
      }),
    );
  };

  const deleteProduct = async (id: string) => {
    await cafeApi.delete<Producto>(`/productos/${id}`);
    setProducts(products.filter(prod => prod._id !== id));
  };

  const loadProductById = async (id: string): Promise<Producto> => {
    const resp = await cafeApi.get<Producto>(`/productos/${id}`);
    return resp.data;
  };

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
