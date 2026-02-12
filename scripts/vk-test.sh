#!/bin/bash

# vibe-kanban worktree에서 Expo 앱을 빠르게 테스트하는 스크립트

set -e

# vibe-kanban worktree 목록에서 fiterior 관련 항목 찾기
worktrees=$(git worktree list --porcelain | grep -B2 "vibe-kanban" | grep "worktree " | sed 's/worktree //')

if [ -z "$worktrees" ]; then
  echo "❌ vibe-kanban worktree를 찾을 수 없습니다."
  exit 1
fi

# 여러 개면 선택, 하나면 바로 사용
count=$(echo "$worktrees" | wc -l | tr -d ' ')

if [ "$count" -eq 1 ]; then
  selected="$worktrees"
else
  echo "📂 vibe-kanban worktree 목록:"
  echo ""
  i=1
  while IFS= read -r wt; do
    branch=$(git -C "$wt" branch --show-current 2>/dev/null || echo "unknown")
    echo "  $i) $branch"
    echo "     $wt"
    i=$((i + 1))
  done <<< "$worktrees"
  echo ""
  read -p "번호 선택: " choice
  selected=$(echo "$worktrees" | sed -n "${choice}p")
fi

if [ -z "$selected" ] || [ ! -d "$selected" ]; then
  echo "❌ 잘못된 선택입니다."
  exit 1
fi

branch=$(git -C "$selected" branch --show-current 2>/dev/null || echo "unknown")
echo ""
echo "🚀 [$branch] worktree에서 실행합니다."
echo "   $selected"
echo ""

# node_modules 없으면 설치
if [ ! -d "$selected/node_modules" ]; then
  echo "📦 node_modules 설치 중..."
  (cd "$selected" && npm install)
  echo ""
fi

# 실행 모드 선택
echo "실행 모드:"
echo "  1) Expo 개발 서버 (기본)"
echo "  2) iOS 시뮬레이터"
echo "  3) Android 에뮬레이터"
echo ""
read -p "선택 [1]: " mode
mode=${mode:-1}

case $mode in
  1) cmd="npx expo start" ;;
  2) cmd="npx expo start --ios" ;;
  3) cmd="npx expo start --android" ;;
  *) cmd="npx expo start" ;;
esac

cd "$selected"
echo ""
echo "▶ $cmd"
echo ""
exec $cmd
