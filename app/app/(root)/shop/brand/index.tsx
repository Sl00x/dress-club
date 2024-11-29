import { TextHeader } from '@/components/Header/TextHeader';
import { useGetBrandsFromCategoryQuery } from '@/features/api/root-api';
import { useAppSelector } from '@/features/hooks/root-hook';
import { RootState } from '@/features/store/root-store';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import RemixIcon from 'react-native-remix-icon';

const BrandList = () => {
  const { category, name } = useLocalSearchParams();
  const router = useRouter();
  const { data: brands, isLoading } = useGetBrandsFromCategoryQuery(
    category as string,
    {
      skip: !category,
    }
  );
  const state = useAppSelector((state: RootState) => state.gender);

  return (
    <View className="h-full w-full flex flex-col">
      <TextHeader
        title={name as string}
        loading={isLoading}
        empty={!brands || brands.length == 0}
      />
      <View className="flex-1 px-4">
        <TouchableOpacity
          onPress={() =>
            router.push(
              `/(root)/shop/product?category=${category}&gender=${state.gender}`
            )
          }
          className="flex flex-row w-full items-center justify-between p-4 border-b border-black/10"
        >
          <Text className="text-lg font-medium">Toutes les produits</Text>
          <RemixIcon name="ri-arrow-right-s-fill" />
        </TouchableOpacity>
        <FlatList
          data={brands}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() =>
                router.push(
                  `/(root)/shop/product?category=${category}&gender=${state.gender}&brand=${item.id}&name=${item.name}`
                )
              }
              className="flex flex-row w-full items-center justify-between p-4 border-b border-black/10"
            >
              <Text className="text-lg font-medium">{item.name}</Text>
              <RemixIcon name="ri-arrow-right-s-fill" />
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};
export default BrandList;
