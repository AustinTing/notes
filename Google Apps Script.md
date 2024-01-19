# Google Apps Script

Google Apps Script 是一種雲端腳本語言，允許你對 Google Workspace 的服務（如 Gmail、日曆、文檔、表格等）進行自動化和擴展功能。


## CLASP

CLASP 可以讓開發者同步本機程式碼至 Google Apps Script，類似 Git 的功能。

### 使用方式

本機安裝設定 CLASP 後，在 App Script 頁面的設定中找到 App Id，將 id 更新到 `.clasprc.json` 中。之後就可以用 CLASP 來同步程式碼。

CLASP 的操作跟 git 類似。

檢查目前程式碼更動：

```bash
clasp status
```

上傳程式碼：

```bash
clasp push
```

`.claspignore` 可以設定不要同步的檔案。如果只需要同步 `Code.js` 和 `appsscript.json` 這兩份檔案，可以這樣設定：

```
**/**
!Code.js
!appsscript.json
```

## 在 Google Apps Script 使用 Moment.js

Moment.js 是一個 JavaScript 時間處理的函式庫，處理時間格式、時間計算時非常方便。

因為 App Script 沒有 `import` 或是 `require` 的功能，要手動上傳函式庫。

先去 [Moment.js 官網](https://momentjs.com/) 下載函式庫，然後將 `moment.js` 複製到 App Script 專案中。

如果要使用 moment-timezone，也要將 `moment-timezone.js` 複製到 App Script 專案中。

因為 `moment-timezone.js` 依賴 `moment.js`，所以檔名可以改成 `01-moment.js` 和 `02-moment-timezone.js`，確保 `moment.js` 先載入。

上傳後，就可以在 App Script 中使用 Moment.js 了。

```
Logger.log(moment.tz('America/New_York').format('YYYY-MM-DD HH:mm:ss Z'))
```
