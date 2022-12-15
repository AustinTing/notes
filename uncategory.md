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
## Web

網頁切換頁面時，開啟 preserve log 可以儲存 request 紀錄。
![](assets/web-chrome-preserve-log.png)

## Resources
- [100 Bytes of CSS to look great everywhere](https://www.swyx.io/css-100-bytes)
  - 用簡單的 CSS 設定讓網站看起來還不錯。
- [Effective Shell](https://effective-shell.com/)
  - Shell 的教學。
- [Watching You](https://github.com/jj811208/watching-you)
  - 可以做出像小狐狸錢包那樣的注視效果

- [SadServers](https://sadservers.com/scenarios)
   - 練習 LINUX 情境處理