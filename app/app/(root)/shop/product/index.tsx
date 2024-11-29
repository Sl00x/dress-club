import { TextHeader } from '@/components/Header/TextHeader';
import { EthereumLabel } from '@/components/Product/EthereumLabel';
import { useLazyGetProductQuery } from '@/features/api/root-api';
import { Product } from '@/interfaces/product.interface';
import { formatPriceToEuro } from '@/utils/formater.utils';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

const ProductPage = () => {
  const { subCatId, gender, name, category, brand } = useLocalSearchParams();
  const [getProduct, { isLoading }] = useLazyGetProductQuery();
  const [products, setProducts] = useState<Product[] | undefined>();
  const router = useRouter();

  useEffect(() => {
    getProduct(
      `gender=${gender}&${
        subCatId
          ? `subCategory=${subCatId}`
          : category
          ? `category=${category}${brand ? `&brand=${brand}` : ''}`
          : ''
      }`
    )
      .unwrap()
      .then(setProducts);
  }, [subCatId, gender]);

  return (
    <View className="h-full w-full flex flex-col">
      <TextHeader
        title={name as string}
        loading={isLoading}
        empty={products?.length == 0}
      />
      <View className="flex-1">
        <FlatList
          data={products}
          numColumns={2}
          showsHorizontalScrollIndicator={false}
          columnWrapperStyle={{
            flex: 1,
            justifyContent: 'space-around',
          }}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() =>
                router.push(
                  `/(root)/shop/product/${item.id}?name=${item.brand.name}`
                )
              }
              className="relative flex flex-col space-y-4 flex-1  justify-center p-4 border border-black/5"
            >
              {item.blockchain && (
                <View className="absolute top-2 right-2 z-10">
                  <EthereumLabel />
                </View>
              )}
              <View className="flex flex-row justify-center flex-1">
                <Image
                  source={[...item.medias].reverse()[0].media}
                  className="h-40 aspect-square rounded-md items-center"
                  contentFit="scale-down"
                  recyclingKey={item.id}
                  cachePolicy="memory"
                />
              </View>
              <View className="pt-4 flex flex-col justify-start">
                <Text className="font-semibold text-[16px]">
                  {item.brand.name}
                </Text>
                <Text className="text-sm">{item.model}</Text>
              </View>
              <View className="py-2 text-left flex-col justify-start">
                <Text className="font-bold text-sm">
                  {item && (
                    <>
                      {item.blockchain ? (
                        <View className="flex flex-col space-y-2">
                          <Text className="font-bold">
                            {`${item.prices[item.prices.length - 1].price} ETH`}
                          </Text>
                        </View>
                      ) : (
                        <>
                          {formatPriceToEuro(
                            item.prices[item.prices.length - 1].price
                          )}
                        </>
                      )}
                    </>
                  )}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};
export default ProductPage;
