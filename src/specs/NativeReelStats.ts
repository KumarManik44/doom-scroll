import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export type DayCount = {
  /** Local date, yyyy-MM-dd */
  date: string;
  count: number;
};

/** Native bridge to the reel counter (android/.../reels/ReelStatsModule.kt). */
export interface Spec extends TurboModule {
  /** Counts for the last `days` days, today first. */
  getRecentCounts(days: number): Promise<Array<DayCount>>;
  /** True while the accessibility service is actually connected, not just enabled in settings. */
  isCounterRunning(): boolean;
  openAccessibilitySettings(): void;
  /** App info page, where battery usage can be set to Unrestricted. */
  openAppSettings(): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('ReelStats');
