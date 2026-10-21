import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../../components/Button';
import { DoomFace } from '../../components/DoomFace';
import { radii, sizes, spacing, typography, useColors } from '../../theme';
import ReelStats, { type DayCount } from '../../specs/NativeReelStats';
import { toWeekRows } from './week';

type Props = { days: DayCount[] };

export function StatsView({ days }: Props) {
  const colors = useColors();
  const rows = toWeekRows(days);
  const today = rows[0]?.count ?? 0;

  return (
    <View style={styles.container}>
      <View
        style={[styles.today, { backgroundColor: colors.primary }]}
        accessible
        accessibilityLabel={`${today} ${today === 1 ? 'reel' : 'reels'} scrolled today`}
      >
        <View style={[styles.faceBadge, { backgroundColor: colors.onPrimary }]}>
          <DoomFace size={72} />
        </View>
        <Text style={[styles.hero, { color: colors.onPrimary }]}>{today}</Text>
        <Text style={[styles.callout, styles.heroCaption, { color: colors.onPrimary }]}>
          {today === 1 ? 'reel' : 'reels'} today
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.headline, { color: colors.text }]} accessibilityRole="header">
          Last 7 days
        </Text>
        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          {rows.map(row => (
            <View
              key={row.date}
              style={styles.row}
              accessible
              accessibilityLabel={`${row.label}: ${row.count} reels`}
            >
              <Text style={[styles.rowLabel, { color: colors.text }]}>{row.label}</Text>
              <View style={[styles.track, { backgroundColor: colors.border }]}>
                <View
                  style={[
                    styles.bar,
                    { backgroundColor: colors.primary, width: `${row.fraction * 100}%` },
                  ]}
                />
              </View>
              <Text style={[styles.rowCount, { color: colors.text }]}>{row.count}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.tip}>
        <Text style={[styles.headline, { color: colors.text }]}>Count stuck?</Text>
        <Text style={[styles.callout, { color: colors.textMuted }]}>
          Samsung and Xiaomi phones can stop the counter to save battery. In App info → Battery,
          choose Unrestricted.
        </Text>
        <Button
          title="Open App info"
          variant="secondary"
          onPress={() => ReelStats.openAppSettings()}
          accessibilityHint="Opens Doom Scroll's app info, where you can change battery settings"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.lg,
  },
  today: {
    alignItems: 'center',
    marginTop: spacing.md,
    paddingVertical: spacing.lg,
    borderRadius: radii.lg,
    gap: spacing.xs,
  },
  heroCaption: {
    opacity: 0.85,
  },
  // White badge so the Doom face's green hood stands out on the green card.
  faceBadge: {
    borderRadius: radii.full,
    padding: spacing.sm,
  },
  hero: {
    ...typography.hero,
    fontVariant: ['tabular-nums'],
  },
  headline: {
    ...typography.headline,
  },
  callout: {
    ...typography.callout,
  },
  section: {
    gap: spacing.sm,
  },
  card: {
    borderRadius: radii.lg,
    padding: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: sizes.minTouch,
    gap: spacing.md,
  },
  rowLabel: {
    ...typography.body,
    width: 96,
  },
  track: {
    flex: 1,
    height: sizes.barHeight,
    borderRadius: radii.full,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    borderRadius: radii.full,
  },
  rowCount: {
    ...typography.body,
    minWidth: 40,
    textAlign: 'right',
    fontVariant: ['tabular-nums'],
  },
  tip: {
    gap: spacing.sm,
  },
});
