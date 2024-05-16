import { TextHeader } from '@/components/Header/TextHeader';
import { InformationsView } from '@/components/SellView/Informations';
import { PriceView } from '@/components/SellView/Price';
import SelectBrand from '@/components/SellView/SelectBrand';
import SelectCategory from '@/components/SellView/SelectCategory';
import { SelectGender } from '@/components/SellView/SelectGender';
import { Stepper } from '@/components/Stepper/Stepper';
import { useCreateProductMutation } from '@/features/api/root-api';
import { useAppSelector } from '@/features/hooks/root-hook';
import { RootState } from '@/features/store/root-store';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

const Sell = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const state = useAppSelector((state: RootState) => state.product);
  const steps = ['select gender', 'category', 'brand', 'price', 'informations'];
  const [createProduct] = useCreateProductMutation();

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
        return <InformationsView onItemPress={() => {}} />;
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
    <View className="h-full w-full">
      <TextHeader title="sell product" onBack={goBack}>
        <Stepper steps={steps} currentStep={currentStep} />
      </TextHeader>
      <View className="flex-1 p-4">{showTab()}</View>
    </View>
  );
};

export default Sell;
