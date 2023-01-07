import { useEffect, useState } from 'react';

import { ActivityIndicator } from 'react-native';
import { Button } from '../components/Button';
import { Cart } from '../components/Cart';
import { Categories } from '../components/Categories';
import { Header } from '../components/Header';
import { Menu } from '../components/Menu';
import { TableModal } from '../components/TableModal';
import { CartItem } from '../types/CartItem';
import { ProductParams } from '../types/Product';
import { Empty } from '../components/Icons/Empty';
import { Text } from '../components/Text';
import { CategoryParams } from '../types/Category';

import {
  Container,
  CategoryContainer,
  MenuContainer,
  FooterContainer,
  Footer,
  CenteredContainer,
} from './styles';
import { waiterAPI } from '../services/api/waiterAPI';
import { API_URL } from '../configs/env';

export function Main() {
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<ProductParams[]>([]);
  const [categories, setCategories] = useState<CategoryParams[]>([]);
  const [isFiltering, setIsFiltering] = useState(false);

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
        const deletedCurrentItemOnCart = newItems.filter((item) => item.product._id !== productId);
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

  async function handleSelectCategory(categoryId: string) {
    try {
      setIsFiltering(true);
      setProducts([]);
      const route = !categoryId
        ? '/products'
        : `/categories/${categoryId}/products`;

      const response = await waiterAPI.get(route);
      setProducts(response.data);
    } finally {
      setIsFiltering(false);
    }
  }

  useEffect(() => {
    Promise.all([
      waiterAPI.get('/categories'),
      waiterAPI.get('/products'),
    ])
      .then(([categoriesResponse, productsResponse]) => {
        setCategories(categoriesResponse.data);
        setProducts(productsResponse.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

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
            {categories.length > 0 && (
              <CategoryContainer>
                <Categories categories={categories} onSelectCategory={handleSelectCategory} />
              </CategoryContainer>
            )}

            {isFiltering && (
              <CenteredContainer>
                <ActivityIndicator color="#D73035" size="large" />
              </CenteredContainer>
            )}

            {products.length > 0 && (
              <MenuContainer>
                <Menu onAddToCart={handleAddToCart} products={products} />
              </MenuContainer>
            )}

            {(products.length <= 0 && !isFiltering) && (
              <CenteredContainer>
                <Empty />
                <Text color="#666" style={{ marginTop: 34 }}>Nenhum produto foi encontrado!</Text>
              </CenteredContainer>
            )}
          </>
        )}
      </Container>

      <FooterContainer>
        <Footer>
          {!selectedTable && (
            <Button onPress={handleOpenTableModal} disabled={isLoading || !products.length}>
              Novo Pedido
            </Button>
          )}

          {selectedTable && (
            <Cart
              cartItems={cartItems}
              onMinusItem={handleMinusItemToCart}
              onPlusItem={handleAddToCart}
              onConfirmOrder={handleResetOrder}
              selectedTable={selectedTable}
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
