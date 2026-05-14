import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { typography } from '@/constants/typography';

type Variant = 'yellow' | 'purple' | 'green' | 'outline';

type Props = {
  label: string;
  // eslint-disable-next-line react/require-default-props
  variant?: Variant;
  // eslint-disable-next-line react/require-default-props
  icon?: React.ReactNode;
};

const variantStyles: Record<Variant, { container: object; text: object }> = {
  yellow: {
    container: { backgroundColor: '#f9f2ce' },
    text: { color: '#ff8d28' },
  },
  purple: {
    container: { backgroundColor: '#f2f0ff' },
    text: { color: '#6155f5' },
  },
  green: {
    container: { backgroundColor: '#e8fdf2' },
    text: { color: '#008951' },
  },
  outline: {
    container: { backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#e5e4e3' },
    text: { color: '#5e5e5e' },
  },
};

export function Tag({ label, variant = 'yellow', icon }: Props) {
  const { container, text } = variantStyles[variant];
  return (
    <View style={[styles.container, container]}>
      {icon}
      <Text style={[styles.label, text]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  label: {
    ...typography.label,
  },
});
