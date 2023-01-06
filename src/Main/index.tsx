import { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { Button } from '../components/Button';
import { Cart } from '../components/Cart';
import { Categories } from '../components/Categories';
import { Header } from '../components/Header';
import { Menu } from '../components/Menu';
import { TableModal } from '../components/TableModal';
import { CartItem } from '../types/CartItem';
import { ProductParams } from '../types/Product';

import { Container, CategoryContainer, MenuContainer, FooterContainer, Footer, CenteredContainer } from './styles';

export function Main() {
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading] = useState(false);

  function handleOpenTableModal() {
    setIsTableModalVisible(true);
  }

  function handleCloseTableModal() {
    setIsTableModalVisible(false);
  }

  function handleSaveTable(table: string) {
    setSelectedTable(table);
  }

  function handleCancelTable() {
    setSelectedTable('');
    setCartItems([]);
  }

  function handleAddToCart(product: ProductParams) {
    if (!selectedTable) {
      setIsTableModalVisible(true);
    }

    setCartItems((oldItems) => {
      const itemIndex = oldItems.findIndex((item) => item.product._id === product._id);

      if (itemIndex < 0) {
        return oldItems.concat({
          product,
          quantity: 1
        });
      }

      const newItems = [...oldItems];
      const currentItem = oldItems[itemIndex];

      newItems[itemIndex] = {
        ...currentItem,
        quantity: currentItem.quantity + 1
      };

      return newItems;
    });
  }

  function handleMinusItemToCart(productId: string) {
    setCartItems((oldItems) => {
      const itemIndex = oldItems.findIndex((item) => item.product._id === productId);

      if (itemIndex < 0) {
        return oldItems;
      }

      const newItems = [...oldItems];
      const currentItem = oldItems[itemIndex];

      if (currentItem.quantity === 1) {
        const deletedCurrentItemOnCart = oldItems.splice(itemIndex, 0);
        return deletedCurrentItemOnCart;
      }

      newItems[itemIndex] = {
        ...currentItem,
        quantity: currentItem.quantity - 1
      };

      return newItems;
    });
  }

  function handleResetOrder() {
    setSelectedTable('');
    setCartItems([]);
  }

  return (
    <>
      <Container>
        <Header selectedTable={selectedTable} onCancelOrder={handleCancelTable} />

        {isLoading && (
          <CenteredContainer>
            <ActivityIndicator color="#D73035" size="large" />
          </CenteredContainer>
        )}

        {!isLoading && (
          <>
            <CategoryContainer>
              <Categories />
            </CategoryContainer>

            <MenuContainer>
              <Menu onAddToCart={handleAddToCart} />
            </MenuContainer>
          </>
        )}
      </Container>

      <FooterContainer>
        <Footer>
          {!selectedTable && (
            <Button onPress={handleOpenTableModal} disabled={isLoading}>
              Novo Pedido
            </Button>
          )}

          {selectedTable && (
            <Cart
              cartItems={cartItems}
              onMinusItem={handleMinusItemToCart}
              onPlusItem={handleAddToCart}
              onConfirmOrder={handleResetOrder}
            />
          )}
        </Footer>

        <TableModal
          visible={isTableModalVisible}
          onClose={handleCloseTableModal}
          onSave={handleSaveTable}
        />
      </FooterContainer>
    </>
  );
}
