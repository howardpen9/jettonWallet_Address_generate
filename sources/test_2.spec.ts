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

// Jetton Master, get Jetton Wallet Address:
// https://testnet.ton.cx/address/kQAiQ2XK7BXePLwemeo-u4wNyjg-wxGeySmaFGEP7R2Mhf4m

let nftCollectionContent =
    "b5ee9c7201010101002800004c0168747470733a2f2f6e66742e667261676d656e742e636f6d2f6e756d626572732e6a736f6e";
let buffer_0 = Buffer.from(nftCollectionContent, "hex").toString("base64"); // hexString to base64
let cellResult = Cell.fromBase64(buffer_0);
console.log("ContentToCell: " + cellResult.toString());
// --------------------------------------------------------------------------------------------------------------
let JettonMinterAddress = Address.parse("EQC98_qAmNEptUtPc7W6xdHh_ZHrBUFpw5Ft_IzNU20QAJav"); // Main-net
let hexString_Test = "b5ee9c720101010100230000420212bebb0dc8e202b7e26f721e2547e16bb9ebaec934f657d19f22e76d62bec878";
let buffer = Buffer.from(hexString_Test, "hex").toString("base64"); // hexString to base64
let jettonItemCode = Cell.fromBase64(buffer);

// --------------------------------------------------------------------------------------------------------------
// ==== Get item_code ====
let nftCollectionAddr = Address.parse("EQAOQdwdw8kGftJCSFgOErM1mBjYPe4DBPq8-AhF6vr9si5N");
// let itemCode = "b5ee9c72010225010007b5000114ff00f4a413f4bcf2c80b01020120020302014804050064f230f8276f10ed44d0d4f404d1d0fa40d4f404d4d14533237ff02732034414c85004cf1612ccf400ccc901c8ccf400c9ed540202ca06070201201d1e04f5d7b7efe09dbc400b434c0c05c6c2497c1383e903e900c7e800c7d010c7e800c7e800c1cea6d0008b1c0245c2540b4c7d40cf8bb5134353d0134487434fffe903454c1b1c178c0889bbcb43480b43e90353d01353449e0841a4f4e542eb8c089e0840bf2c9a8aeb8c08d0d0970000a62d88dd1bdc1d5c231c16c0a608090a0b020148131400be5b333335048210299a3e15baf2e0d5036e8e1466f02a206e9b3101c8ccf400c9ed54db31e13031926c21e2fa4030708210a43227e1f8256d8040708010c8cb055007cf165005fa0215cb6a12cb1fcb3f226e91329458cf1701e201c901fb00007a3b5f0833d33f30708210a8cb00adc804d014cf1643308040708010c8cb055007cf165005fa0215cb6a12cb1fcb3f226e91329458cf1701e201c901fb0000845f0450785f0501d33f307082108b77173505c8cbff5004cf1610248040708010c8cb055007cf165005fa0215cb6a12cb1fcb3f226e91329458cf1701e201c901fb0003f4d74ac000b0925f0be0236e8e2c519aa140132370f027206e8e1954719026c85004cf1612ccf400ccc9525001c8ccf400c9ed54de512aa04319df258210371638aebae302236e8e2a363703c000f2e0d610364470f02841302370f027324313c85004cf1612ccf400ccc901c8ccf400c9ed54e13a24c000e302240c0d0e00ee35353737266ef2d0db5dc705f2e0dc04d33f3006d0d4d4d130d0f404fa00d31fd15b6ef2e0dd586d5005c85004cf1612ccf400ccc9238e3312708210a37a098358056d8040708010c8cb055007cf165005fa0215cb6a12cb1fcb3f226e91329458cf1701e201c901fb0001926c22e201c8ccf400c9ed540014375f053331c705f2e0d702fc8210487a8e81ba8e68323333355321c705f2e0dc03d33fd430f029206ef2d0df10234604c85004cf1612ccf400ccc9218e3213708210a37a098358056d8040708010c8cb055007cf165005fa0215cb6a12cb1fcb3f226e91329458cf1701e201c901fb00923330e20101c8ccf400c9ed54e00482105fcc3d14bae3025f090f1002ca5153c705f2e0d806505301d33ffa40fa40f404fa003223fa4430c000f2e14d0782103b9aca00a127945375a0a1de22d70b01c300209206a19136e220c2fff2e0ce27941027365be30d0293135f03e30d4433c85004cf1612ccf400ccc901c8ccf400c9ed5411120006f2c0d0007e821005138d91c85008cf1658cf1671245146104a10395092708010c8cb055007cf165005fa0215cb6a12cb1fcb3f226e91329458cf1701e201c901fb001034007223fa4430c000f2e14d43308210d53276db016d71708010c8cb055007cf165005fa0215cb6a12cb1fcb3f226e91329458cf1701e201c901fb000201f415160201481819008f08a0840ee6b28028406d82083080238d20840dc3fb147e0948840d165b5c9c20043232c15401f3c594017e808572da84b2c7f2cfc89ba44ca51633c5c0788072407ec0286456f8a001d908b435353440743d013e8034c7f47e08ccae6497c1380d0064be0037889ba4d7c0db78343e903e803e8034c1f4c7f4c7f457c140b43e903e8034c7f440f434c3f4c3fe90345c20840144e3647e0960840e049f7848f2140373c587328006f2c7c9be808632c7c990c5122a9c601700a2708010c8cb055007cf165005fa0215cb6a12cb1fcb3f226e91329458cf1701e201c901fb0020c20026c200b05345c705b3b08e12544116a9845240b6085144a14554f026431393303233e21023f026016d0201201a1b00714fa40fa00d4d4d4d43001f029206e935f076de010364540f0288b02511370f02732136d500502c8ccf400ccc959c85004cf1612ccf400ccc9801eb3435353440743d013e8034c7f45490ae7cb434c8b43e903e803e8034c1f4c7f4c7f44c0cccd45dbe08f21400f3c5807e80b2c7f27e08d62804ed8249b080149a2f85ec249c0db78920840ee6b28028006999056a2998e0192a41052d82485ba44c78c39400c0b23d00007e80b2c7f2404072333332601c00a308343e903e803e8034c1f4c7f4c7f44d48e0841dcd65002e48f0c014516e452c04ec4070406c406082024ea02f2c48a082784ce02f2c64d7c0db781b7e08d400e800b23d00007e80b2c7f24040723333326000a601d0fa40fa00d31fd1302682103b9aca00a101b60820c2008e368210557cea20f825221034596d71708010c8cb055007cf165005fa0215cb6a12cb1fcb3f226e91329458cf1701e201c901fb0015a104915be20201201f2002012021220067b8f82ed44d0d4f404d131d0fa40d4f404d4d110235f03d0d4f404d4d16c21d0d30701aa02d7180101d30701aa02d7180101d13080039b8ed7ed44d0d4f404d131d0fa40d4f404d4d16c31d0d30fd30ffa40d18005db8fcfed44d0d4f404d101d0d3fffa40d1226e9632708b02136de002d0fa40d4f404d4d15bd0d4f404d4d15b7f444480201202324007fb7d05da89a1a9e809a263a1f481a9e809a9a226be0640dde5a1b7a1a9a9a261a1e809f401a63fa2dae0a608dd226b3abe0605a1f481f401a63fa28889c4aa4300067b74a7da89a1a9e809a263a1f481a9e809a9a226be0640dd2e60dae0a8e00041c1a1a9a9a263a1f481f401f401a60fa63fa63fa30";
// let itemCodebuffer = Buffer.from(itemCode, "hex").toString("base64"); // hexString to base64
// let itemDataCell = Cell.fromBase64(itemCodebuffer);

