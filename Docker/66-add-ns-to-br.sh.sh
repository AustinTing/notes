#!/bin/bash

# 指定要使用 bash 作為腳本的解釋器

# 從腳本的第一個參數（$1）中取得橋接介面的名稱。Ex: mydocker0
bridge=$1

# 從腳本的第二個參數（$2）中取得網絡命名空間的名稱。Ex: ns1
namespace=$2

# 從腳本的第三個參數（$3）中取得要分配給 vethB（容器端）的 IP 地址。Ex: 172.16.1.1/16
addr=$3

# 創建兩個名稱，vethA 和 vethB，這些名稱基於網絡命名空間名稱
vethA=veth-$namespace # vethA=veth-ns1
vethB=eth00-$namespace # vethB=eth00-ns1

# 使用 sudo 命令創建一個指定名稱的網絡命名空間
sudo ip netns add $namespace
# sudo ip netns add ns1

# 使用 sudo 命令創建一對虛擬網絡接口，其中 vethA 與 vethB 相互連接
sudo ip link add $vethA type veth peer name $vethB
# sudo ip link add veth-ns1 type veth peer name eth00-ns1
# - ip link add veth-ns1 type veth: 這部分命令創建一個虛擬網絡介面，名稱為 veth-ns1，類型為 veth。veth 代表虛擬以太網卡對。這個介面的一端將在當前命名空間中使用。
# - peer name eth00-ns1: 這部分命令同時創建了另一個虛擬網絡介面，名稱為 eth00-ns1，同時也是 veth 類型的。這個介面的一端將在同一對虛擬網絡介面中的另一個網絡命名空間中使用。

# 使用 sudo 命令將 vethB 接口移入指定的網絡命名空間
sudo ip link set $vethB netns $namespace
# sudo ip link set eth00-ns1 netns ns1

# 在指定的網絡命名空間中使用 sudo 命令為 vethB 接口分配指定的 IP 地址
sudo ip netns exec $namespace ip addr add $addr dev $vethB
# sudo ip netns exec ns1 ip addr add 172.16.1.1/16 dev eth00-ns1

# 在指定的網絡命名空間中使用 sudo 命令啟用 vethB 接口
sudo ip netns exec $namespace ip link set $vethB up
# sudo ip netns exec ns1 ip link set eth00-ns1 up

# 使用 sudo 命令啟用 vethA 接口
sudo ip link set $vethA up
# sudo ip link set veth-ns1 up

# 使用 sudo 命令將 vethA 接口添加到指定的橋接介面
sudo brctl addif $bridge $vethA
# sudo brctl addif mydocker0 veth-ns1
