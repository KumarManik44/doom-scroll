---
version: alpha
name: Doom Scroll
description: Doctor Doom themed — cloak green, steel greys, near-black. Calm and native otherwise.
colors:
  primary: "#2F5D3A"
  primary-pressed: "#24482D"
  on-primary: "#FFFFFF"
  background: "#E6EFE8"
  surface: "#D5E4D9"
  surface-raised: "#F3F7F4"
  border: "#C3D6C8"
  text: "#0E1A11"
  text-muted: "#4B5E50"
  success: "#2F9E6B"
  warning: "#D9822B"
  danger: "#D64545"
  background-dark: "#0E1D13"
  surface-dark: "#16291B"
  surface-raised-dark: "#1D3423"
  border-dark: "#29432F"
  text-dark: "#EEF4EF"
  text-muted-dark: "#A3B6A8"
  primary-dark: "#3D7A4C"
  primary-pressed-dark: "#2F5D3A"
  overlay-bg: "#FFFFFF"
  overlay-text: "#111114"
  overlay-border: "#E4E4E9"
  doom-dark: "#0B0B0E"
  doom-metal: "#9AA1AB"
  doom-metal-shadow: "#5E646D"
  doom-hood: "#2F5D3A"
typography:
  hero:
    fontFamily: System
    fontSize: 72px
    fontWeight: 800
    lineHeight: 80px
  display:
    fontFamily: System
    fontSize: 34px
    fontWeight: 700
    lineHeight: 41px
    letterSpacing: 0.4px
  title:
    fontFamily: System
    fontSize: 22px
    fontWeight: 600
    lineHeight: 28px
  headline:
    fontFamily: System
    fontSize: 17px
    fontWeight: 600
    lineHeight: 22px
  body:
    fontFamily: System
    fontSize: 17px
    fontWeight: 400
    lineHeight: 24px
  callout:
    fontFamily: System
    fontSize: 15px
    fontWeight: 400
    lineHeight: 20px
  caption:
    fontFamily: System
    fontSize: 12px
    fontWeight: 500
    lineHeight: 16px
rounded:
  sm: 8px
  md: 12px
  lg: 20px
  full: 999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.headline}"
    rounded: "{rounded.md}"
    height: 52px
    padding: 16px
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    typography: "{typography.headline}"
    rounded: "{rounded.md}"
    height: 52px
    padding: 16px
  card:
    backgroundColor: "{colors.surface-raised}"
    rounded: "{rounded.lg}"
    padding: 16px
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    height: 48px
    padding: 12px
  overlay-pill:
    backgroundColor: "{colors.overlay-bg}"
    textColor: "{colors.overlay-text}"
    typography: "{typography.headline}"
    rounded: "{rounded.full}"
    height: 40px
    padding: 8px
    iconSize: 36px
  tab-bar:
    backgroundColor: "{colors.background}"
    textColor: "{colors.text-muted}"
    typography: "{typography.caption}"
    height: 56px
---

## Overview

Doom Scroll is Doctor Doom themed: his green cloak is the brand color, steel greys and near-black do the rest. The in-app screens are green throughout (pale cloak green in light mode, deep cloak green in dark mode); the Doom face icon and the Instagram overlay pill keep their own colors. It should still feel calm and native, not loud. Follow platform conventions (iOS HIG / Material 3) over custom flourishes — it's a small app and should feel at home on the phone.

## Colors

- **Primary — Doom green (#2F5D3A / dark #3D7A4C):** Buttons, links, toggles, plus the brand moments: the hero card behind today's count and the history bars. White text on it passes AA in both modes.
- **Background / Surface:** All green-tinted. Background is the screen; surface is grouped content (lists, inputs); surface-raised is cards on top of surface.
- **Text / Text-muted:** Body copy uses `text`; secondary info, timestamps and placeholders use `text-muted`.
- **Status colors** (success, warning, danger) appear only for state feedback, never as brand color.
- Every color has a dark-mode pair (`*-dark`). The app follows the system appearance by default. All text pairs must meet WCAG AA (4.5:1 body, 3:1 large).

## Typography

System font (SF Pro on iOS, Roboto on Android) — no custom font until there's a reason. The scale mirrors iOS text styles so Dynamic Type scales naturally; always allow font scaling (`allowFontScaling` stays on). One `display` per screen at most.

## Layout

- 8-point grid; use spacing tokens only.
- Screen horizontal padding: `md` (16px). Space between sections: `lg` (24px).
- Always respect safe-area insets; content must never sit under the notch, home indicator or keyboard.
- Single-column layouts. On tablets, cap content width around 640px and center it.

## Elevation & Depth

Prefer color contrast (surface vs background) over shadows. If a shadow is needed (floating button, sheet), use one soft shadow: y 2, blur 8, 8% black — and none in dark mode, where raised surfaces are lighter instead.

## Shapes

- `md` (12px): buttons, inputs, small cards.
- `lg` (20px): cards, sheets, modals.
- `full`: avatars, pills, chips.

## Components

- **Buttons:** One primary button per screen. Full width at the bottom of forms. Pressed state uses `primary-pressed` plus light haptic feedback.
- **Cards:** Used for feed/list items that open detail. No borders in light mode; 1px `border-dark` in dark mode.
- **Lists:** Native-feeling rows, min height 44pt, chevron only when tapping navigates.
- **Tab bar:** 3–5 tabs max, icon + label, active tab in `primary`.
- **Overlay pill (native, Android):** Light pill (`overlay-bg` white, 1px `overlay-border` outline; same in light and dark — it floats over other apps) with the Doom face icon (36px, nearly filling the pill height) on the left and today's reel count in `overlay-text` headline weight on the right. Top-center, below the status bar. Inspired by live-activity pills (Swiggy, Waymo). Not touchable — touches pass through to Instagram.
- **Doom face icon:** Our own vector drawing (not Marvel artwork): steel mask (`doom-metal`, `doom-metal-shadow` for depth), dark eye slits and mouth grille (`doom-dark`), green hood (`doom-hood`). Doubles as the app launcher icon, on a `doom-dark` background. The `doom-*` colors are used only inside the icon.
- **Hero card:** Today's count on Home: `primary` background, `lg` radius, Doom face + `hero` number in `on-primary`. One per app.
- **History bars:** `primary` fill on a `border` track.
- **Empty states:** Short sentence + one action. No illustrations required.
- **Loading:** Skeletons for content, spinner only for short blocking actions.

## Do's and Don'ts

- Do use tokens from `src/theme` for every color, size, radius and space.
- Do test each screen in light mode, dark mode and the largest Dynamic Type size.
- Do keep touch targets at least 44×44pt.
- Don't introduce new colors or font sizes without adding them here first.
- Don't use the primary color for decoration or large background areas.
- Don't build custom versions of platform controls (switches, date pickers, sheets) when native ones exist.
