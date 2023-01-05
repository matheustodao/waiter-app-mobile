import { Button } from '../components/Button';
import { Categories } from '../components/Categories';
import { Header } from '../components/Header';
import { Menu } from '../components/Menu';

import { Container, CategoryContainer, MenuContainer, FooterContainer, Footer } from './styles';

export function Main() {
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
          <Button onPress={() => alert('oka')}>
            Novo Pedido
          </Button>
        </Footer>
      </FooterContainer>
    </>
  );
}
