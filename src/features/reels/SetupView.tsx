import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../../components/Button';
import { DoomFace } from '../../components/DoomFace';
import { spacing, typography, useColors } from '../../theme';
import ReelStats from '../../specs/NativeReelStats';

const STEPS = [
  'Tap the button below.',
  'Open Installed apps (or Downloaded apps).',
  'Choose Doom Scroll reel counter and turn it on.',
  'Leave its shortcut switch off, so Android doesn’t add a floating button.',
];

/** Shown while the counter service isn't running (first launch, or Android stopped it). */
export function SetupView() {
  const colors = useColors();
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <DoomFace size={96} />
        <Text style={[styles.title, { color: colors.text }]} accessibilityRole="header">
          Turn on the reel counter
        </Text>
        <Text style={[styles.text, { color: colors.textMuted }]}>
          Doom Scroll uses Accessibility to notice when you swipe to a new reel in Instagram. It
          only counts. Nothing leaves your phone.
        </Text>
        <View style={styles.steps}>
          {STEPS.map((step, index) => (
            <Text key={step} style={[styles.text, { color: colors.text }]}>
              {index + 1}. {step}
            </Text>
          ))}
        </View>
      </View>
      <Button
        title="Open Accessibility settings"
        onPress={() => ReelStats.openAccessibilitySettings()}
        accessibilityHint="Opens your phone's Accessibility settings"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'space-between',
    gap: spacing.lg,
  },
  body: {
    alignItems: 'center',
    gap: spacing.md,
    paddingTop: spacing.xxl,
  },
  title: {
    ...typography.title,
    textAlign: 'center',
  },
  text: {
    ...typography.body,
  },
  steps: {
    alignSelf: 'stretch',
    gap: spacing.sm,
  },
});
