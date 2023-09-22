# Peer 5-5-1

## 简介

该项目使用Hyperledger Fabric构建，主要包括：Fabric基础项目组成、caliper基准测试工具、explorer区块链浏览器、monitor容器监测。

使用组织1、组织2和组织7构建网络，组织1使用5个节点、10个用户，组织2使用5个节点、10个用户，组织7使用一个节点和一个用户。

## Fabric基础项目组成

1. organizations
   - cryptogen 组织结构配置文件
   - fabric-ca ca配置文件
   - ccp-template.yaml ccp连接配置文件模版
2. packageID 用于记录通道ID
3. docker docker-compose 文件
4. chaincode 链码文件
5. scripts 官方脚本文件
6. my-scripts 自用脚本文件
   - start.sh (生成排序节点组织结构、生成系统通道的初始区块、创建通道配置文件、锚节点、启动网络)
   - add_peer.sh(组织节点加入通道)
   - Anchorpeer.sh（设置锚节点）
   - deployCC.sh（安装链码）
7. network.sh 官方网络启动文件
8. run.sh 自用启动文件

```bash
./run.sh # 启动区块链网络
./network.sh down # 关闭区块链网络 
```



## caliper基准测试工具组成

1. benchmarks 测试基准配置文件
2. networks 网络连接配置文件
3. workload 测试函数文件配置

```bash
./run.sh # 启动测试工具
```

## explorer区块链浏览器

主要配置文件：connection-profile 连接节点

```bash
./start.sh # 启动浏览器
./stop.sh # 关闭浏览器
```

地址端口：8181

## monitor容器监测

使用prometheus和grafana监控容器资源变化。

```bash
./start.sh # 启动浏览器
./stop.sh # 关闭浏览器
```

地址端口：9090

地址端口：3000

