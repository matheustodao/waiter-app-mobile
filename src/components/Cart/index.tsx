import { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
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
}

export function Cart({ cartItems, onPlusItem, onMinusItem, onConfirmOrder }: CartProps) {
  const [isOrderConfirmModalVisible, setIsOrderConfirmModalVisible] = useState(false);
  const total = cartItems.reduce((acc, cartItem) => (acc + (cartItem.product.price * cartItem.quantity)), 0);

  function handleConfirmOrder() {
    setIsOrderConfirmModalVisible(true);
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
                  source={{ uri: `http://192.168.15.133:3001/uploads/${cartItem.product.imagePath}` }}
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

        <Button onPress={handleConfirmOrder} disabled={cartItems.length === 0}>
          Confirmar Pedido
        </Button>
      </Summary>
    </>
  );
}
