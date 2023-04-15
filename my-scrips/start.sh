#!/bin/bash

export PATH=${PWD}/../bin:$PATH
export FABRIC_CFG_PATH=${PWD}/configtx
# 生成排序节点组织结构
cryptogen generate --config=./organizations/cryptogen/crypto-config-orderer.yaml --output="organizations"
# 生成其他的组结构
cryptogen generate --config=./organizations/cryptogen/crypto-config-org1.yaml --output="organizations"
cryptogen generate --config=./organizations/cryptogen/crypto-config-org2.yaml --output="organizations"
cryptogen generate --config=./organizations/cryptogen/crypto-config-org7.yaml --output="organizations"
# 生成系统通道的初始区块
configtxgen -profile TwoOrgsOrdererGenesis -channelID system-channel -outputBlock ./system-genesis-block/genesis.block
# 创建通道配置文件
configtxgen -profile TwoOrgsChannel1 -outputCreateChannelTx ./channel-artifacts/channel1.tx -channelID channel1

# 锚节点
configtxgen -profile TwoOrgsChannel1 -outputAnchorPeersUpdate ./channel-artifacts/Org1MSPanchors.tx -channelID channel1 -asOrg Org1MSP

# 启动网络
docker-compose -f ./docker/docker-compose-test-net.yaml up -d
. ./my-scrips/ccp.sh