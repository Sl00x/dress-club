import { useGetGenderQuery, usePrefetch } from '@/features/api/root-api';
import { useAppDispatch, useAppSelector } from '@/features/hooks/root-hook';
import { addKeyValue } from '@/features/reducers/product-reducer';
import { RootState } from '@/features/store/root-store';
import { TypeCategory } from '@/interfaces/category.interface';
import { Dimensions, Text, TextInput, View } from 'react-native';
import RemixIcon from 'react-native-remix-icon';
import { Button } from '../Button/Button';

interface Props {
  onItemPress?: () => void;
}

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 260;

export const PriceView = ({ onItemPress }: Props) => {
  const state = useAppSelector((state: RootState) => state.product);
  const dispatch = useAppDispatch();
  const { data: genders } = useGetGenderQuery();
  const prefetch = usePrefetch('getCategoryByGender');

  const getGenderFromType = (type: TypeCategory) => {
    prefetch(type);
    return genders?.filter((gender) => gender.type === type)[0];
  };

  return (
    <View className="flex-1 flex flex-col space-y-2 p-4">
      <View className="flex flex-col space-y-1 items-center mb-10">
        <Text className="text-xl font-semibold">Select price !</Text>
        <Text className="text-sm text-black/50 text-center">
          Please note that we take a percentage of the sale.
        </Text>
      </View>

      <View className="flex flex-col space-y-4 p-4">
        <View className="p-4 bg-white border border-black/20 rounded-md">
          <View className="w-full">
            <Text className="text-black/50 ">Price:</Text>
          </View>
          <View className="flex flex-row space-x-2 items-center">
            <TextInput
              className="bg-transparent w-full text-lg flex-1"
              keyboardType="number-pad"
              placeholder="0"
              value={state.product?.price?.toString()}
              onChangeText={(text) =>
                dispatch(
                  addKeyValue({
                    key: 'price',
                    value: isNaN(parseFloat(text)) ? 0 : parseFloat(text),
                  })
                )
              }
              placeholderTextColor={'rgba(0,0,0,0.5)'}
            />
            <Text className="font-bold text-2xl text-black/50">€</Text>
          </View>
        </View>
      </View>
      <View className="flex flex-row justify-center">
        <RemixIcon name="ri-arrow-down-fill" color="rgba(0,0,0,.5)" size={50} />
      </View>
      <View className="flex flex-col space-y-4 p-4">
        <View className="p-4 bg-black/10  rounded-md">
          <View className="w-full">
            <Text className="text-black/50 ">Price after fees (10%):</Text>
          </View>
          <View className="flex flex-row space-x-2 items-center">
            <Text className="text-black/50 bg-transparent w-full text-lg flex-1">
              {state.product?.price! - state.product?.price! * 0.1}
            </Text>
            <Text className="font-bold text-2xl text-black/50">€</Text>
          </View>
        </View>
      </View>
      <View className="p-4">
        <Button label="Next" onPress={onItemPress} />
      </View>
    </View>
  );
};
