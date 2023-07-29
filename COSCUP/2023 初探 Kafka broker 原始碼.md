# 初探 Kafka broker 原始碼

Speaker: Howard Chen

## Log System

1. Abstract Index
2. mmap
3. Relative offset
4. append
5. search algorithm
6. Unified Log

## Server

會額外起一個 worker 去監聽 config 的變化，如果有變化就會重新載入。
