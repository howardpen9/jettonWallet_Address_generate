import { toNano, beginCell, Address, Cell } from "ton";
import {
    Blockchain,
    SandboxContract,
    TreasuryContract,
    printTransactionFees,
    prettyLogTransactions,
} from "@ton-community/sandbox";
import "@ton-community/test-utils";

import { AA } from "./output/sample_AA";
import { NftItem } from "./output/sample_NftItem";

let JettonMinterAddress = Address.parse("EQAiQ2XK7BXePLwemeo-u4wNyjg-wxGeySmaFGEP7R2MhUWs");

// Jetton Master, get Jetton Wallet Address:
// https://testnet.ton.cx/address/kQAiQ2XK7BXePLwemeo-u4wNyjg-wxGeySmaFGEP7R2Mhf4m

// const dataCell = Cell.fromBase64("te6cckEBAQEAIwBAQgJQQJUQZQAYuEnu4sHWweyGQ0OM6hxbG3vdtQwe2G+DKq6KcYs=");
let hexString = "b5ee9c720101010100230000420250409510650018b849eee2c1d6c1ec8643438cea1c5b1b7bddb50c1ed86f832a";
let buffer = Buffer.from(hexString, "hex").toString("base64"); // hexString to base64
let dataCell = Cell.fromBase64(buffer);

describe("contract", () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let contract: SandboxContract<AA>;

    beforeAll(async () => {
        blockchain = await Blockchain.create();
        deployer = await blockchain.treasury("deployer");

        contract = blockchain.openContract(await AA.fromInit(dataCell, JettonMinterAddress));
        const deploy_result = await contract.send(deployer.getSender(), { value: toNano(1) }, "C");
        expect(deploy_result.transactions).toHaveTransaction({
            from: deployer.address,
            to: contract.address,
            deploy: true,
            success: true,
        });
    });

    it("Test", async () => {
        let aa = await contract.getGetWalletAddress(Address.parse("kQAgzVlCkPrK9r8F3J1Dgxf8OGwY46yTynBWrU_s4WaJRPtQ"));
        console.log(aa.toString());

        // let walletCode = await contract.getGetWalletCode();
        // console.log(walletCode.asBuilder());
    });
});
