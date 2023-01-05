import { Modal, TouchableOpacity, Platform } from 'react-native';
import { Button } from '../Button';
import { Close } from '../Icons/Close';
import { Text } from '../Text';

import { ModalBody, Overlay, ModalHeader, ModalForm, Input } from './styles';

export function TableModal() {
  return (
    <Modal transparent>
      <Overlay behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
        <ModalBody>
          <ModalHeader>
            <Text weight="600">Informar a mesa</Text>

            <TouchableOpacity>
              <Close color="#666" />
            </TouchableOpacity>
          </ModalHeader>

          <ModalForm>
            <Input
              placeholder="Número da mesa"
              placeholderTextColor="#666"
              keyboardType="number-pad"
            />

            <Button onPress={() => alert('Salvou')}>
              Salvou
            </Button>
          </ModalForm>
        </ModalBody>
      </Overlay>
    </Modal>
  );
}
