import { useCreateProductMutation } from '@/features/api/root-api';
import { useAppDispatch, useAppSelector } from '@/features/hooks/root-hook';
import { addKeyValue } from '@/features/reducers/product-reducer';
import { RootState } from '@/features/store/root-store';

import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { Button } from '../Button/Button';
import { SimpleChecker } from '../Input/SimpleChecker';
import {
  SimpleImageSelector,
  SimpleInput,
  SimplePicker,
} from '../Input/SimpleImput';

interface Props {
  onItemPress?: () => void;
}

export const InformationsView = ({ onItemPress }: Props) => {
  const state = useAppSelector((state: RootState) => state.product);
  const dispatch = useAppDispatch();
  const [createProduct] = useCreateProductMutation();

  const informations = [
    {
      name: 'modèle',
      render: (
        <SimpleInput
          label="model"
          value={state.product?.model}
          onChangeText={(value) =>
            dispatch(addKeyValue({ key: 'model', value }))
          }
        />
      ),
    },
    {
      name: 'condition',
      render: (
        <SimplePicker
          placeholder="Select condition"
          label="état du produit"
          value={state.product?.state?.label}
          onCloseWhenItemPressed
          onSelect={(value) => dispatch(addKeyValue({ key: 'state', value }))}
          items={[
            { label: 'État correct', value: 'FAIR' },
            { label: 'Bon état', value: 'GOOD' },
            { label: 'Jamais porté', value: 'NEVER_WORN' },
            { label: 'Jamais porté avec étiquette', value: 'NERVER_WORN_TAG' },
          ]}
        />
      ),
    },
    {
      name: 'images',
      render: (
        <SimpleImageSelector
          label="Images"
          value={state.product?.files}
          onPress={(value) => dispatch(addKeyValue({ key: 'files', value }))}
        />
      ),
    },
    {
      name: 'vintage',
      render: <SimpleChecker label="Vintage" />,
    },
    {
      name: 'hasAuthenticatedPapers',
      render: <SimpleChecker label="Papier d'authentification" />,
    },
    {
      name: 'description',
      render: <SimpleChecker label="Description" />,
    },
  ];

  return (
    <>
      <View className="flex-1 flex flex-col space-y-2">
        <View className="flex flex-col space-y-1 items-center">
          <Text className="text-xl font-semibold">Set informations !</Text>
          <Text className="text-sm text-black/50 text-center">
            Enter the additional product information.
          </Text>
        </View>
        <FlatList
          data={informations}
          renderItem={({ item, index }) => item.render}
        />
        <View>
          <Button label="confirm" onPress={onItemPress} />
        </View>
      </View>
    </>
  );
};
