// Derived from DESIGN.md — change values there first, then here.

export const lightColors = {
  primary: '#2F5D3A',
  primaryPressed: '#24482D',
  onPrimary: '#FFFFFF',
  background: '#E6EFE8',
  surface: '#D5E4D9',
  surfaceRaised: '#F3F7F4',
  border: '#C3D6C8',
  text: '#0E1A11',
  textMuted: '#4B5E50',
  success: '#2F9E6B',
  warning: '#D9822B',
  danger: '#D64545',
};

export type Colors = typeof lightColors;

export const darkColors: Colors = {
  ...lightColors,
  primary: '#3D7A4C',
  primaryPressed: '#2F5D3A',
  background: '#0E1D13',
  surface: '#16291B',
  surfaceRaised: '#1D3423',
  border: '#29432F',
  text: '#EEF4EF',
  textMuted: '#A3B6A8',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const radii = {
  sm: 8,
  md: 12,
  lg: 20,
  full: 999,
};

export const typography = {
  hero: { fontSize: 72, fontWeight: '800', lineHeight: 80 },
  display: { fontSize: 34, fontWeight: '700', lineHeight: 41, letterSpacing: 0.4 },
  title: { fontSize: 22, fontWeight: '600', lineHeight: 28 },
  headline: { fontSize: 17, fontWeight: '600', lineHeight: 22 },
  body: { fontSize: 17, fontWeight: '400', lineHeight: 24 },
  callout: { fontSize: 15, fontWeight: '400', lineHeight: 20 },
  caption: { fontSize: 12, fontWeight: '500', lineHeight: 16 },
} as const;

export const sizes = {
  buttonHeight: 52,
  minTouch: 44,
  barHeight: 8,
};
