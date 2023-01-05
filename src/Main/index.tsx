import { useState } from 'react';
import { Button } from '../components/Button';
import { Categories } from '../components/Categories';
import { Header } from '../components/Header';
import { Menu } from '../components/Menu';
import { TableModal } from '../components/TableModal';

import { Container, CategoryContainer, MenuContainer, FooterContainer, Footer } from './styles';

export function Main() {
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);

  function handleOpenTableModal() {
    setIsTableModalVisible(true);
  }

  function handleCloseTableModal() {
    setIsTableModalVisible(false);
  }

  return (
    <>
      <Container>
        <Header />

        <CategoryContainer>
          <Categories />
        </CategoryContainer>

        <MenuContainer>
          <Menu />
        </MenuContainer>
      </Container>

      <FooterContainer>
        <Footer>
          <Button onPress={handleOpenTableModal}>
            Novo Pedido
          </Button>
        </Footer>

        <TableModal visible={isTableModalVisible} onClose={handleCloseTableModal} />
      </FooterContainer>
    </>
  );
}
