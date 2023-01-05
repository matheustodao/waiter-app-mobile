import { Text } from '../Text';
import { Container } from './styles';

export function Header() {
  return (
    <Container>
      <Text size={14} opacity={0.9}>Boas vindas ao</Text>
      <Text weight="700" size={24}>
        WAITER
        <Text size={24}>APP</Text>
      </Text>
    </Container>
  );
}
