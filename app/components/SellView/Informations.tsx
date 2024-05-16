import { useCreateProductMutation } from '@/features/api/root-api';
import { useAppDispatch, useAppSelector } from '@/features/hooks/root-hook';
import { addKeyValue } from '@/features/reducers/product-reducer';
import { RootState } from '@/features/store/root-store';
import clsx from 'clsx';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button } from '../Button/Button';
import ModalScreen from '../Modal/Modal';

interface Props {
  onItemPress?: () => void;
}

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
        {props.items.map((item) => (
          <TouchableOpacity
            onPress={() => {
              props.onSelect?.(item);
              if (props.onCloseWhenItemPressed) return setOpen(false);
            }}
            className="w-full flex flex-row justify-center py-2"
          >
            <Text className="text-[16px] font-semibold">{item.label}</Text>
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
      quality: 1,
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

  useEffect(() => {
    console.log(props.value);
  }, [props.value]);

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
                  className="h-full aspect-square rounded-md"
                  contentFit="cover"
                />
                {/* <TouchableOpacity
                  className="rounded-b-md h-10 absolute bottom-0 w-full left-0 bg-red-500 flex flex-row items-center justify-center"
                  onPress={() => {
                    const copyUris = [...imageUris];
                    copyUris.splice(index, 1);
                    setImageUris(copyUris);
                  }}
                >
                  <RemixIcon name="ri-delete-bin-7-line" color="white" />
                </TouchableOpacity> */}
              </View>
            )}
          />
        )}

        {loading && <ActivityIndicator color={'black'} size="small" />}
      </View>
    </>
  );
};

export const InformationsView = ({ onItemPress }: Props) => {
  const state = useAppSelector((state: RootState) => state.product);
  const dispatch = useAppDispatch();
  const [createProduct] = useCreateProductMutation();

  const informations = [
    {
      name: 'model',
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
          label="condition"
          value={state.product?.state?.label}
          onCloseWhenItemPressed
          onSelect={(value) => dispatch(addKeyValue({ key: 'state', value }))}
          items={[
            { label: 'Bad Condition', value: 'BAD' },
            { label: 'Medium Condition', value: 'MEDIUM' },
            { label: 'Good Condition', value: 'GOOD' },
            { label: 'Very Good Condition', value: 'VERY_GOOD' },
            { label: 'New Product', value: 'NEW' },
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
          <Button
            label="confirm"
            onPress={async () => {
              const formData = new FormData();
              formData.append('model', state.product?.model!);
              formData.append('price', state.product?.price?.toString()!);
              formData.append('subCategoryId', state.product?.subCategory?.id!);
              formData.append('brandId', state.product?.brand?.id!);
              formData.append('state', state.product?.state?.value!);
              if (state.product?.files) {
                await Promise.all(
                  state.product?.files.map(async (file) => {
                    const response = await fetch(file.uri);
                    const blob = await response.blob();
                    const fileC = new File([blob], file.name, {
                      type: file.type,
                    });
                    formData.append('files', fileC);
                  })
                );
              }
              formData.append('genderId', state.product?.gender?.id!);
              createProduct(formData);
            }}
          />
        </View>
      </View>
    </>
  );
};
