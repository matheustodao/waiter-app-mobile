import styled from 'styled-components/native';
import { Platform, StatusBar } from 'react-native';

const isAndroid = Platform.OS === 'android';
const currentHeight = StatusBar.currentHeight;

export const Container = styled.SafeAreaView`
  flex: 1;
  margin-top: ${() => isAndroid ? `${currentHeight}px` : '0'};
  background: #fAfAfA;
`;

export const CategoryContainer = styled.View`
  height: 73px;
  margin-top: 34px;
`;

export const MenuContainer = styled.View`
  flex: 1;
`;

export const FooterContainer = styled.SafeAreaView`
`;

export const Footer = styled.View`
  background: #ffffff;
  padding: 16px 24px;
`;
