import { SmallCheckButton } from '@/components/Button/SmallCheckButton';
import { TextHeader } from '@/components/Header/TextHeader';
import {
  useGetUserGenderQuery,
  useLazyGetCategoryByGenderQuery,
} from '@/features/api/root-api';
import { useAppDispatch, useAppSelector } from '@/features/hooks/root-hook';
import { setGender } from '@/features/reducers/gender-reducer';
import { RootState } from '@/features/store/root-store';
import { Category, TypeCategory } from '@/interfaces/category.interface';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import RemixIcon from 'react-native-remix-icon';

const Shop = () => {
  const router = useRouter();
  const [getCategoryByGender, { isLoading: loadingCat }] =
    useLazyGetCategoryByGenderQuery();
  const { data: gender } = useGetUserGenderQuery();
  const [categories, setCategories] = useState<Category[] | undefined>();
  const state = useAppSelector((state: RootState) => state.gender);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (gender) {
      if (state.gender) {
        getCategoryByGender(state.gender).unwrap().then(setCategories);
        return;
      }
      dispatch(setGender(gender.type));
      getCategoryByGender(gender.type).unwrap().then(setCategories);
    }
  }, [gender, state.gender]);

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
        <FlatList
          data={categories}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => router.push(`/(root)/shop/${item.name}`)}
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

export default Shop;
