import { Modal } from 'react-native';
import { CheckCircle } from '../Icons/CheckCircle';
import { Text } from '../Text';
import { Container, OkayButton } from './styles';

interface OrderConfirmModalProps {
  visible: boolean;
  onOk: () => void;
}

export default function OrderConfirmModal({ visible, onOk }: OrderConfirmModalProps) {
  return (
    <Modal visible={visible} animationType="slide">
      <Container>
        <CheckCircle />
        <Text size={20} weight="600" color="#fff" style={{ marginTop: 15 }}>
          Pedido Confirmado
        </Text>

        <Text opacity={0.9} color="#fff" style={{ marginTop: 12 }}>
          O pedido já entrou na fila de produção!
        </Text>

        <OkayButton onPress={onOk}>
          <Text weight="600" color="#D73035">
            OK
          </Text>
        </OkayButton>
      </Container>
    </Modal>
  );
}