// let hexString =
//     "5B333335048210299A3E15BAF2E0D5036E8E1466F02A206E9B3101C8CCF400C9ED54DB31E13031926C21E2FA4030708210A43227E1F8256D8040708010C8CB055007CF165005FA0215CB6A12CB1FCB3F226E91329458CF1701E201C901FB00";
// let buffers = Buffer.from(hexString, "hex");
// let base64String = buffers.toString("base64");
// let cellsss = new Cell(hexString);
// console.log("Item Code:", cellsss.toString());

// describe("contract", () => {
//     let blockchain: Blockchain;
//     let deployer: SandboxContract<TreasuryContract>;
//     let contract: SandboxContract<AA>;

//     beforeAll(async () => {
//         blockchain = await Blockchain.create();
//         deployer = await blockchain.treasury("deployer");

//         contract = blockchain.openContract(
//             await AA.fromInit(jettonItemCode, JettonMinterAddress, cellsss, nftCollectionAddr)
//         );
//         const deploy_result = await contract.send(deployer.getSender(), { value: toNano(1) }, "C");
//         expect(deploy_result.transactions).toHaveTransaction({
//             from: deployer.address,
//             to: contract.address,
//             deploy: true,
//             success: true,
//         });
//     });

//     it("JettonWallet", async () => {
//         let aa = await contract.getGetWalletAddress(Address.parse("EQCwnbrsHzmvBpW3rmeNjQHRsLkOCUb_GCkovfUMKaKrgnvR"));
//         console.log(aa.toString());

//         // let walletCode = await contract.getGetWalletCode();
//         // console.log(walletCode.asBuilder());
//     });

//     it("Collection", async () => {
//         let aa = await contract.getGetNftItemAddressByIndex(
//             18173413991769938783964802757380159883003962773948502652477810115511842724876n
//         );
//         console.log("NFT Item: " + aa.toString());
//     });
// });
