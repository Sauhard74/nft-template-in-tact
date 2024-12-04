import { beginCell, contractAddress, toNano, Address } from "@ton/ton";
import { deploy } from "./utils/deploy";
import { printAddress, printDeploy, printHeader } from "./utils/print";
import { NftCollection } from "./output/sample_NftCollection";

(async () => {
    const OFFCHAIN_CONTENT_PREFIX = 0x01;
    const string_first = "0x6183cc8f4c6bc19a7d29f246f5df93799d62db06c6d18cded3daaa7ca5cbc91b"; // Change this to your content URL
    let newContent = beginCell().storeInt(OFFCHAIN_CONTENT_PREFIX, 8).storeStringRefTail(string_first).endCell();

    // Replace with your wallet address
    let owner = Address.parse("0QDlPgZ29iS2_AqmyhbReLTXBthWzASFmaIHPPNX59wytVIu"); 

    let init = await NftCollection.init(owner, newContent, {
        $$type: "RoyaltyParams",
        numerator: 350n,
        denominator: 1000n,
        destination: owner,
    });

    let address = contractAddress(0, init);
    let deployAmount = toNano("0.5");
    let testnet = true;

    let body = beginCell().storeUint(0, 32).storeStringTail("Mint").endCell();

    await deploy(init, deployAmount, body, testnet);
    printHeader("NFT Collection Contract");
    printAddress(address);
})();