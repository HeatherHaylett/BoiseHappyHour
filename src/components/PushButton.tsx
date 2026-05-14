import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';

type State = 'default' | 'active';

type Props = {
  label: string;
  state?: State;
  onPress?: () => void;
};

function PlusIcon({ color }: { color: string }) {
  return (
    <Svg width={10} height={10} viewBox="0 0 10 10" fill="none">
      <Path
        d="M4.54167 0.75V8.33333M0.75 4.54167H8.33333"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function PushButton({ label, state = 'active', onPress }: Props) {
  const isActive = state === 'active';
  return (
    <TouchableOpacity
      style={[styles.container, isActive ? styles.containerActive : styles.containerDefault]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <PlusIcon color={isActive ? '#ffffff' : '#1e1e1e'} />
      <Text style={[styles.label, isActive ? styles.labelActive : styles.labelDefault]}>
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
  label: {
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 12,
  },
  labelDefault: {
    color: '#1e1e1e',
  },
  labelActive: {
    color: '#ffffff',
  },
});
