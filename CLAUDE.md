@AGENTS.md

# Claude Code specifics

## Read before working

- `AGENTS.md` (imported above) — commands and rules
- `DESIGN.md` — design tokens and visual rules; read before any UI work
- `docs/PRD.md` — what we're building and what's out of scope

## Skills and tools

Use these instead of guessing APIs from memory (installed in `.claude/skills/`):

| Need | Skill / tool |
|---|---|
| Navigation: stacks, tabs, headers, modals, typed routes | `react-navigation` (Callstack) |
| RN conventions: lists, layout, animation, state | `vercel-react-native-skills` (Vercel) — ignore its Expo-specific advice; we don't use Expo |
| Performance: FPS, re-renders, startup, memory | `react-native-best-practices` (Callstack) |
| Component API design | `vercel-composition-patterns` (Vercel) |
| Writing tests | `react-native-testing` (Callstack RNTL) |
| UI inspiration / reference screens | Mobbin MCP (`search_screens`, `search_flows`) |

If a skill above is missing, run `scripts/install-skills.sh`.

## Working style

- Small test app, small steps: one feature per change, verify, then move on.
- For anything touching more than ~3 files, write a short plan first.
- When the design is unclear, check `DESIGN.md`, then ask — don't invent new colors or components.
