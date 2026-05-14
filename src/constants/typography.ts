import { TextStyle } from 'react-native';

// Type scale from Figma design system (node 2054:1527).
// Line-height is 1× font size (Figma lineHeight: 100%).
// Load fonts in App.tsx: import { Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';

export const typography = {
  h1: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 32,
  } satisfies TextStyle,

  h2: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 24,
  } satisfies TextStyle,

  h3: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 20,
  } satisfies TextStyle,

  h4: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 16,
  } satisfies TextStyle,

  title: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 14,
  } satisfies TextStyle,

  body: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 13,
    fontWeight: '500',
  } satisfies TextStyle,

  label: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 12,
    fontWeight: '600',
  } satisfies TextStyle,
} as const;

export type TypographyKey = keyof typeof typography;
