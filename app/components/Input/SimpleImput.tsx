import clsx from 'clsx';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import ModalScreen from '../Modal/Modal';

interface InputProps extends TextInputProps {
  label: string;
}

export const SimpleInput = (props: InputProps) => {
  return (
    <View className="w-full p-4 border-b border-black/20 flex flex-row justify-between items-center">
      <Text className="font-semibold uppercase text-[16px]">{props.label}</Text>
      <TextInput
        className="flex-1 text-[16px] text-right"
        {...props}
        placeholder={`Enter ${props.label}`}
        placeholderTextColor={'rgba(0,0,0,0.5)'}
      />
    </View>
  );
};

export interface SelectorData {
  label: string;
  value: string;
}

interface InputPickerProps {
  label: string;
  value?: string;
  items: SelectorData[];
  placeholder: string;
  onCloseWhenItemPressed?: boolean;
  onSelect?: (data: SelectorData) => void;
}

export const SimplePicker = (props: InputPickerProps) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ModalScreen
        title={props.label}
        open={open}
        onClose={() => setOpen(false)}
      >
        {props.items.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              props.onSelect?.(item);
              if (props.onCloseWhenItemPressed) return setOpen(false);
            }}
            className="w-full flex flex-row justify-center py-2"
          >
            <Text className="text-[18px] font-semibold">{item.label}</Text>
          </TouchableOpacity>
        ))}
      </ModalScreen>
      <View className="w-full p-4 flex flex-row justify-between items-center border-b border-black/20">
        <Text className="font-semibold uppercase text-[16px] flex-1">
          {props.label}
        </Text>
        <TouchableOpacity onPress={() => setOpen(true)}>
          <Text
            className={clsx(
              'text-[16px]',
              props.value?.length! > 0 ? 'text-black' : 'text-black/50'
            )}
          >
            {props.value?.length! > 0 ? props.value : props.placeholder}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

interface InputImageSelectorProps {
  label: string;
  value?: { uri: string; name: string; type: string }[];
  onPress?: (datas: { uri: string; name: string; type: string }[]) => void;
}

export const SimpleImageSelector = (props: InputImageSelectorProps) => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<
    { uri: string; name: string; type: string }[]
  >([]);

  const pickImage = async () => {
    setLoading(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      selectionLimit: 5,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      orderedSelection: true,
      quality: 0,
    });
    if (!result.canceled) {
      result.assets.forEach((image, index) => {
        let uri = image.uri;
        let filename = uri.split('/').pop();
        let match = /\.(\w+)$/.exec(filename!);
        let type = match ? `image/${match[1]}` : `image`;
        setImages((prev) => [
          ...prev,
          { uri: uri!, name: filename!, type: type! },
        ]);
      });

      props.onPress?.(
        result.assets.map((asset) => {
          let uri = asset.uri;
          let filename = uri.split('/').pop();
          let match = /\.(\w+)$/.exec(filename!);
          let type = match ? `image/${match[1]}` : `image`;
          return { uri: uri, name: filename!, type: type };
        })
      );
      setLoading(false);
    }
  };

  return (
    <>
      <View className="w-full flex p-4 flex-col space-y-2  border-b border-black/20">
        <View className="flex flex-row  justify-between items-center">
          <Text className="font-semibold uppercase text-[16px] flex-1">
            {props.label}
          </Text>
          <TouchableOpacity onPress={() => pickImage()}>
            <Text
              className={clsx(
                'text-[16px]',
                props.value?.length! > 0 ? 'text-black' : 'text-black/50'
              )}
            >
              Select images
            </Text>
          </TouchableOpacity>
        </View>
        {!loading && props.value && props.value.length > 0 && (
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              columnGap: 14,
            }}
            persistentScrollbar={true}
            data={props.value}
            renderItem={({ item, index }) => (
              <View className="relative">
                <Image
                  source={item.uri}
                  className="aspect-square rounded-md h-[100px]"
                  contentFit="cover"
                />
              </View>
            )}
          />
        )}

        {loading && <ActivityIndicator color={'black'} size="small" />}
      </View>
    </>
  );
};
