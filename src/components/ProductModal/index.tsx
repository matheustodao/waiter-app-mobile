import { FlatList, Modal } from 'react-native';
import { API_URL } from '../../configs/env';
import { ProductParams } from '../../types/Product';
import { formatCurrency } from '../../utils/formatCurrency';
import { Button } from '../Button';
import { Close } from '../Icons/Close';
import { Text } from '../Text';
import {
  CloseButton,
  Footer,
  FooterContainer,
  Header,
  Image,
  Ingredient,
  IngredientsContainer,
  ModalBody,
  PriceContainer,
} from './styles';

interface ProductModalProps {
  visible: boolean;
  onClose: () => void;
  product: ProductParams | null;
  onAddToCart: (product: ProductParams) => void;
}

export function ProductModal({ visible, onClose, product, onAddToCart }: ProductModalProps) {
  if (!product) return null;

  function handleAddToCart() {
    onAddToCart(product!);
    onClose();
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <Image
        source={{ uri: `${API_URL}/uploads/${product.imagePath}` }}
      >
        <CloseButton onPress={onClose}>
          <Close />
        </CloseButton>
      </Image>

      <ModalBody>
        <Header>
          <Text size={24} weight="600">{product.name}</Text>
          <Text size={16} color="#666" style={{ marginTop: 8 }}>
            {product.description}
          </Text>
        </Header>

        {!!product.ingredients.length && (
          <IngredientsContainer>
            <Text size={16} weight="600" color="#666">Ingredientes</Text>

            <FlatList
              data={product.ingredients}
              keyExtractor={(ingredient) => ingredient._id}
              showsVerticalScrollIndicator={false}
              style={{ marginTop: 16 }}
              renderItem={({ item: ingredient }) => (
                <Ingredient>
                  <Text style={{ marginRight: 20 }}>{ingredient.icon}</Text>
                  <Text size={14} color="#666">{ingredient.name}</Text>
                </Ingredient>
              )}
            />
          </IngredientsContainer>
        )}
      </ModalBody>

      <FooterContainer>
        <Footer>
          <PriceContainer>
            <Text color="#666">
              Pre??o
            </Text>

            <Text size={20} weight="600">
              {formatCurrency(product.price)}
            </Text>
          </PriceContainer>

          <Button onPress={handleAddToCart}>
            Adicionar Pedido
          </Button>
        </Footer>
      </FooterContainer>
    </Modal>
  );
}
