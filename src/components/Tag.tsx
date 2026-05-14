import { StyleSheet, Text, View } from 'react-native';

type Variant = 'yellow' | 'purple' | 'green';

type Props = {
  label: string;
  variant?: Variant;
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
};

export function Tag({ label, variant = 'yellow' }: Props) {
  const { container, text } = variantStyles[variant];
  return (
    <View style={[styles.container, container]}>
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
    paddingVertical: 8,
    borderRadius: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 12,
  },
});
