# [aws-iot-device-client](https://github.com/awslabs/aws-iot-device-client)

運行在 Raspberry Pi 上時，如果出現 `Segmentation fault`，可以[參考這篇](https://www.repost.aws/questions/QUooHqZtISSGWJYLsDr1U-NQ/questions/QUooHqZtISSGWJYLsDr1U-NQ/error-while-running-the-iot-demo-tutorial-on-raspberry-pi4?)將 log 先創好並將所有權轉移給 `pi`:

```
sudo mkdir /var/log/aws-iot-device-client
sudo chmod 745 /var/log/aws-iot-device-client
sudo chown pi:pi /var/log/aws-iot-device-client
```

# [Fundamentals of networking in AWS](https://medium.com/codenation-engineering/fundamentals-of-networking-in-aws-3ad3d0dc01dd)



# Others
Lambda
- stack name 是資源的集合，要特別注意名稱不要重複。特別是開專案的時候

[用 `iostat` 檢查設備狀況](https://github.com/penglongli/blog/issues/74)
- 如果是部屬在他人的 server 上，可以查看 `%steal`。如果 `%steal` 高，代表 CPU 被其他人的 VM 佔用了。

常見架構的Data Transfer 的成本：[Overview of Data Transfer Costs for Common Architectures](https://aws.amazon.com/cn/blogs/architecture/overview-of-data-transfer-costs-for-common-architectures/)

