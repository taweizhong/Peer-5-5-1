'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');

class MyWorkload extends WorkloadModuleBase {
    constructor() {
        super();
    }
    // 初始化工作负载模块
    // 实例化工作负载模块的 worker 从 0 开始的索引
    // 参与该回合的工人总数
    // 当前执行回合的从 0 开始的索引
    // 用户为基准配置文件中的回合提供的参数
    // 底层 SUT 的连接器
    // SUT 连接器提供的自定义上下文对象
    async initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext) {
        await super.initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext);

        for (let i=0; i<this.roundArguments.assets; i++) {
            const assetID = `${this.workerIndex}_${i}`;
            console.log(`Worker ${this.workerIndex}: Creating asset ${assetID}`);
            const request = {
                contractId: this.roundArguments.contractId,
                contractFunction: 'Create',
                invokerIdentity: 'User1',
                contractArguments: [assetID,"榆中肉牛养殖场", "甘肃省兰州市", "446523465768", "刘", "2022.2.1", "2022.10.23"],
                readOnly: false
            };

            await this.sutAdapter.sendRequests(request);
        }
    }

    async submitTransaction() {
        const randomId = Math.floor(Math.random()*this.roundArguments.assets);
        const myArgs = {
            contractId: this.roundArguments.contractId,
            contractFunction: 'Query',
            invokerIdentity: 'User1',
            contractArguments: [`${this.workerIndex}_${randomId}`],
            readOnly: true
        };

        await this.sutAdapter.sendRequests(myArgs);

        
    }

    async cleanupWorkloadModule() {
        for (let i=0; i<this.roundArguments.assets; i++) {
            const assetID = `${this.workerIndex}_${i}`;
            console.log(`Worker ${this.workerIndex}: Deleting asset ${assetID}`);
            const request = {
                contractId: this.roundArguments.contractId,
                contractFunction: 'Delete',
                invokerIdentity: 'User1',
                contractArguments: [assetID],
                readOnly: false
            };

            await this.sutAdapter.sendRequests(request);
        }
    }
}

function createWorkloadModule() {
    return new MyWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;