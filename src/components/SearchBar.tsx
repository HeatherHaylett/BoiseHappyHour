import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { typography } from '@/constants/typography';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  // eslint-disable-next-line react/require-default-props
  placeholder?: string;
};

export function SearchBar({
  value,
  onChangeText,
  placeholder = 'Bar name, neighborhood, vibe...',
}: Props) {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={18} color="#9e9e9e" />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9e9e9e"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0ede8',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
  },
  input: {
    flex: 1,
    ...typography.body,
    color: '#1e1e1e',
  },
});
