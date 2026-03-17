#!/bin/bash

# macOS 通知與音效
if command -v osascript >/dev/null 2>&1; then
    osascript -e 'display notification "Claude Code 需要授權！" with title "Claude Code" sound name "Glass"'
    afplay /System/Library/Sounds/Hero.aiff
fi

exit 0