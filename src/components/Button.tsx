import { Pressable, StyleSheet, Text } from 'react-native';
import { radii, sizes, spacing, typography, useColors } from '../theme';

type Props = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  accessibilityHint?: string;
};

export function Button({ title, onPress, variant = 'primary', accessibilityHint }: Props) {
  const colors = useColors();
  const isPrimary = variant === 'primary';
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityHint={accessibilityHint}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: isPrimary
            ? pressed
              ? colors.primaryPressed
              : colors.primary
            : colors.surface,
          opacity: !isPrimary && pressed ? 0.7 : 1,
        },
      ]}
    >
      <Text style={[styles.title, { color: isPrimary ? colors.onPrimary : colors.text }]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: sizes.buttonHeight,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...typography.headline,
    textAlign: 'center',
  },
});
