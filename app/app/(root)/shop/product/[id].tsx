import { Button } from '@/components/Button/Button';
import { UserButton } from '@/components/Button/UserButton';
import { Carousel } from '@/components/Carousel/Carousel';
import { TextHeader } from '@/components/Header/TextHeader';
import { Input } from '@/components/Input/TextInput';
import ModalScreen from '@/components/Modal/Modal';
import { EthereumLabel } from '@/components/Product/EthereumLabel';
import { LikeProduct } from '@/components/Product/LikeProduct';
import { ProductConditionTag } from '@/components/Product/ProductConditionTag';
import { useGetProductByIdQuery } from '@/features/api/root-api';
import { formatPriceToEuro } from '@/utils/formater.utils';
import clsx from 'clsx';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

const DetailProduct = () => {
  const { id, name } = useLocalSearchParams();
  const { data: product, isLoading } = useGetProductByIdQuery(id as string, {
    skip: !id,
  });
  const [stringUris, setStringUris] = useState<string[]>([]);
  const [openOfferModal, setOpenOfferModal] = useState(false);
  const [currentOffer, setCurrentOffer] = useState('');

  useEffect(() => {
    setStringUris([]);
  }, []);
  useEffect(() => {
    if (!product) return;

    product.medias.forEach((media) => {
      setStringUris((prev) => [...prev, media.media]);
    });
    setCurrentOffer(product.prices[product.prices.length - 1].price.toString());
  }, [product]);

  return (
    <View className="h-full w-full">
      <ModalScreen
        title={'Faire une offre'}
        open={openOfferModal}
        onClose={() => setOpenOfferModal(false)}
      >
        <View className="py-4 px-4 space-y-4">
          <Input
            label="Votre offre"
            keyboardType="number-pad"
            returnKeyType="done"
            onChangeText={setCurrentOffer}
            value={currentOffer}
            placeholder="0"
            rightLabel={product?.blockchain ? 'ETH' : '€'}
          />
          <View className="flex flex-row space-x-2 items-center">
            <Button
              className="flex-1"
              label="Prix minimum"
              variant="info"
              onPress={() => {
                const price = parseFloat(currentOffer);
                const result = (70 / 100) * price;
                setCurrentOffer(result.toString());
              }}
            />
            <Button className="flex-1" label="Valider" />
          </View>
        </View>
      </ModalScreen>
      <TextHeader title={name as string} loading={isLoading} />

      <View className={clsx('w-full  border-b border-black/10 h-1/3')}>
        <Carousel images={stringUris} />
      </View>
      <ScrollView className="px-4 space-y-2 flex-1">
        {product?.blockchain && (
          <View className="flex flex-row space-x-1 pt-4">
            <EthereumLabel />
          </View>
        )}
        <View className="flex flex-row justify-between">
          <View className="flex flex-col space-y-1">
            <Text className="font-semibold text-xl">{product?.brand.name}</Text>
            <Text className="text-sm text-black/70">{product?.model}</Text>
            <Text className="text-sm  text-black/70">Taille - S US</Text>
            <View>
              <ProductConditionTag condition={product?.state!} />
            </View>
            <Text className="font-medium text-[16px] text-black">
              {product?.blockchain
                ? `${product.prices[product.prices.length - 1].price} ETH`
                : formatPriceToEuro(
                    product?.prices[product.prices.length - 1].price!
                  )}
            </Text>
          </View>
          <LikeProduct />
        </View>
        <View className="flex flex-row  space-x-2 items-center">
          <View>
            <UserButton user={product?.user} />
          </View>
          <View className="flex flex-col justify-center">
            <Text className="font-semibold text-lg">{`${product?.user?.firstname} ${product?.user?.lastname}`}</Text>
            <Text className="text-black/50 italic text-xs">{`Super vendeur`}</Text>
          </View>
        </View>
      </ScrollView>
      <View className=" py-1 flex flex-row space-x-2 px-2">
        <Button
          className="flex-1 p-1"
          label="Ajouter au panier"
          variant="light"
        />
        <Button
          className="flex-1"
          label="Faire une offre"
          onPress={() => setOpenOfferModal(true)}
        />
      </View>
    </View>
  );
};

export default DetailProduct;
