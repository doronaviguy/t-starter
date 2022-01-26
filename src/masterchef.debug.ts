import {readFile} from "fs/promises";
import {SmartContract} from "ton-contract-executor";
import {buildDataCell, stringToCell, MasterchefConfig} from "./masterchef.data";
import {Address, Cell, CellMessage, InternalMessage, Slice} from "ton";
import BN from "bn.js";

function sliceToString(s: Slice) {
    let data = s.readRemaining()
    return data.buffer.slice(0, Math.ceil(data.cursor / 8)).toString()
}

const contractAddress = Address.parse('EQD4FPq-PRDieyQKkizFTRtSDyucUIqrj0v_zXJmqaDp6_0t')


export class MasterchefDebug {
    contract: SmartContract;

    private constructor(public readonly smart_contract: SmartContract) {
        this.contract = smart_contract;
    }

    async getTokenUri(tokenId: number) {
        let res = await this.contract.invokeGetMethod('token_uri', [{ type: 'int', value: tokenId.toString() }])
         let id = (res.result[1] as BN);
         let uri = sliceToString(Slice.fromCell(res.result[0] as Cell))
        return `${uri}/${id.toString(10)}`;
    }

    async getSupply() {
        let res = await this.contract.invokeGetMethod('total_supply', [])
        return (res.result[0] as BN).toNumber()
    }

    async getOwner(tokenId: number) {
        let res = await this.contract.invokeGetMethod('owner_of', [{ type: 'int', value: tokenId.toString() }])
        console.log(res);
        let wc = res.result[0] as BN
        let address = res.result[1] as BN

        return new Address(wc.toNumber(), address.toBuffer())
    }

    async getName() {
        let res = await this.contract.invokeGetMethod('name', []);
        return sliceToString(Slice.fromCell(res.result[0] as Cell))
    }

    async getSymbol() {
        let res = await this.contract.invokeGetMethod('symbol', [])
        return sliceToString(Slice.fromCell(res.result[0] as Cell))
    }

    async stake(minter: Address) {

        let messageBody = new Cell()


        messageBody.bits.writeUint(1, 32) // op
        messageBody.bits.writeUint(1, 64) // query_id
        

        let res = await this.contract.sendInternalMessage(new InternalMessage({
            to: contractAddress,
            from: minter,
            value: new BN(1),
            bounce: false,
            body: new CellMessage(messageBody)
        }))
        return res
    }

    async withdraw(minter: Address) {

    }

    async balanceOf(owner: Address) {
        let wc = owner.workChain;
        let address = new BN(owner.hash)
        console.log(wc, address);

        let balanceResult = await this.contract.invokeGetMethod('balance_of', [
            { type: 'int', value: wc.toString(10) },
            { type: 'int', value: address.toString(10) },
        ])
        
        return (balanceResult.result[0] as BN).toNumber();
    }

    static async create(config: MasterchefConfig) {
        let source = (await readFile('./src/masterchef.fc')).toString('utf-8')
        let contract = await SmartContract.fromFuncSource(source, buildDataCell(config), { getMethodsMutate: true })

        return new MasterchefDebug(contract)
    }
}