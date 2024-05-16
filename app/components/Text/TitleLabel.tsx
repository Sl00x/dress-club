import { Text, View } from 'react-native';

interface Props {
  title: string;
  subTitle?: string;
}

export const TitleLabel = ({ title, subTitle }: Props) => {
  return (
    <View className="flex flex-col">
      <Text className="text-xl font-semibold">{title}</Text>
      {subTitle && <Text className="text-sm opacity-50">{subTitle}</Text>}
    </View>
  );
};
