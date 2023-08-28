# Git

### 修正 commit

要修正作者時，先 rebase 到要修正的 commit 的前一個 commit 
```
git rebase -i <commit-hash>
```
- 這時會列出到目前所有的 commit ，選擇要修正edit
- 接著進入 rebase 流程，對現在修正的 commit 下
```
git commit --amend --author="austinting-company <austinting@company.com>"
```
- 修正完下
```
git rebase --continue
```

### 為特定專案設定不同作者

```
 git config --local user.name austin
 git config --local user.email austin@company.com
 ```
