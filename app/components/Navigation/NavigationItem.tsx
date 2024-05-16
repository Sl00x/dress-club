import clsx from 'clsx';
import { Text, TouchableOpacity } from 'react-native';
import RemixIcon from 'react-native-remix-icon';

interface Props {
  link: () => void;
  active: boolean;
  name: string;
  icon: string;
}

export const NavigationItem = ({ link, active = false, icon, name }: Props) => {
  return (
    <TouchableOpacity onPress={link} className=" flex flex-col items-center">
      <RemixIcon
        name={icon}
        size={25}
        color={active ? 'black' : 'rgba(0,0,0,.5)'}
      />
      <Text
        className={clsx(active ? 'font-semibold text-black' : 'opacity-50')}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
};
