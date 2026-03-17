#!/bin/bash

# 讀取來自 stdin 的輸入
input=$(cat)

# 解析指令
command=$(echo "$input" | jq -r ".tool_input.command // empty")

# 警告級別指令（需要確認但風險較低）
warning_patterns="^mkdir |^mkdir$|^touch |^touch$|^cp |git push"

# 危險指令（高風險操作）
danger_patterns="rm |rm$|rmdir|mv |chmod|chown|sudo|npm install|npm uninstall|yarn add|yarn remove|kill |pkill|killall|reboot|shutdown|format|mkfs|dd if=|>|curl.*\||wget.*\|"

# 準備顯示用的命令（取前 200 字元，替換換行符為空格）
display_command=$(echo "$command" | head -c 200 | tr '\n' ' ')

# 檢查警告級別指令
if echo "$command" | grep -qE "$warning_patterns"; then
    # 將命令寫入臨時檔案以避免 AppleScript 語法問題
    temp_file=$(mktemp)
    echo "$display_command" > "$temp_file"

    # 過濾掉 macOS 的 mach port 錯誤訊息，但保留其他錯誤
    osascript <<EOF 2> >(grep -v "error messaging the mach port" >&2)
set cmdText to (do shell script "cat " & quoted form of "$temp_file")
display dialog "操作確認

即將執行：
" & cmdText & "

此操作將創建或修改檔案/資料夾。

是否繼續？" buttons {"取消", "繼續"} default button "繼續" with icon caution with title "Claude Code 確認"
EOF
    result=$?
    rm -f "$temp_file"
    if [ $result -ne 0 ]; then
        echo "使用者取消操作" >&2
        exit 2
    fi

# 檢查危險指令
elif echo "$command" | grep -qE "$danger_patterns"; then
    # 將命令寫入臨時檔案以避免 AppleScript 語法問題
    temp_file=$(mktemp)
    echo "$display_command" > "$temp_file"

    # 過濾掉 macOS 的 mach port 錯誤訊息，但保留其他錯誤
    osascript <<EOF 2> >(grep -v "error messaging the mach port" >&2)
set cmdText to (do shell script "cat " & quoted form of "$temp_file")
display dialog "⚠️ 危險指令警告 ⚠️

即將執行：
" & cmdText & "

此指令可能會刪除檔案、修改權限或終止程序。

是否允許執行？" buttons {"拒絕", "允許"} default button "拒絕" cancel button "拒絕" with icon stop with title "Claude Code 安全確認"
EOF
    result=$?
    rm -f "$temp_file"
    if [ $result -ne 0 ]; then
        echo "使用者拒絕執行危險指令" >&2
        exit 2
    fi
fi

exit 0