import { TextHeader } from '@/components/Header/TextHeader';
import { useGetSubCategoryFromCategoryQuery } from '@/features/api/root-api';
import { useAppSelector } from '@/features/hooks/root-hook';
import { RootState } from '@/features/store/root-store';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import RemixIcon from 'react-native-remix-icon';

const SubCategory = () => {
  const { name } = useLocalSearchParams();
  const router = useRouter();
  const { data: subCategories, isLoading } = useGetSubCategoryFromCategoryQuery(
    name as string,
    {
      skip: !name,
    }
  );
  const state = useAppSelector((state: RootState) => state.gender);

  return (
    <View className="h-full w-full flex flex-col">
      <TextHeader
        title={name as string}
        loading={isLoading}
        empty={!subCategories || subCategories.length == 0}
      />
      <View className="flex-1 px-4">
        <FlatList
          data={subCategories}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() =>
                router.push(
                  `/(root)/shop/product?subCatId=${item.id}&gender=${state.gender}&name=${item.name}`
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
export default SubCategory;
