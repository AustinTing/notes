# zsh

從 bash 跳到 zsh 的紀錄。

## 設定預設 shell

確認目前有裝的 shell: `cat /etc/shells`

設定預設 shell: `chsh -s /bin/zsh`

## [Oh My Zsh](https://github.com/ohmyzsh/ohmyzsh)

管理 zsh 設定檔的套件，會想用主要是想要快速拿個 theme 來改成自己習慣的。

安裝 Oh My Zsh: 
```sh
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

## Theme

直接改 gozilla.zsh-theme，在 `~/.oh-my-zsh/themes/` 裡。

```sh
PROMPT='%{$fg_bold[green]%}%c %{$fg_bold[cyan]%}$(git_prompt_info)%{$fg_bold[green]%} % %{$reset_color%}'

ZSH_THEME_GIT_PROMPT_PREFIX="("
ZSH_THEME_GIT_PROMPT_SUFFIX=")"
ZSH_THEME_GIT_PROMPT_DIRTY=""
ZSH_THEME_GIT_PROMPT_CLEAN=""

RPROMPT='$(git_prompt_status)%{$reset_color%}'

ZSH_THEME_GIT_PROMPT_ADDED="%{$fg[cyan]%} ✈"
ZSH_THEME_GIT_PROMPT_MODIFIED="%{$fg[yellow]%} ✭"
ZSH_THEME_GIT_PROMPT_DELETED="%{$fg[red]%} ✗"
ZSH_THEME_GIT_PROMPT_RENAMED="%{$fg[blue]%} ➦"
ZSH_THEME_GIT_PROMPT_UNMERGED="%{$fg[magenta]%} ✂"
ZSH_THEME_GIT_PROMPT_UNTRACKED="%{$fg[grey]%} ✱"
```

