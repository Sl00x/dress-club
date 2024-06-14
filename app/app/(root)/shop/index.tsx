import { SmallCheckButton } from '@/components/Button/SmallCheckButton';
import { TextHeader } from '@/components/Header/TextHeader';
import {
  useGetCategoryByGenderQuery,
  useGetUserGenderQuery,
} from '@/features/api/root-api';
import { useAppDispatch, useAppSelector } from '@/features/hooks/root-hook';
import { setGender } from '@/features/reducers/gender-reducer';
import { RootState } from '@/features/store/root-store';
import { TypeCategory } from '@/interfaces/category.interface';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import RemixIcon from 'react-native-remix-icon';

const Shop = () => {
  const state = useAppSelector((state: RootState) => state.gender);
  const router = useRouter();
  const { data: gender } = useGetUserGenderQuery(undefined, {
    skip: state.gender !== undefined,
  });
  const { data: categories, isLoading: loadingCat } =
    useGetCategoryByGenderQuery(state.gender!, { skip: !state.gender });
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (gender?.type) {
      dispatch(setGender(gender.type));
    } else if (!state.gender) {
      dispatch(setGender(TypeCategory.MEN));
    }
  }, [gender, dispatch]);

  return (
    <View className="h-full w-full flex flex-col">
      <TextHeader title="Categories" loading={loadingCat} />
      <View className="flex-1 px-4">
        <View className="py-2 flex flex-row space-x-2">
          <View>
            <SmallCheckButton
              label="Men"
              checked={state.gender === TypeCategory.MEN}
              onSelect={() => dispatch(setGender(TypeCategory.MEN))}
            />
          </View>
          <View>
            <SmallCheckButton
              label="Women"
              checked={state.gender === TypeCategory.WOMEN}
              onSelect={() => dispatch(setGender(TypeCategory.WOMEN))}
            />
          </View>
          <View>
            <SmallCheckButton
              label="Kids"
              checked={state.gender === TypeCategory.KIDS}
              onSelect={() => dispatch(setGender(TypeCategory.KIDS))}
            />
          </View>
        </View>
        <View className="flex-1">
          <TouchableOpacity
            onPress={() => {
              if (!state.gender) return;
              router.push(
                `/(root)/shop/product?gender=${state.gender}&name=Tous les produits`
              );
            }}
            className="flex flex-row w-full items-center justify-between p-4 border-b border-black/10"
          >
            <Text className="text-lg font-medium">Tous les produits</Text>
            <RemixIcon name="ri-arrow-right-s-fill" />
          </TouchableOpacity>
          <FlatList
            data={categories}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => {
                  if (item.subCategories.length > 0) {
                    router.push(`/(root)/shop/${item.name}`);
                    return;
                  }
                  router.push(
                    `/(root)/shop/brand?category=${item.id}&name=${item.name}`
                  );
                }}
                className="flex flex-row w-full items-center justify-between p-4 border-b border-black/10"
              >
                <Text className="text-lg font-medium">{item.name}</Text>
                <RemixIcon name="ri-arrow-right-s-fill" />
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default Shop;
