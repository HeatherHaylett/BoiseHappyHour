import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { typography } from '@/constants/typography';

type Props = {
  label: string;
  active: boolean;
  onPress: () => void;
  // eslint-disable-next-line react/require-default-props
  icon?: React.ReactNode;
};

export function FilterButton({
  label, active, onPress, icon,
}: Props) {
  return (
    <TouchableOpacity
      style={[styles.container, active ? styles.containerActive : styles.containerDefault]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {icon}
      <Text style={[typography.label, active ? styles.labelActive : styles.labelDefault]}>
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
    gap: 6,
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
  labelDefault: {
    color: '#1e1e1e',
  },
  labelActive: {
    color: '#ffffff',
  },
});
