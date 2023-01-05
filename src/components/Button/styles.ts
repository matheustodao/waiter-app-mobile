import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  background: ${({ disabled }) => (!disabled ? '#D73035' : '#999')};
  padding: 14px 24px;
  border-radius: 48px;
  align-items: center;
  justify-content: center;
`;
