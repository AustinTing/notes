# Git

刪掉最近的一次 commit

```
git reset --hard HEAD^
```

### 修正 commit

要修正作者時，先 rebase 到要修正的 commit 的前一個 commit：

```
git rebase -i <commit-hash>
```

這時會列出到目前所有的 commit ，選擇要修正 edit。接著進入 rebase 流程，對現在修正的 commit 下：

```
git commit --amend --author="austinting-company <austinting@company.com>"
```

沒問題後，繼續 rebase：

```
git rebase --continue
```

### 為特定專案設定不同作者

```
 git config --local user.name austin
 git config --local user.email austin@company.com
 ```

## 自動針對不同資料夾使用不同的 git config

針對不同的專案來源，比如 work, client, personal，創建不同的 git config，比如 `.gitconfig-work`, `.gitconfig-client`, `.gitconfig-personal`。然後在 `~/.gitconfig` 中加入：

```
[user]
    name = originalname
    email = originalemail

[includeIf "gitdir:~/work/"]
    path = ~/.gitconfig-work

[includeIf "gitdir:~/client/"]
    path = ~/.gitconfig-client

[includeIf "gitdir:~/personal/"]
    path = ~/.gitconfig-personal
```  

這樣當進入到不同的資料夾時，就會自動套用不同的 git config。

另外可以在各個 .gitconfig 中加入：

```
[core]
    sshCommand = "ssh -i ~/.ssh/<project_key> -o IdentitiesOnly=yes"
```

當用 git 對遠端操作時，就會自動使用指定的 ssh key。


參考：[Organizing multiple Git identities](https://garrit.xyz/posts/2023-10-13-organizing-multiple-git-identities)

