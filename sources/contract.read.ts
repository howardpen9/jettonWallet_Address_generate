import { beginCell, contractAddress, toNano, Cell, Address, TonClient4 } from "ton";
import { deploy } from "./utils/deploy";
import { printAddress, printDeploy, printHeader } from "./utils/print";
// ================================================================= //
import { AA } from "./output/sample_AA";
// ================================================================= //

(async () => {
    const client = new TonClient4({
        endpoint: "https://mainnet-v4.tonhubapi.com", // 🔴 Main-net API endpoint
        // endpoint: "https://sandbox-v4.tonhubapi.com", // 🔴 Test-net API endpoint
    });

    // Parameters
    let collection_address = Address.parse("EQDbcyLpXE0U7vuG9eTanD6n3APzuOP1OOU-AErP7ZAlM1XR");
    let contract_address = await AA.fromAddress(collection_address);
    let client_open = client.open(contract_address);

    let getWalletByAddress = await client_open.getGetWalletAddress(
        Address.parse("EQCwnbrsHzmvBpW3rmeNjQHRsLkOCUb_GCkovfUMKaKrgnvR")
    );
    printHeader("Get stTON JettonWallet Address");
    console.log("JettonWallet: " + getWalletByAddress);

    let iten_index = 18173413991769938783964802757380159883003962773948502652477810115511842724876n;
    let getNFTItemAddress = await client_open.getGetNftItemAddressByIndex(iten_index);
    printHeader("Get TG PhoneNumber Address");
    console.log("NFT Item: " + getNFTItemAddress);
})();
