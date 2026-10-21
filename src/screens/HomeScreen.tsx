import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SetupView } from '../features/reels/SetupView';
import { StatsView } from '../features/reels/StatsView';
import { useReelStats } from '../features/reels/useReelStats';
import { spacing, useColors } from '../theme';

export function HomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const stats = useReelStats();

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + spacing.md, paddingBottom: insets.bottom + spacing.lg },
      ]}
    >
      {stats.status === 'loading' && (
        <View style={styles.loading}>
          <ActivityIndicator color={colors.textMuted} />
        </View>
      )}
      {stats.status === 'off' && <SetupView />}
      {stats.status === 'on' && <StatsView days={stats.days} />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    paddingHorizontal: spacing.md,
    width: '100%',
    maxWidth: 640,
    alignSelf: 'center',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
  },
});
