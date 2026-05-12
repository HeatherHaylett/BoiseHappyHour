import { Text } from 'react-native';

type Props = {
  label: string;
};

export function Tag({ label }: Props) {
  return <Text>[ {label} ]</Text>;
}
