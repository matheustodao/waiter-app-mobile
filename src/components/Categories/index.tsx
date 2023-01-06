import { useState } from 'react';
import { FlatList } from 'react-native';
import { CategoryParams } from '../../types/Category';
import { Text } from '../Text';
import { Category, Icon } from './styles';

interface CategoriesProps {
  categories: CategoryParams[];
  onSelectCategory: (categoryId: string) => Promise<void>
}

export function Categories({ categories, onSelectCategory }: CategoriesProps) {
  const [selectedCategory, setSelectedCategory] = useState('');

  function handleSelectCategory(categoryId: string) {
    const category = selectedCategory === categoryId ? '' : categoryId;
    setSelectedCategory(category);
    onSelectCategory(category);
  }

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={categories}
      contentContainerStyle={{ paddingRight: 24 }}
      keyExtractor={(category) => category._id}
      renderItem={({ item: category }) => {
        const isSelected = selectedCategory === category._id;

        return (
          (
            <Category onPress={() => handleSelectCategory(category._id)}>
              <Icon>
                <Text opacity={isSelected ? 1 : 0.5}>
                  {category.icon}
                </Text>
              </Icon>

              <Text size={14} weight="600" opacity={isSelected ? 1 : 0.5} style={{ textTransform: 'capitalize' }}>
                {category.name}
              </Text>
            </Category>
          )
        );
      }}
    />
  );
}
