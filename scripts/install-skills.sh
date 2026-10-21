#!/usr/bin/env bash
# Installs the project's agent skills into .claude/skills (project scope).
# Sources: Vercel agent-skills, Callstack agent-skills, Callstack RNTL.
set -euo pipefail
cd "$(dirname "$0")/.."

# React Native conventions + component API patterns (Vercel)
npx -y skills@latest add vercel-labs/agent-skills \
  --skill vercel-react-native-skills --skill vercel-composition-patterns \
  -a claude-code -y --copy

# Performance + React Navigation (Callstack)
npx -y skills@latest add callstackincubator/agent-skills \
  --skill react-native-best-practices --skill react-navigation \
  -a claude-code -y --copy

# Testing with React Native Testing Library (Callstack)
npx -y skills@latest add callstack/react-native-testing-library \
  --skill react-native-testing -a claude-code -y --copy

echo "Done. Restart Claude Code to load the skills."
