# Internet

# NAT

Network Address Translation

IP + port = socket = endpoint

常見 NAT 流程：

1. 本機 Client 發送 Packets （資料及收件人的 socket）給 Router。
2. Router 將寄件人的 socket 換成一個自己未使用的 socket 後，再發送出去。
3. 收到回覆後，Router 將 Packets 轉給 Client 並將收件人的 socket 換成原本 Client 的 socket。

本機生成並打算發送的封包會首先經過 OUTPUT 規則鏈，然後再到 POSTROUTING 規則鏈，而不是像外部封包那樣先經過 PREROUTING。

### 改變封包的來源 IP

**Packets 送出時更改寄件者**

可以用 `SNAT` 或 `MASQUERADE`。

SNAT 會靜態地將封包的來源 IP 改成指定（固定）的 IP。適合用在有固定 IP 的情況。

MASQUERADE 會動態地將封包的來源 IP 改成 Router 的外部 IP。適合在 IP 是動態取得的情況。

上面這兩者都是在 POSTROUTING 規則鏈中使用。

**收到回覆 Packets 時更改收件者**

可以用 `DNAT`。

- DNAT 會將封包的收件者（Router）IP 改成指定的 IP。適合運行在防火牆後面的 Servers。
- 適合在 PREROUTING 和 OUTPUT 規則鏈中使用。

DNAT 有一種特殊的情況就是 `REDIRECT`，Packets 會被送到 Router 的某個 port。
