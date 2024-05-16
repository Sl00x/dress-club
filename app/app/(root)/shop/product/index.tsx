import { TextHeader } from '@/components/Header/TextHeader';
import { useLazyGetProductQuery } from '@/features/api/root-api';
import { TypeCategory } from '@/interfaces/category.interface';
import { Product } from '@/interfaces/product.interface';
import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

const ProductPage = () => {
  const { subCatId, gender, name } = useLocalSearchParams();
  const [getProduct, { isLoading }] = useLazyGetProductQuery();
  const [products, setProducts] = useState<Product[] | undefined>();

  useEffect(() => {
    getProduct({ subId: subCatId as string, gender: gender as TypeCategory })
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
          columnWrapperStyle={{
            flex: 1,
            justifyContent: 'space-around',
          }}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <TouchableOpacity className="flex flex-col space-y-4 flex-1  justify-center p-4 border border-black/5">
              <View className="">
                <Image
                  source={item.medias[0].media.replace(
                    'http://localhost:9000',
                    'https://d77c31281f1d53.lhr.life'
                  )}
                  className="h-40"
                />
              </View>
              <View className="pt-4 flex flex-col justify-start">
                <Text className="font-semibold text-md">{item.brand.name}</Text>
                <Text className="text-sm">{item.model}</Text>
              </View>
              <View className="py-2 text-left flex-col justify-start">
                <Text className="font-bold text-sm">
                  {item && item.prices[item.prices.length - 1].price}€
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
