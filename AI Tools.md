# AI Tools

## ChatGPT


Ask ChatGPT to summarize.

```
Summarize the following content.  The word count should be approximately one-third of the content, and list one to three key points at the beginning. The content of the article is as follows:
```

### [为什么你应该开始用ChatGPT写日记|做笔记(Prompt和自动化)](youtube.com/watch?v=ZRv0Z-M7NqM)

用口說寫日記，自動整理及產生建議，也可以將整理得的事情快速新增至待辦事項。

1. 利用[捷徑](https://www.icloud.com/shortcuts/cf494229af644cbcafa849a32bcf689f)每天將以下 Prompt 餵給 ChatGPT：

```
Dear ChatGPT, 今天是目前的日期。我希望你能成為我的日記助手。我會在一天中寫下我隨機的想法和筆記。在一天結束時，我會請你用台灣常用的正體中文：
1. 收集我一天內的全部想法和筆記，根據這些內容寫一個完整版的日記。這個新版本要有更好的格式和邏輯結構，更好的寫作水平同時不改變我日記的原意。
2. 總結日記中的關鍵要點。
3. 根據日記，對我生活做出的重要洞察並像一位心理專家/人生導師一樣給出鼓勵/安慰/分析/建議...等。
4. 用一句話對今天日記下一個標題。
5. 用英文創意發想符合今天日記內容的 DALL·E prompt，圖片風格不要寫實或者像是拍照。
6. 分析我的日記內容，創建一個可行的待辦事項列表。請用第一人稱寫列表，並按照下面的JSON格式模板用中文創建列表：

{
"Task Name ": "Task Description",
}

Here is an example:
{
    "Develop AI Tutoring System": "I need to start developing my idea for a learning tutor system using ChatGPT.",
    "Invest in Tesla": "I need to review my investment plan for Tesla and decide whether to adjust it based on the recent market movement."
}

請注意: 在這一天裡，無論我輸入什麼內容，你都只需要回复: "####" . 只有當我輸入"結束日記"時，你才開始執行我規定的任務. 

非常感謝！
```
2. 拷貝回覆的 Json 後，利用[捷徑](https://www.icloud.com/shortcuts/39cedb44d34d4ba2b9f443165e0f13d0)將整理的 ToDo 轉成待辦事項。

3. 也可以利用這個[捷徑](https://www.icloud.com/shortcuts/8bea29c506a848eabd89080bcd0b78d2)整理某個主題片段的想法。Prompt: 

```
你好 ChatGPT! 今天是 日期. 在這個聊天裡, 我想讓你做我的 note_type 筆記助手. 你是一名筆記專家。在這一天裡，我會輸入我的一些隨機想法和筆記。在一天結束的時候我希望你幫我用台灣常用的正體中文做以下工作: 
1. 收集我輸入的全部想法和筆記，根據它們寫一份完整的筆記。這個新版本的筆記要有更合理的格式和邏輯結構，有更好的寫作風格但是不改變之前筆記和想法的原意。
2. 對筆記做一份詳細的摘要。

請注意: 在這一天裡，無論我輸入什麼內容，你都只需要回复: "####" . 只有當我輸入"Hi ChatGPT, 讓我們結束筆記"的時候，你才開始執行我規定的任務. 

謝謝你！
```

### [沒環境講英文？如何跟 ChatGPT 對話，快速加強口說](https://www.youtube.com/watch?v=UPh0iQbg4iU)

用 ChatGPT 搭配 [Chrome 插件(https://chrome.google.com/webstore/detail/voice-control-for-chatgpt/eollffkcakegifhacjnlnegohfdlidhn)]練習英文與聽力。對話完後，根據對話自動整理句子和單字。

Prompt:

```
Hey ChatGPT!
Let's have a conversation about [topic]. Make sure to limit responses under 50 words.
```

```
Please provide me with the following information based on our conversation:
1. Give me a collocation or phrase based on something you've said.
2. Give me a sentence pattern based. on something you've said.
3. Give me a better way to say the sentence based on what I've said.
```


## [Copilot](https://www.youtube.com/watch?v=Fi3AJZZregI)

with console

```
// Regex to phone number in (02) 1234-5678 format
const phoneRegex = /(\(?\d{2}\)?\s?\d{4}-\d{4})/g;
// Test phoneRegex with console.log
console.log(phoneRegex.test('(02) 1234-5678'));
```

Control + Enter 可以開啟更多解法的選擇

