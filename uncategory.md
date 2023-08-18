# Uncategory


## Linux  

- `cat /proc/cpuinfo`: 列出硬體基本資訊  
- `df -h`: 看空間大小  
- `lsb_release -a` or `/etc/os-release` or `Raspbian GNU/Linux 10 `: 查看 OS 發佈版。  
- 套件管理  
  - APT（Advanced Packaging Tool）： Debian 和 Ubuntu。  
  - Yum（Yellowdog Updater, Modified）： Red Hat、CentOS 和 Fedora Linux 分。  
  - DNF（Dandified Yum）：Yum 的替代品，Red Hat、CentOS 和 Fedora Linux 。  
  - Zypper： openSUSE 和 SUSE Linux Enterprise Server 。  
  - Pacman：Arch Linux 。  
- `apt list | grep vim`: 查看是否已安裝過某個軟體。  
- `sudo apt purge nodejs npm`: 移除套件，`purge` 會連帶移除相依的套件。  
- `man`  
  - `b/空白`：上/下一頁  
  - `/目標`：搜尋。用 `N/n` 來跳 上/下 一個目標。  
  - `?目標`：向上搜尋。
- `ssh -vvv user@host`: 查看 ssh 連線過程。
  - `-vvv`：最詳細的 log。

## Issues

** ssh: Could not resolve hostname [Host]: nodename nor servname provided, or not known **

- 如果直接 ping HostName 有通，檢查 .ssh/config 是否有設定是否正確，是否有 typo。
- `ssh -vvv [HostName]`: 查看 ssh 連線過程。如果有出現 `debug1: Connecting [Host] to host port 22.` 表示 ssh 設定檔可能有問題，備份 `.ssh/know_hosts` 後，刪除 `.ssh/know_hosts` 後再試試看。

## Web

網頁切換頁面時，開啟 preserve log 可以儲存 request 紀錄。
![](assets/web-chrome-preserve-log.png)

## Drawio

匯出時選 PNG ，選擇`包含我的圖表的副本`後，此 PNG 可以再度用 drawio 編輯。

匯出固定選`300%`，寬度選`15`。　

## Resources
- [100 Bytes of CSS to look great everywhere](https://www.swyx.io/css-100-bytes)
  - 用簡單的 CSS 設定讓網站看起來還不錯。
- [Effective Shell](https://effective-shell.com/)
  - Shell 的教學。
- [Watching You](https://github.com/jj811208/watching-you)
  - 可以做出像小狐狸錢包那樣的注視效果

- [SadServers](https://sadservers.com/scenarios)
   - 練習 LINUX 情境處理。

- [regex101]
    - 可以學習和理解正則表達式的網站。

# Github Issue Markdown

讓圖片可以並排顯示：

```md
<img width="389" alt="image" src="name.png"><img width="389" alt="image" src="name2.jpg">

or
// 50 有時還是會換行
<div style="display: flex;">
    <img src="" width="49%" />
    <img src="https://github.com/CalyxInc/software-team/assets/84309449/fc4483da-de42-427f-a2f1-e087d6b75fc8" width="49%" />
</div>
```
