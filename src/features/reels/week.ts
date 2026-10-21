import type { DayCount } from '../../specs/NativeReelStats';

export type WeekRow = {
  date: string;
  label: string;
  count: number;
  /** count relative to the busiest day, 0–1, for the bar width */
  fraction: number;
};

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/** Turns native day counts (today first) into labelled rows for the history list. */
export function toWeekRows(days: DayCount[]): WeekRow[] {
  const max = Math.max(0, ...days.map(d => d.count));
  return days.map((day, index) => ({
    date: day.date,
    label: labelFor(day.date, index),
    count: day.count,
    fraction: max === 0 ? 0 : day.count / max,
  }));
}

function labelFor(date: string, daysAgo: number): string {
  if (daysAgo === 0) return 'Today';
  if (daysAgo === 1) return 'Yesterday';
  const [year, month, day] = date.split('-').map(Number);
  return WEEKDAYS[new Date(year, month - 1, day).getDay()];
}
