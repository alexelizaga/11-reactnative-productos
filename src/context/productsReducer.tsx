import {Producto} from '../interfaces/productsInterfaces';

export interface ProductsState {
  products: Producto[] | null;
}

type ProductsAction = {type: 'getProducts'} | {type: 'getCategories'};

export const productsReducer = (
  action: ProductsAction,
  state: ProductsState,
) => {
  switch (action.type) {
    case 'getProducts':
      return {
        ...state,
      };
    default:
      return state;
  }
};
