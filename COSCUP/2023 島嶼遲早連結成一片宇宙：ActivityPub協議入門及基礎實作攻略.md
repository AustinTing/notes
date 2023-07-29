# COSCUP 2023

## 島嶼遲早連結成一片宇宙：ActivityPub協議入門及基礎實作攻略

### ActivityPub 協議簡介

ActivityPub 是一個用於分散式社交網路的協議，它的目標是讓不同的社交網路之間可以互相連結，讓使用者可以在不同的社交網路之間互相追蹤、互相分享資訊。

相比於 Twitter ，Mastodon 有更好的控制資料、制定規則、自定義的權力以及自己的社區文化。

### 如何加入 ActivityPub 網路

1. 註冊已別人的 ActivityPub 服務。
2. 自己架設別人的 ActivityPub 服務。
3. 自己按照 ActivityPub 協議實作一個 ActivityPub 服務。

### ActivityPub 協議的核心概念

[JSON for Linking Data](https://json-ld.org/)

#### Actor

Actor 是 ActivityPub 協議中的核心概念，它代表了一個實體，可以是一個人、一個社群、一個機器人、一個應用程式等等。

#### Object

Object 是 Actor 的一種，它代表了一個實體，可以是一個貼文、一個回覆、一個影片、一個圖片等等。

#### Activity

Activity 是 Actor 的一種，它代表了一個實體，可以是一個追蹤、一個回覆、一個喜歡、一個分享等等。

### 實作 ActivityPub 服務準備工作

1. 在網路宣告自己的存在。

在服務 `https://example.com` 的根目錄下，放置一個 `/.well-known/host-meta` 檔案。

2. 建立 Actor

Actor 是一個 JSON 檔案

3. WebFinger

WebFinger 是一個用於查詢 Actor 的協議，它的目的是讓使用者可以透過電子郵件地址或是 URL 查詢 Actor。

4. 實作 Follow... 等功能

採取按需溝通，用 JSON 發送資料到 followers 的 server。在由 followers 的 server 發送資料到 followers 的 client。


### REF

https://activitypub.academy/

https://github.com/tsileo/microblog.pub





