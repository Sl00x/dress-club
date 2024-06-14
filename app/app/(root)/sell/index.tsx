import { TextHeader } from '@/components/Header/TextHeader';
import NotifyModal from '@/components/Modal/NotifyModal';
import { InformationsView } from '@/components/SellView/Informations';
import { PriceView } from '@/components/SellView/Price';
import SelectBrand from '@/components/SellView/SelectBrand';
import SelectCategory from '@/components/SellView/SelectCategory';
import { SelectGender } from '@/components/SellView/SelectGender';
import { Stepper } from '@/components/Stepper/Stepper';
import { ToastType, useToast } from '@/components/Toaster/Toaster';
import { useCreateProductMutation } from '@/features/api/root-api';
import { useAppDispatch, useAppSelector } from '@/features/hooks/root-hook';
import { addKeyValue, clearAll } from '@/features/reducers/product-reducer';
import { RootState } from '@/features/store/root-store';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import RemixIcon from 'react-native-remix-icon';

const Sell = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const state = useAppSelector((state: RootState) => state.product);
  const steps = ['univer', 'catégorie', 'designer', 'prix', 'informations'];
  const [createProduct] = useCreateProductMutation();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleCreateProduct = () => {
    const formData = new FormData();
    formData.append('model', state.product?.model!);
    formData.append('price', state.product?.price?.toString()!);
    if (state.product?.subCategory) {
      formData.append('subCategoryId', state.product?.subCategory?.id!);
    }
    formData.append('categoryId', state.product?.category?.id!);
    formData.append('brandId', state.product?.brand?.id!);
    formData.append('state', state.product?.state?.value!);
    formData.append('vintage', state?.product?.vintage! as any);
    formData.append('blockchain', state?.product?.blockchain! as any);
    if (state.product?.files) {
      state.product?.files.map((file) =>
        formData.append('files', {
          uri: file.uri,
          type: file.type,
          name: file.name,
        } as any)
      );
    }
    formData.append('genderId', state.product?.gender?.id!);
    createProduct(formData)
      .unwrap()
      .then(() => {
        setOpen(true);
      })
      .catch(() =>
        toast(
          ToastType.ERROR,
          'Impossible de créer le produit veuillez réssayer !'
        )
      );
  };

  const showTab = () => {
    switch (currentStep) {
      case 0:
        return <SelectGender onItemPress={() => nextStep()} />;
      case 1:
        return <SelectCategory onItemPress={() => nextStep()} />;
      case 2:
        return <SelectBrand onItemPress={() => nextStep()} />;
      case 3:
        return <PriceView onItemPress={() => nextStep()} />;
      case 4:
        return <InformationsView onItemPress={() => handleCreateProduct()} />;
    }
  };

  const goBack = () => {
    if (currentStep == 0) {
      router.back();
    } else {
      if (currentStep > 0) setCurrentStep((prev) => prev - 1);
    }
  };

  const nextStep = () => {
    if (currentStep > steps.length - 1) return;
    setCurrentStep((prev) => prev + 1);
  };

  return (
    <>
      <NotifyModal
        title={'Félicitation !'}
        open={open}
        onClose={() => {
          setCurrentStep(0);
          dispatch(clearAll());
          dispatch(addKeyValue({ key: 'blockchain', value: false }));
          dispatch(addKeyValue({ key: 'vintage', value: false }));
          setOpen(false);
          router.push('/(root)/home');
        }}
      >
        <View className="h-full flex flex-col justify-center items-center space-y-2">
          <View className="p-4 bg-green-100 rounded-full">
            <RemixIcon name="ri-check-fill" color="green" size={40} />
          </View>
          <View className="pt-4 space-y-4 flex flex-col justify-center items-center w-full">
            <Text className="text-lg font-semibold">
              Votre produit est en ligne !
            </Text>
            <View className="w-full h-[1px] bg-black/5" />
            <Text className="text-sm text-black/50 text-center">
              Voici un résumé de ce que vous avez mis en ligne. Les informations
              du produit sont modifiable depuis votre 'Espace personnel'.
            </Text>
          </View>
          <ScrollView className="h-1/2 flex flex-col w-full">
            <View className="flex flex-row justify-between items-center border-b border-black/10 p-4">
              <Text className="text-[16px] font-semibold">Catégorie</Text>
              <Text className="text-[16px] text-black/50">
                {state.product?.category?.name}
              </Text>
            </View>
            <View className="flex flex-row justify-between items-center border-b border-black/10 p-4">
              <Text className="text-[16px] font-semibold">Sous cétagorie</Text>
              <Text className="text-[16px] text-black/50">
                {state.product?.subCategory?.name || 'Aucune'}
              </Text>
            </View>
            <View className="flex flex-row justify-between items-center border-b border-black/10 p-4">
              <Text className="text-[16px] font-semibold">Marque</Text>
              <Text className="text-[16px] text-black/50">
                {state.product?.brand?.name || 'Aucune'}
              </Text>
            </View>
            <View className="flex flex-row justify-between items-center border-b border-black/10 p-4">
              <Text className="text-[16px] font-semibold">Pour</Text>
              <Text className="text-[16px] text-black/50">
                {state.product?.gender?.type || 'Personne'}
              </Text>
            </View>
            <View className="flex flex-row justify-between items-center border-b border-black/10 p-4">
              <Text className="text-[16px] font-semibold">Modèle</Text>
              <Text className="text-[16px] text-black/50">
                {state.product?.model || 'Aucun'}
              </Text>
            </View>
            <View className="flex flex-row justify-between items-center border-b border-black/10 p-4">
              <Text className="text-[16px] font-semibold">Blockchain</Text>
              <Text className="text-[16px] text-black/50">
                {state.product?.blockchain ? 'Oui' : 'Non'}
              </Text>
            </View>
            <View className="flex flex-row justify-between items-center border-b border-black/10 p-4">
              <Text className="text-[16px] font-semibold">Prix</Text>
              <Text className="text-[16px] text-black/50">
                {state.product?.price || '0'}{' '}
                {state.product?.blockchain ? 'ETH' : '€'}
              </Text>
            </View>
            <View className="flex flex-row justify-between items-center border-b border-black/10 p-4">
              <Text className="text-[16px] font-semibold">État du produit</Text>
              <Text className="text-[16px] text-black/50">
                {state.product?.state?.label || 'Aucun'}
              </Text>
            </View>
          </ScrollView>
        </View>
      </NotifyModal>
      <View className="h-full w-full">
        <TextHeader title="nouvelle vente" onBack={goBack}>
          <Stepper steps={steps} currentStep={currentStep} />
        </TextHeader>
        <View className="flex-1 p-4">{showTab()}</View>
      </View>
    </>
  );
};

export default Sell;
