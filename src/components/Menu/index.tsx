import { useState } from 'react';
import { FlatList } from 'react-native';
import { API_URL } from '../../configs/env';
import { ProductParams } from '../../types/Product';
import { formatCurrency } from '../../utils/formatCurrency';
import { PlusCircle } from '../Icons/PlusCircle';
import { ProductModal } from '../ProductModal';
import { Text } from '../Text';

import {
  Product,
  ProductImage,
  ProductDetails,
  Separator,
  AddToCartButton
} from './styles';

interface MenuProps {
  onAddToCart: (product: ProductParams) => void;
  products: ProductParams[]
}

export function Menu({ onAddToCart, products }: MenuProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductParams | null>(null);

  function handleOpenModal(product: ProductParams) {
    setIsModalVisible(true);
    setSelectedProduct(product);
  }

  function handleCloseModal() {
    setIsModalVisible(false);
  }

  return (
    <>
      <ProductModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        product={selectedProduct}
        onAddToCart={onAddToCart}
      />

      <FlatList
        data={products}
        style={{ marginTop: 32 }}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 8 }}
        keyExtractor={(product) => product._id}
        ItemSeparatorComponent={Separator}
        renderItem={({ item: product }) => (
          <Product onPress={() => handleOpenModal(product)}>
            <ProductImage
              source={{ uri: `${API_URL}/uploads/${product.imagePath}` }}
            />

            <ProductDetails>
              <Text weight="600">{product.name}</Text>

              <Text size={14} color="#666" style={{ marginVertical: 8 }}>
                {product.description}
              </Text>

              <Text size={14} weight="600">
                {formatCurrency(product.price)}
              </Text>
            </ProductDetails>

            <AddToCartButton onPress={() => onAddToCart(product)}>
              <PlusCircle />
            </AddToCartButton>
          </Product>
        )}
      />
    </>
  );
}
