import { TouchableOpacity } from 'react-native';
import { Text } from '../Text';
import { Container, Content, OrderHeader, Table } from './styles';

interface HeaderProps {
  selectedTable: string;
  onCancelOrder: () => void;
}

export function Header({ selectedTable, onCancelOrder }: HeaderProps) {
  return (
    <Container>
      {!selectedTable && (
        <>
          <Text size={14} opacity={0.9}>Boas vindas ao</Text>
          <Text weight="700" size={24}>
            WAITER
            <Text size={24}>APP</Text>
          </Text>
        </>
      )}

      {selectedTable && (
        <Content>
          <OrderHeader>
            <Text weight="600" size={24}>
              Pedido
            </Text>

            <TouchableOpacity onPress={onCancelOrder}>
              <Text weight="600" size={14} color="#D73035">
                Cancelar pedido
              </Text>
            </TouchableOpacity>
          </OrderHeader>

          <Table>
            <Text color="#666">
              Mesa {selectedTable}
            </Text>
          </Table>
        </Content>
      )}
    </Container>
  );
}
