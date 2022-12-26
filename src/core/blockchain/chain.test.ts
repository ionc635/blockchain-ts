import { Chain } from "@core/blockchain/chain"

describe("Chain 함수 테스트", () => {
    let node: Chain = new Chain();

    it("getChain() 함수 테스트", () => {
        console.log(node.getChain());
    });

    it("getLength() 함수 테스트", () => {
        console.log(node.getLength());
    })

    it("getLatestBlock() 함수 테스트", () => {
        console.log(node.getLatestBlock());
    })

    it("addBlock 함수 테스트", () => {
        for (let i = 1; i <= 5; i++) {
            node.addBlock([`Block #${i}`]);
        }

        console.log(node.getChain());
    })
})