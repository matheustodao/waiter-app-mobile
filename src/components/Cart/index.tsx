import { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { API_URL } from '../../configs/env';
import { waiterAPI } from '../../services/api/waiterAPI';
import { CartItem } from '../../types/CartItem';
import { ProductParams } from '../../types/Product';
import { formatCurrency } from '../../utils/formatCurrency';
import { Button } from '../Button';
import { MinusCircle } from '../Icons/MinusCircle';
import { PlusCircle } from '../Icons/PlusCircle';
import OrderConfirmModal from '../OrderConfirmModal';
import { Text } from '../Text';

import { Actions, Image, Item, ProductContainer, ProductDetails, QuantityContainer, Summary, TotalContainer } from './styles';

interface CartProps {
  cartItems: CartItem[];
  onMinusItem: (productId: string) => void;
  onPlusItem: (product: ProductParams) => void;
  onConfirmOrder: () => void;
  selectedTable: string,
}

export function Cart({ cartItems, onPlusItem, onMinusItem, onConfirmOrder, selectedTable }: CartProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOrderConfirmModalVisible, setIsOrderConfirmModalVisible] = useState(false);
  const total = cartItems.reduce((acc, cartItem) => (acc + (cartItem.product.price * cartItem.quantity)), 0);

  async function handleConfirmOrder() {
    setIsOrderConfirmModalVisible(true);
    setIsLoading(true);

    const payload = {
      table: selectedTable,
      products: cartItems.map((currentItem) => ({
        product: currentItem.product._id,
        quantity: currentItem.quantity,
      }))
    };

    await waiterAPI.post('/orders', payload);
    setIsLoading(false);
  }

  function handleOk() {
    setIsOrderConfirmModalVisible(false);
    onConfirmOrder();
  }

  return (
    <>
      <OrderConfirmModal
        visible={isOrderConfirmModalVisible}
        onOk={handleOk}
      />

      {cartItems.length > 0 && (
        <FlatList
          data={cartItems}
          keyExtractor={({ product }) => product._id}
          showsVerticalScrollIndicator={false}
          style={{ paddingBottom: 20, maxHeight: 150 }}
          renderItem={({ item: cartItem }) => (
            <Item>
              <ProductContainer>
                <Image
                  source={{ uri: `${API_URL}/uploads/${cartItem.product.imagePath}` }}
                />

                <QuantityContainer>
                  <Text size={14} color="#666">
                    {cartItem.quantity}x
                  </Text>
                </QuantityContainer>

                <ProductDetails>
                  <Text size={14} weight="600">{cartItem.product.name}</Text>

                  <Text size={14} color="#666" style={{ marginTop: 8 }}>
                    {formatCurrency(cartItem.product.price)}
                  </Text>
                </ProductDetails>
              </ProductContainer>

              <Actions>
                <TouchableOpacity style={{ marginRight: 24 }} onPress={() => onPlusItem(cartItem.product)}>
                  <PlusCircle />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => onMinusItem(cartItem.product._id)}>
                  <MinusCircle />
                </TouchableOpacity>
              </Actions>
            </Item>
          )}
        />
      )}

      <Summary>
        <TotalContainer>
          {cartItems.length === 0 && <Text color="#999">Seu carrinho está vazio</Text>}

          {cartItems.length > 0 && (
            <>
              <Text color="#666">Total</Text>
              <Text size={20} weight="600">{formatCurrency(total)}</Text>
            </>
          )}
        </TotalContainer>

        <Button
          onPress={handleConfirmOrder}
          disabled={cartItems.length === 0}
          loading={isLoading}
        >
          Confirmar Pedido
        </Button>
      </Summary>
    </>
  );
}
