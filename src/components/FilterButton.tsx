import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { typography } from '@/constants/typography';

type Props = {
  label: string;
  onPress?: () => void;
};

export function FilterButton({ label, onPress }: Props) {
  const [toggleActive, setToggleActive] = useState(false);

  function handlePress() {
    setToggleActive(!toggleActive);
    onPress ? onPress() : null;
  }

  return (
    <TouchableOpacity
      style={[styles.container, toggleActive ? styles.containerActive : styles.containerDefault]}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <Text style={[typography.label, toggleActive ? styles.labelActive : styles.labelDefault]}>
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
    borderWidth: 1,
    borderColor: '#fda100',
  },
  icon: {
    width: 13,
    height: 13,
  },
  labelDefault: {
    ...typography.label,
    color: '#1e1e1e',
  },
  labelActive: {
    ...typography.label,
    color: '#ffffff',
  },
});
