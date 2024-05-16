import { useGetCategoryByGenderQuery } from '@/features/api/root-api';
import { useAppDispatch, useAppSelector } from '@/features/hooks/root-hook';
import { addKeyValue } from '@/features/reducers/product-reducer';
import { RootState } from '@/features/store/root-store';
import { TypeCategory } from '@/interfaces/category.interface';
import clsx from 'clsx';
import { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import RemixIcon from 'react-native-remix-icon';

interface Props {
  onItemPress?: () => void;
}

const SelectCategory = ({ onItemPress }: Props) => {
  const state = useAppSelector((state: RootState) => state.product);
  const [currentCategory, setCurrentCategory] = useState<number | undefined>();
  const dispatch = useAppDispatch();
  const { data: categories, isLoading } = useGetCategoryByGenderQuery(
    state.product?.gender?.type as TypeCategory,
    {
      skip: !state.product?.gender?.type,
    }
  );

  return (
    <View className="h-full pt-4">
      <View className="flex flex-col space-y-1 items-center mb-4">
        <Text className="text-xl font-semibold">
          What type of product are you selling ?
        </Text>
        <Text className="text-sm text-black/50 text-center">
          It's used to define what type of product are going to be sell.
        </Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={categories}
        renderItem={({ item, index }) => (
          <View>
            <View className="flex flex-row w-full items-center justify-between">
              <TouchableOpacity
                disabled={state.product?.subCategory?.id === item.id}
                onPress={() => {
                  dispatch(addKeyValue({ key: 'category', value: item }));
                  setCurrentCategory(index);
                  if (item.subCategories && item.subCategories.length == 0) {
                    onItemPress?.();
                  }
                }}
                className={clsx(
                  'flex flex-col flex-1 p-4 border-b border-black/10',
                  currentCategory === index && 'bg-black/5'
                )}
              >
                <Text
                  className={clsx(
                    'text-lg font-medium',
                    state.product?.subCategory?.id === item.id && 'text-white'
                  )}
                >
                  {item.name}
                </Text>
                {state.product?.subCategory?.id === item.id && (
                  <RemixIcon name="ri-check-line" color="white" />
                )}
              </TouchableOpacity>
            </View>
            {currentCategory === index && (
              <View className="flex flex-col space-y-2">
                {item.subCategories &&
                  item.subCategories.map((subCat) => (
                    <TouchableOpacity
                      onPress={() => {
                        dispatch(
                          addKeyValue({ key: 'subCategory', value: subCat })
                        );
                        onItemPress?.();
                      }}
                      className="flex flex-row flex-1 px-4 items-center justify-between space-y-4"
                    >
                      <Text className="py-2 text-lg">{subCat.name}</Text>
                    </TouchableOpacity>
                  ))}
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
};
export default SelectCategory;
