# Doom Scroll

Counts the Instagram Reels you scroll each day and shows the count in a Doctor Doom overlay on top of Instagram. Android only, runs locally. React Native (Community CLI) + TypeScript + a small Kotlin accessibility service.

## Files

| File | Purpose |
|---|---|
| `AGENTS.md` | Instructions for any coding agent: stack, commands, rules |
| `CLAUDE.md` | Claude Code entry point (imports AGENTS.md) + which skills to use |
| `DESIGN.md` | Design system in Google's DESIGN.md format (tokens + rules) |
| `docs/PRD.md` | Product brief |
| `.claude/skills/` | Agent skills (React Native, navigation, performance, testing) |
| `scripts/install-skills.sh` | Reinstalls the agent skills |

## Getting started

1. Plug in an Android phone with USB debugging on.
2. `npm install`, then `npm start` and `npm run android` in another terminal.
3. On the phone: Settings → Accessibility → Installed apps → **Doom Scroll reel counter** → On.

Requires the Android SDK + JDK 17+.
