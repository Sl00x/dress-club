import { Feather } from '@expo/vector-icons';
import { TextInput, TouchableOpacity, View } from 'react-native';
import RemixIcon from 'react-native-remix-icon';

interface Props {
  query: string;
  placeholder?: string;
  onQueryChange?: (value: string) => void;
}

export const SearchBar = ({ query, placeholder, onQueryChange }: Props) => {
  return (
    <View className="bg-black/10 w-full flex flex-row justify-between rounded-lg items-center px-3 space-x-2">
      <RemixIcon name="ri-search-2-line" color="rgba(0,0,0,0.5)" size={16} />
      <TextInput
        placeholder={placeholder}
        keyboardType="default"
        returnKeyType="done"
        className="flex-1 text-black py-3"
        placeholderTextColor={'rgba(0,0,0,0.5)'}
        value={query}
        onChangeText={onQueryChange}
      />
      {query.length > 0 && (
        <TouchableOpacity>
          <Feather name="x" color="black" size={18} />
        </TouchableOpacity>
      )}
    </View>
  );
};
