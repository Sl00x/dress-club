import clsx from 'clsx';
import { Text, View } from 'react-native';
import RemixIcon from 'react-native-remix-icon';

interface Props {
  steps: string[];
  currentStep: number;
}

export const Stepper = ({ steps, currentStep }: Props) => {
  return (
    <View className="flex flex-row justify-between items-center p-4 py-2">
      <Text className="font-bold uppercase text-lg">{steps[currentStep]}</Text>
      <View className="flex flex-row items-center">
        {steps.map((_, index) => (
          <View key={index} className="flex flex-row items-center">
            <View
              className={clsx(
                'rounded-full',
                index <= currentStep
                  ? 'bg-black w-6 h-6'
                  : 'bg-black/10 w-5 h-5'
              )}
            >
              {index < currentStep && (
                <RemixIcon name="ri-checkbox-circle-line" color="white" />
              )}
            </View>
            {index < steps.length - 1 && (
              <View
                className={clsx(
                  'w-6 h-[2px]',
                  index < currentStep ? 'bg-black' : 'bg-black/10'
                )}
              />
            )}
          </View>
        ))}
      </View>
    </View>
  );
};