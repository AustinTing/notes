# [aws-iot-device-client](https://github.com/awslabs/aws-iot-device-client)

運行在 Raspberry Pi 上時，如果出現 `Segmentation fault`，可以[參考這篇](https://www.repost.aws/questions/QUooHqZtISSGWJYLsDr1U-NQ/questions/QUooHqZtISSGWJYLsDr1U-NQ/error-while-running-the-iot-demo-tutorial-on-raspberry-pi4?)將 log 先創好並將所有權轉移給 `pi`:

```
sudo mkdir /var/log/aws-iot-device-client
sudo chmod 745 /var/log/aws-iot-device-client
sudo chown pi:pi /var/log/aws-iot-device-client
```

# [Fundamentals of networking in AWS](https://medium.com/codenation-engineering/fundamentals-of-networking-in-aws-3ad3d0dc01dd)