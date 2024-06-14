import { useGetGenderQuery, usePrefetch } from '@/features/api/root-api';
import { useAppDispatch, useAppSelector } from '@/features/hooks/root-hook';
import { addKeyValue } from '@/features/reducers/product-reducer';
import { RootState } from '@/features/store/root-store';
import { TypeCategory } from '@/interfaces/category.interface';
import { Text, View } from 'react-native';
import { SquareGradientButton } from '../Button/SquareGradientButton';

interface Props {
  onItemPress?: () => void;
}

export const SelectGender = ({ onItemPress }: Props) => {
  const state = useAppSelector((state: RootState) => state.product);
  const dispatch = useAppDispatch();
  const { data: genders } = useGetGenderQuery();
  const prefetch = usePrefetch('getCategoryByGender');

  const getGenderFromType = (type: TypeCategory) => {
    prefetch(type);
    return genders?.filter((gender) => gender.type === type)[0];
  };

  const selectItem = (type: TypeCategory) => {
    dispatch(
      addKeyValue({
        key: 'gender',
        value: getGenderFromType?.(type),
      })
    );
    onItemPress?.();
  };

  return (
    <View className="h-full flex flex-col space-y-2 p-4 py-20">
      <View className="flex flex-col space-y-1 items-center mb-10">
        <Text className="text-xl font-semibold">
          What type of product are you selling ?
        </Text>
        <Text className="text-sm text-black/50 text-center">
          It's used to define what type of product are going to be sell.
        </Text>
      </View>
      <View className="flex flex-row justify-around space-x-2 ">
        <SquareGradientButton
          onPress={() => {
            selectItem(TypeCategory.MEN);
          }}
          label="HOMME"
          colors={['#283048', '#859398']}
          icon={'ri-men-line'}
        />
        <SquareGradientButton
          onPress={() => {
            selectItem(TypeCategory.WOMEN);
          }}
          label="FEMME"
          colors={['#F2709C', '#FF9472']}
          icon={'ri-women-line'}
        />
      </View>
      <View className="flex flex-row justify-around space-x-2 ">
        <SquareGradientButton
          onPress={() => {
            selectItem(TypeCategory.KIDS);
          }}
          label="GARÇON"
          colors={['#1CD8D2', '#93EDC7']}
          icon={'ri-bear-smile-line'}
        />
        <SquareGradientButton
          onPress={() => {
            selectItem(TypeCategory.KIDS);
          }}
          label="FILLE"
          colors={['#4776E6', '#8E54E9']}
          icon={'ri-cactus-line'}
        />
      </View>
    </View>
  );
};
