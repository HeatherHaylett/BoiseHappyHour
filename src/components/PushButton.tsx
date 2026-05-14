import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { typography } from '@/constants/typography';

type State = 'default' | 'active';

type Props = {
  label: string;
  state?: State;
  onPress?: () => void;
};

export function PushButton({ label, state = 'active', onPress }: Props) {
  const isActive = state === 'active';
  return (
    <TouchableOpacity
      style={[styles.container, isActive ? styles.containerActive : styles.containerDefault]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[typography.label, isActive ? styles.labelActive : styles.labelDefault]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 17,
    gap: 10,
  },
  containerDefault: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e4e3',
  },
  containerActive: {
    backgroundColor: '#fda100',
  },
  icon: {
    width: 13,
    height: 13,
  },
  labelDefault: {
    color: '#1e1e1e',
  },
  labelActive: {
    color: '#ffffff',
  },
});
