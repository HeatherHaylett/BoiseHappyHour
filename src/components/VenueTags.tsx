import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { VenueTag } from '@/types';
import { Tag } from '@/components/Tag';

type Props = {
  tags: VenueTag[];
  isOpen: boolean;
};

const TAG_ICONS: Partial<Record<VenueTag, keyof typeof Ionicons.glyphMap>> = {
  patio: 'partly-sunny-outline',
  dog_outside: 'partly-sunny-outline',
  dog_inside: 'home-outline',
  live_music: 'musical-notes-outline',
  sports_tv: 'tv-outline',
  heated_patio: 'flame-outline',
};

export function VenueTags({ tags, isOpen }: Props) {
  return (
    <View style={styles.container}>
      {isOpen && (
        <Tag
          variant="green"
          label="happening now"
          icon={<Ionicons name="time-outline" size={12} color="#008951" />}
        />
      )}
      {tags.map((tag) => {
        const iconName = TAG_ICONS[tag];
        return (
          <Tag
            key={tag}
            variant="outline"
            label={tag.replace(/_/g, ' ')}
            icon={iconName ? <Ionicons name={iconName} size={12} color="#5e5e5e" /> : undefined}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
});
