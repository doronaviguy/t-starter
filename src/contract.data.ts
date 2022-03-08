import {Cell} from "ton";

export const stringToCell = (str: string) => {
    let cell = new Cell()
    cell.bits.writeString(str)
    return cell
}

export type MasterchefConfig = {
    name: string
    symbol: string
    totalSupply: number
}

export function buildDataCell(conf: MasterchefConfig) {
    let dataCell = new Cell()
    dataCell.bits.writeUint(1, 1)               // inited
    dataCell.refs.push(stringToCell(conf.name))     // name
    dataCell.refs.push(stringToCell(conf.symbol))   // symbol
    dataCell.bits.writeUint(conf.totalSupply, 256)  // supply
    dataCell.bits.writeUint(0, 1)                   // map[id] pools
    dataCell.bits.writeUint(0, 1)                   // balances empty dict
    dataCell.bits.writeUint(0, 1)                   // approvals empty dict

    return dataCell
}