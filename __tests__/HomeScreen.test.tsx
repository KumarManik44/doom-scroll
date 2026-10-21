import { fireEvent, render, screen } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { HomeScreen } from '../src/screens/HomeScreen';
import ReelStats from '../src/specs/NativeReelStats';

jest.mock('../src/specs/NativeReelStats', () => ({
  __esModule: true,
  default: {
    getRecentCounts: jest.fn(),
    isCounterRunning: jest.fn(),
    openAccessibilitySettings: jest.fn(),
    openAppSettings: jest.fn(),
  },
}));

const mockStats = jest.mocked(ReelStats);

const metrics = {
  frame: { x: 0, y: 0, width: 390, height: 844 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

function renderHome() {
  return render(
    <SafeAreaProvider initialMetrics={metrics}>
      <HomeScreen />
    </SafeAreaProvider>,
  );
}

describe('HomeScreen', () => {
  beforeEach(() => jest.clearAllMocks());

  it('asks to turn on the counter when it is not running', async () => {
    mockStats.isCounterRunning.mockReturnValue(false);
    await renderHome();

    expect(await screen.findByText('Turn on the reel counter')).toBeOnTheScreen();
    await fireEvent.press(screen.getByRole('button', { name: 'Open Accessibility settings' }));
    expect(mockStats.openAccessibilitySettings).toHaveBeenCalled();
  });

  it("shows today's count and the last days when running", async () => {
    mockStats.isCounterRunning.mockReturnValue(true);
    mockStats.getRecentCounts.mockResolvedValue([
      { date: '2026-10-21', count: 47 },
      { date: '2026-10-20', count: 120 },
    ]);
    await renderHome();

    expect(await screen.findByLabelText('47 reels scrolled today')).toBeOnTheScreen();
    expect(screen.getByLabelText('Yesterday: 120 reels')).toBeOnTheScreen();
    expect(mockStats.getRecentCounts).toHaveBeenCalledWith(7);
  });
});
