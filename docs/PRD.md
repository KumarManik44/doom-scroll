# Doom Scroll — Product Brief

## One-liner

An Android app that counts how many Instagram Reels you scroll each day and shows the running count in a small Doctor Doom overlay on top of Instagram.

## Problem

Reels scrolling is invisible — you don't notice 200 reels going by. A live number in your face makes the habit visible.

## Target user

Me — one person, one Android phone, installed locally over USB.

## Platform decision

**Android only.** iOS does not allow any app to observe scrolling inside another app, so reel counting is impossible there. Android allows it via an Accessibility Service.

## Core features (v1)

1. **Reel counter** — an Accessibility Service watches Instagram; each swipe to a new reel on the Reels screen adds 1 to today's count. Counts reset at local midnight.
2. **Overlay** — a black pill with a Doctor Doom face icon and today's count, shown on top of Instagram only while Reels is open.
3. **App screen** — setup (enable the accessibility service), today's count, and the last 7 days.

## Out of scope for v1

- iOS
- YouTube Shorts / TikTok (possible later additions)
- Accounts, backend, network access — all data stays on the phone
- Deployment, Play Store, CI
- Limits, blocking, notifications

## Screens

| Screen | Purpose |
|---|---|
| Home | If the service is off: explain + button to open Accessibility settings. If on: today's count (big) + last 7 days list. |
| Overlay (native) | Doom face + count, over Instagram Reels |

## Success looks like

I scroll 20 reels and the overlay says 20. I use it daily for a week without it dying in the background.

## Open questions

- How reliably does Instagram emit scroll events on the Reels screen? (Validated first, in build step 3.)
