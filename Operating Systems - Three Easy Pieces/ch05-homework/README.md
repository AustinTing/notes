# Ch05 Homework

**1. Main process 中如果有變數，fork 後 parent 和 child 去改變他會有什麼情況？**

fork 後，無論 parent 或 child 誰 wait 誰，誰去改那個變數都不會影響到對方。

**2. 打開文件後再 fork 會對 parent 和 child 有什麼影響？**

Parent 和 child 都可以訪問文件，也都可以寫入。

**3. 承上題，如果想要 child 印 hello，parent 印 goodbye ，有辦法不靠 wait 做到這點嗎？**

沒有想法。

**4. exec() 系列函數的意義？**

有用到再看好🤪。
- [Linux 系統編程之進程（五）：exec系列函數（execl,execlp,execle,execv,execvp)使用](https://jasonblog.github.io/note/linux_system/linuxxi_tong_bian_cheng_zhi_jin_cheng_ff08_wu_ff09.html)
- [execlp、execvp用法與範例])(https://burweisnote.blogspot.com/2017/08/execlpexecvp.html)

**5. fork() 後，wait() 會返回什麼？如果 child 用的話會怎樣？**

在 parent 用 wait() 會得到 child 的 process id；在 child 用 wait 會得到 -1。；兩個同時用 child 的 wait 會得到 -1，而 parent 會得到 child 的 process id。

**6. waitpid()**

 waitpid() 需要給定 pid 及回傳狀態，讓 parent 知道要等到什麼時候。
 - [wait vs. waitpid](https://wirelessr.gitbooks.io/working-life/content/wait_vs_waitpid.html)
 - [linux中waitpid及wait的用法](https://www.twblogs.net/a/5b83317c2b717766a1eb53be)