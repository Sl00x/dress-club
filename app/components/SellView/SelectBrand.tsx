import { useGetBrandsFromCategoryQuery } from '@/features/api/root-api';
import { useAppDispatch, useAppSelector } from '@/features/hooks/root-hook';
import { addKeyValue } from '@/features/reducers/product-reducer';
import { RootState } from '@/features/store/root-store';
import clsx from 'clsx';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import RemixIcon from 'react-native-remix-icon';

interface Props {
  onItemPress?: () => void;
}

const SelectBrand = ({ onItemPress }: Props) => {
  const state = useAppSelector((state: RootState) => state.product);
  const dispatch = useAppDispatch();
  const { data: brands, isLoading } = useGetBrandsFromCategoryQuery(
    state.product?.category?.id as string,
    {
      skip: !state.product?.category?.id,
    }
  );

  return (
    <View className="h-full pt-4">
      <View className="flex flex-col space-y-1 items-center mb-4">
        <Text className="text-xl font-semibold">
          What is a brand of your product ?
        </Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={brands}
        renderItem={({ item, index }) => (
          <View>
            <View className="flex flex-row w-full items-center justify-between">
              <TouchableOpacity
                disabled={state.product?.subCategory?.id === item.id}
                onPress={() => {
                  dispatch(addKeyValue({ key: 'brand', value: item }));
                  onItemPress?.();
                }}
                className={clsx(
                  'flex flex-col flex-1 p-4 border-b border-black/10'
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
          </View>
        )}
      />
    </View>
  );
};
export default SelectBrand;
