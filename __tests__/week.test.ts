import { toWeekRows } from '../src/features/reels/week';

describe('toWeekRows', () => {
  it('labels today, yesterday, then weekdays', () => {
    const rows = toWeekRows([
      { date: '2026-10-21', count: 5 },
      { date: '2026-10-20', count: 3 },
      { date: '2026-10-19', count: 0 },
      { date: '2026-10-18', count: 1 },
    ]);
    expect(rows.map(r => r.label)).toEqual(['Today', 'Yesterday', 'Mon', 'Sun']);
  });

  it('scales bars to the busiest day', () => {
    const rows = toWeekRows([
      { date: '2026-10-21', count: 10 },
      { date: '2026-10-20', count: 40 },
      { date: '2026-10-19', count: 0 },
    ]);
    expect(rows.map(r => r.fraction)).toEqual([0.25, 1, 0]);
  });

  it('handles a week with no reels', () => {
    const rows = toWeekRows([
      { date: '2026-10-21', count: 0 },
      { date: '2026-10-20', count: 0 },
    ]);
    expect(rows.map(r => r.fraction)).toEqual([0, 0]);
  });
});
