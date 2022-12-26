import { DIFFICULTY_ADJUSTMENT_INTERVAL } from './../config';
import { Block } from "@core/blockchain/block";

export class Chain {
    private blockchain: Block[];

    constructor() {
        this.blockchain = [Block.getGENESIS()];
    }

    public getChain(): Block[] {
        return this.blockchain;
    }

    public getLength(): number {
        return this.blockchain.length;
    }

    public getLatestBlock(): Block {
        return this.blockchain[this.blockchain.length - 1];
    }

    public addBlock(data: string[]): Failable<Block, string> {
        const previousBlock = this.getLatestBlock();

        const adjustmentBlock = this.getAdjustmentBlock();

        const newBlock = Block.generateBlock(previousBlock, data, adjustmentBlock);
        const isValid = Block.isValidNewBlock(newBlock, previousBlock);

        if (isValid.isError) return { isError: true, error: isValid.error };

        this.blockchain.push(newBlock);

        return { isError: false, value: newBlock };
    }

    public getAdjustmentBlock(): Block {
        const currentLength = this.getLength();
        return currentLength < DIFFICULTY_ADJUSTMENT_INTERVAL
                ? Block.getGENESIS()
                : this.blockchain[currentLength - DIFFICULTY_ADJUSTMENT_INTERVAL];
    }
}