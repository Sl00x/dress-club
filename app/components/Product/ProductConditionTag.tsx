import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import RemixIcon from 'react-native-remix-icon';
import ModalScreen from '../Modal/Modal';

export enum ProductState {
  FAIR = 'FAIR',
  GOOD = 'GOOD',
  VERY_GOOD = 'VERY_GOOD',
  NEVER_WORN = 'NEVER_WORN',
  NEVER_WORN_TAG = 'NEVER_WORN_TAG',
}

const TranslatedState = {
  [ProductState.FAIR]: 'Correct',
  [ProductState.GOOD]: 'Bon État',
  [ProductState.VERY_GOOD]: 'Très Bon',
  [ProductState.NEVER_WORN]: 'Jamais Porté',
  [ProductState.NEVER_WORN_TAG]: 'Neuf Avec Étiquette',
};

interface Props {
  condition: ProductState;
}

export const ProductConditionTag = ({ condition }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ModalScreen
        title={'Conditions Details'}
        open={open}
        onClose={() => setOpen(false)}
      >
        <View className="w-full flex flex-col space-y-1 mb-2">
          <View className="w-full flex flex-col space-y-1 p-2 bg-black/5">
            <Text className="text-lg font-semibold">
              {TranslatedState[ProductState.FAIR]}
            </Text>
            <Text>
              Produit avec de l'usure mais bien entretenue. On peut y voir
              quelque marques, rayures.
            </Text>
          </View>
          <View className="w-full flex flex-col space-y-1 p-2 bg-white">
            <Text className="text-lg font-semibold">
              {TranslatedState[ProductState.GOOD]}
            </Text>
            <Text>
              Produit en bonne condition, entretenue. Avec quelque que trace
              d'usure (rayures, délavé, marques)
            </Text>
          </View>
          <View className="w-full flex flex-col space-y-1 p-2 bg-black/5">
            <Text className="text-lg font-semibold">
              {TranslatedState[ProductState.VERY_GOOD]}
            </Text>
            <Text>
              Produit en très bonne condition, très peu utilisé avec quelque
              petite marques et autre type d'usure mais qui reste faible.
            </Text>
          </View>
          <View className="w-full flex flex-col space-y-1 p-2 bg-white">
            <Text className="text-lg font-semibold">
              {TranslatedState[ProductState.NEVER_WORN]}
            </Text>
            <Text>
              Produit neuf, qui n'a pas été porté ne montre aucun défauts sauf
              vraiment minime. Mais sans étiquette
            </Text>
          </View>
          <View className="w-full flex flex-col space-y-1 p-2 bg-black/5">
            <Text className="text-lg font-semibold">
              {TranslatedState[ProductState.NEVER_WORN_TAG]}
            </Text>
            <Text>
              Produit neuf, qui n'a pas été porté ne montre aucun défauts sauf
              vraiment minime. Avec étiquette
            </Text>
          </View>
        </View>
      </ModalScreen>
      <TouchableOpacity
        onPress={() => setOpen(true)}
        className="flex flex-row space-x-1 items-center"
      >
        <RemixIcon name="ri-information-fill" color="black" size={18} />
        <Text className="text-black font-medium text-sm">
          {TranslatedState[condition]}
        </Text>
      </TouchableOpacity>
    </>
  );
};
