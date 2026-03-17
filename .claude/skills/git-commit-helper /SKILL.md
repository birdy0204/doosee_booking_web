---
name: git-commit-helper
description: 協助撰寫 Git commit 提交訊息和分析變更。當使用者要提交變更、commit、撰寫 commit message、查看 git diff 或暫存變更時使用。
---

【Git Commit 訊息助手】

   【快速開始】

   -- 分析暫存變更並生成提交訊息：
      ```bash
      # 查看暫存的變更
      git diff --staged

      # 根據變更生成提交訊息
      # (Claude 會分析差異並建議訊息)
      ```

   【選擇性暫存檔案】

   -- **提交前必須先選擇要提交的檔案**
   -- Claude 在執行提交前，應該先詢問使用者要提交哪些檔案
   -- 使用者可以選擇以下方式暫存檔案：

      【暫存方式一：指定特定檔案】

      -- 只暫存你想提交的檔案：
         ```bash
         # 先查看所有變更
         git status

         # 只暫存特定檔案（可以指定多個）
         git add src/Components/Map/Map.tsx
         git add app/map.tsx
         git add assets/map.png

         # 確認暫存區內容
         git diff --staged --stat
         ```

      【暫存方式二：使用萬用字元】

      -- 暫存特定目錄或檔案類型：
         ```bash
         # 暫存整個目錄
         git add .claude/agents/

         # 暫存特定類型檔案
         git add *.md

         # 暫存特定目錄下的特定類型
         git add src/Components/**/*.tsx
         ```

      【暫存方式三：互動式選擇（檔案層級）】

      -- 使用互動式暫存逐一選擇檔案：
         ```bash
         # 互動式新增檔案
         git add -i

         # 然後選擇：
         # 2: update (選擇要暫存的檔案)
         # 輸入檔案編號，用空格分隔
         # 按 Enter 確認
         ```

      【暫存方式四：互動式選擇（程式碼區塊層級）】

      -- 進階：選擇檔案內的特定變更區塊：
         ```bash
         # 互動式暫存變更區塊
         git add -p src/Components/Map/Map.tsx

         # 對每個變更區塊選擇：
         # y - 暫存此區塊
         # n - 不暫存此區塊
         # s - 分割成更小的區塊
         # q - 退出
         ```

      【移除暫存（如果加錯了）】

      -- 將檔案從暫存區移除（保留變更）：
         ```bash
         # 移除特定檔案
         git restore --staged src/Components/Map/Map.tsx

         # 移除所有暫存的檔案
         git restore --staged .

         # 或使用舊語法
         git reset HEAD src/Components/Map/Map.tsx
         ```

   【Claude 執行提交的標準流程】

   1. **查看所有變更**：執行 `git status`
   2. **詢問使用者**：「您想要提交哪些檔案？」
      -- 提供變更檔案清單
      -- 讓使用者選擇要提交的範圍
   3. **暫存選定的檔案**：使用 `git add <檔案>` 或其他方式
   4. **確認暫存內容**：執行 `git diff --staged --stat`
   5. **分析變更並生成提交訊息**：
      -- 檢視暫存的程式碼變更
      -- 根據變更內容生成符合規範的提交訊息
      -- **重要：先輸出提交訊息給使用者查看**
   6. **等待使用者確認**：
      -- 顯示完整的提交訊息（包含標題和正文）
      -- 詢問：「這個提交訊息是否正確？是否要執行提交？」
      -- 如果使用者要求修改，調整訊息後再次確認
   7. **執行提交**：確認後才執行 `git commit -m "..."`
   8. **詢問是否推送**：「是否要推送到遠端？」

   【實際範例】

   -- 情境：使用者有 20 個變更檔案，但只想提交地圖功能相關的檔案

      ```bash
      # 1. 查看所有變更
      git status
      ```

      Claude：「我看到您有 20 個變更檔案，請問您想要提交哪些？」
      使用者：「只提交地圖功能相關的」

      ```bash
      # 3. 只暫存地圖相關檔案
      git add app/map.tsx
      git add assets/map.png
      git add src/Components/Map/

      # 4. 確認暫存內容
      git diff --staged --stat
      ```

      Claude 分析變更後：「我已經分析了暫存的變更，建議的提交訊息如下：

      ```
      feat(map): 新增地圖功能頁面

      - 新增獨立的地圖路由頁面 (app/map.tsx)
      - 新增 Map 元件實作
      - 新增地圖圖示資源
      ```

      這個提交訊息是否正確？是否要執行提交？」

      使用者：「可以，請提交」

      ```bash
      # 7. 執行提交
      git commit -m "feat(map): 新增地圖功能頁面

      - 新增獨立的地圖路由頁面 (app/map.tsx)
      - 新增 Map 元件實作
      - 新增地圖圖示資源"
      ```

      Claude：「提交成功！是否要推送到遠端？」

   【提交訊息格式】

   -- 遵循 Conventional Commits 格式：
      ```
      <類型>(<範圍>): <描述>

      [可選的正文]

      [可選的頁腳]
      ```

   【提交類型】

   -- **feat**: 新功能
   -- **fix**: 錯誤修復
   -- **docs**: 文件變更
   -- **style**: 程式碼樣式變更（格式化、缺少分號等）
   -- **refactor**: 程式碼重構
   -- **test**: 新增或更新測試
   -- **chore**: 維護任務

   【範例】

   -- 功能提交：
      ```
      feat(booking): 新增預約時間選擇功能

      實作預約時間選擇器，包含：
      - 日期選擇元件
      - 可用時段顯示
      - 時段衝突檢查
      ```

   -- 錯誤修復：
      ```
      fix(sidebar): 修正側邊欄選單顯示問題

      修正側邊欄在 iOS 上顯示不正確的問題。
      調整 SafeAreaView 的邊界設定。
      ```

   -- 重構：
      ```
      refactor(navigation): 重構底部導航結構

      將地圖功能從底部導航移至側邊欄。
      為第二階段電商功能預留導航位置。
      ```

   【分析變更】

   -- 檢視即將提交的內容：
      ```bash
      # 顯示變更的檔案
      git status

      # 顯示詳細變更
      git diff --staged

      # 顯示統計資訊
      git diff --staged --stat

      # 顯示特定檔案的變更
      git diff --staged path/to/file
      ```

   【提交訊息指南】

   -- 應該：
      -- 使用祈使語氣（「add feature」而非「added feature」）
      -- 第一行保持在 50 字元以內
      -- 應使用繁體中文為最優先若是字母則大寫
      -- 摘要結尾不加句號
      -- 在正文中說明為什麼（WHY）而非只說明做了什麼（WHAT）

   -- 不應該：
      -- 使用模糊的訊息，如「update」或「fix stuff」
      -- 在摘要中包含技術實作細節
      -- 在摘要行寫段落
      -- 使用過去式

   【專案常用範圍】

   -- React Native 專案常用的範圍（scope）：

   -- **UI 相關**：
      -- `ui` 或 `UI` - 一般 UI 元件變更
      -- `component` - 新增或修改元件
      -- `style` - 樣式調整

   -- **功能模組**：
      -- `booking` - 預約功能
      -- `auth` - 認證功能
      -- `chat` - 聊天功能
      -- `explore` - 探索頁面
      -- `map` - 地圖功能
      -- `account` - 帳戶管理
      -- `home` - 首頁功能

   -- **導航與布局**：
      -- `navigation` 或 `nav` - 導航相關
      -- `sidebar` - 側邊欄
      -- `layout` - 布局結構

   -- **配置與工具**：
      -- `claude` - Claude 配置（hooks、skills、agents）
      -- `deps` - 依賴套件
      -- `config` - 專案配置

   【範圍使用範例】

   -- UI 與元件：
      -- `feat(ui): 新增設計師個人頁面`
      -- `fix(component): 修正 Button.Symbol 點擊效果`
      -- `style(explore): 調整探索頁面卡片樣式`

   -- 功能開發：
      -- `feat(booking): 實作預約流程重構`
      -- `fix(chat): 修正訊息發送時間顯示`
      -- `feat(map): 新增附近店家篩選功能`

   -- 導航與結構：
      -- `refactor(navigation): 重構底部導航結構`
      -- `fix(sidebar): 修正側邊欄選單項目順序`
      -- `feat(layout): 新增響應式布局支援`

   -- 配置與維護：
      -- `chore(deps): 更新 Expo 至 54.0.0`
      -- `feat(claude): 新增 mobile-developer agent`
      -- `docs(readme): 更新安裝說明`

   【多檔案提交】

   -- 當提交多個相關變更時：
      ```
      refactor(auth): 重構認證模組

      - 將認證邏輯從頁面元件移至 hooks
      - 新增 useAuth 自訂 hook
      - 更新登入/註冊頁面使用新 hook
      - 新增認證狀態持久化

      Breaking change: 認證 API 介面變更
      ```

   【破壞性變更】

   -- 清楚標示破壞性變更：
      ```
      feat(navigation)!: 重構路由結構

      BREAKING CHANGE: 底部導航路由配置已變更

      先前：
      - (tabs)/map.tsx

      現在：
      - (sidebar)/map.tsx（移至側邊欄）
      - (tabs)/shop.tsx（新增商品頁）

      遷移指南：更新深層連結配置以反映新路由結構
      ```

   【工作流程範本】

   1. **檢視變更**：`git status` 查看所有變更
   2. **選擇檔案**：使用 `git add` 暫存要提交的檔案（參考【選擇性暫存檔案】）
   3. **確認暫存**：`git diff --staged --stat` 檢查暫存內容
   4. **識別類型**：是 feat、fix、refactor 等？
   5. **確定範圍**：程式碼庫的哪個部分？（參考【專案常用範圍】）
   6. **撰寫摘要**：簡短的祈使語氣描述
   7. **新增正文**：說明原因和影響
   8. **註記破壞性變更**：如果適用

   【修改提交】

   -- 修正上一次的提交訊息：
      ```bash
      # 僅修改提交訊息
      git commit --amend

      # 修改並新增更多變更
      git add forgotten-file.js
      git commit --amend --no-edit
      ```

   【最佳實踐】

   1. **原子性提交** - 每次提交一個邏輯變更
   2. **提交前測試** - 確保程式碼正常運作
   3. **引用問題** - 如適用，包含問題編號
   4. **保持專注** - 不要混合不相關的變更
   5. **為人類撰寫** - 未來的你會讀到這些訊息

   【提交訊息檢查清單】

   -- [ ] 類型恰當（feat/fix/docs 等）
   -- [ ] 範圍具體且清晰（參考【專案常用範圍】）
   -- [ ] 摘要少於 50 字元
   -- [ ] 摘要使用祈使語氣
   -- [ ] 正文說明為什麼（WHY）而非只說明做了什麼（WHAT）
   -- [ ] 破壞性變更有清楚標記
   -- [ ] 包含相關的問題編號
