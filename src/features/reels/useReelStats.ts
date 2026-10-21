import { useCallback, useEffect, useState } from 'react';
import { AppState } from 'react-native';
import ReelStats, { type DayCount } from '../../specs/NativeReelStats';

const HISTORY_DAYS = 7;

export type ReelStatsState =
  | { status: 'loading' }
  | { status: 'off' }
  | { status: 'on'; days: DayCount[] };

/** Counter status + last 7 days; refreshes whenever the app comes back to the foreground. */
export function useReelStats(): ReelStatsState {
  const [state, setState] = useState<ReelStatsState>({ status: 'loading' });

  const refresh = useCallback(async () => {
    if (!ReelStats.isCounterRunning()) {
      setState({ status: 'off' });
      return;
    }
    const days = await ReelStats.getRecentCounts(HISTORY_DAYS);
    setState({ status: 'on', days });
  }, []);

  useEffect(() => {
    refresh();
    const subscription = AppState.addEventListener('change', next => {
      if (next === 'active') refresh();
    });
    return () => subscription.remove();
  }, [refresh]);

  return state;
}
