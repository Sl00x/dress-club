import clsx from 'clsx';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { View } from 'react-native';
import PagerView from 'react-native-pager-view';

interface Props {
  images: string[];
}

export const Carousel = ({ images }: Props) => {
  const [currentPage, setCurrentPage] = useState(0);
  return (
    <View className="flex-1 relative">
      {images && images.length > 0 && (
        <PagerView
          className="h-full"
          initialPage={0}
          onPageSelected={(e) => {
            setCurrentPage(e.nativeEvent.position);
          }}
        >
          {images.map((image, index) => (
            <View className="flex-1 items-center" key={index}>
              <Image
                source={image}
                className="w-full h-full object-center bg-white aspect-square"
                contentFit="cover"
              />
            </View>
          ))}
        </PagerView>
      )}
      <View className="absolute w-full justify-center bottom-2 flex flex-row space-x-2">
        <View className="flex flex-row space-x-2 bg-black/50 rounded-full p-2">
          {images.map((image, index) => (
            <View
              key={index}
              className={clsx(
                'bg-white/50 rounded-full h-2',
                currentPage === index ? 'w-4 bg-white' : 'w-2 bg-white/50'
              )}
            />
          ))}
        </View>
      </View>
    </View>
  );
};
