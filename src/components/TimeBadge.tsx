import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import { typography } from '@/constants/typography';

type Props = {
  start: string;
  end: string;
};

function formatTime(time: string): string {
  const d = dayjs(`2000-01-01 ${time}`, 'YYYY-MM-DD HH:mm');
  return d.minute() === 0 ? d.format('h') : d.format('h:mm');
}

function formatAmPm(time: string): string {
  return dayjs(`2000-01-01 ${time}`, 'YYYY-MM-DD HH:mm').format('A');
}

export function TimeBadge({ start, end }: Props) {
  const startAmPm = formatAmPm(start);
  const endAmPm = formatAmPm(end);
  const label = startAmPm === endAmPm
    ? `${formatTime(start)} – ${formatTime(end)} ${endAmPm}`
    : `${formatTime(start)} ${startAmPm} – ${formatTime(end)} ${endAmPm}`;

  return (
    <View style={styles.container}>
      <Ionicons name="time-outline" size={13} color="#fda100" />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef3d0',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    gap: 4,
  },
  label: {
    ...typography.label,
    color: '#fda100',
  },
});
