import { ProductParams } from './Product';

export interface CartItem {
  product: ProductParams,
  quantity: number
}
