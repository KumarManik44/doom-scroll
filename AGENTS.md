# AGENTS.md

Shared instructions for every coding agent (Claude Code, Codex, Cursor, Copilot, Gemini CLI).
Keep this file short: commands, rules, gotchas. Product goals live in `docs/PRD.md`, visual rules in `DESIGN.md`.

## Project

Doom Scroll — a small test app that counts Instagram Reels scrolled per day. **Android only** (iOS can't observe other apps). Runs locally on emulator/device only; no deployment, store builds or CI.

- **Stack:** React Native (Community CLI, no Expo) + TypeScript (strict)
- **Navigation:** React Navigation 7 (native stack + bottom tabs)
- **Styling:** `StyleSheet` + theme tokens from `src/theme/` (generated from `DESIGN.md`). No UI kit unless agreed.
- **State:** React state/context first; Zustand only if shared state grows.
- **Storage:** reel counts live natively in Android `SharedPreferences` (the background Accessibility Service writes them; JS reads via a native module). AsyncStorage only for JS-only prefs.
- **Native:** Kotlin Accessibility Service + overlay in `android/app/src/main/java/.../reels/`
- **Package manager:** npm

## Status

v0.3 — Home screen (setup state / today hero card + 7-day history) reads counts via the `ReelStats` TurboModule (`src/specs/NativeReelStats.ts`). Doom-green in-app theme; overlay pill and Doom face keep their own colors. Single screen, no navigation.

## Commands

```sh
npm install                       # install JS deps
npm start                         # Metro bundler
npm run android                   # build + run on Android emulator
npx tsc --noEmit                  # typecheck
npm run lint                      # eslint
npm test                          # jest + React Native Testing Library
cd android && ./gradlew testDebugUnitTest   # Kotlin unit tests (counting rules)
```

## Layout (target)

```
src/App.tsx       root: providers + navigation container
src/screens/      one file per screen — screens stay thin
src/navigation/   navigators and route types
src/components/   reusable UI
src/features/     feature folders (hooks, logic, components per feature)
src/theme/        tokens.ts derived from DESIGN.md
src/lib/          storage, utils
```

## Rules

- TypeScript strict; no `any` without a comment explaining why.
- After installing a package with native code or changing Kotlin, rebuild (`npm run android`) — Metro reload alone isn't enough.
- Never hard-code colors, spacing, font sizes or radii — import from `src/theme`. If a token is missing, add it to `DESIGN.md` first, then `tokens.ts`.
- Lists: `FlashList` or `FlatList`, never `ScrollView` + `.map()` for unbounded data.
- Animations: Reanimated. Gestures: react-native-gesture-handler. Safe areas: react-native-safe-area-context.
- Respect safe areas and the keyboard on every screen.
- Every touchable has an `accessibilityLabel` and a ≥44pt hit target; support font scaling and dark mode.
- Don't add a dependency for something a few lines of code can do. Ask before adding anything large.

## Gotchas

- **Updating the app on the Samsung (Android 12):** installing over the app while the accessibility service is bound leaves a dead binding — settings say enabled but the service never starts. Safe update: `adb shell settings put secure enabled_accessibility_services '""'` → install → re-enable (`settings put secure enabled_accessibility_services com.doomscroll/com.doomscroll.reels.ReelCounterService` and `accessibility_enabled 1`). If already stuck, only uninstall + reinstall fixes it; back up counts first by installing the debug build over it and `run-as com.doomscroll cat shared_prefs/reel_counts.xml`.
- Install `installRelease` for the user's phone (JS bundled; debug builds need Metro). Both use the same debug keystore, so they update each other.
- Enabling the service from phone Settings can turn on Samsung's floating Accessibility button (`accessibility_button_targets`). The user doesn't want it; clear that setting if it appears.

## Done means

1. `npx tsc --noEmit` and `npm run lint` pass.
2. Tests for logic you touched pass (`npm test`).
3. You opened the screen on the Android emulator/device (or explained why you couldn't) and checked light + dark mode.
