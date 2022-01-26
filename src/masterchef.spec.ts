import {Address, Cell} from "ton";
import {readFile} from "fs/promises";
import {buildDataCell, stringToCell, MasterchefConfig} from "./masterchef.data";
import { MasterchefDebug} from "./masterchef.deubg";


const myAddress = Address.parseFriendly('EQD4FPq-PRDieyQKkizFTRtSDyucUIqrj0v_zXJmqaDp6_0t').address;
const bobAddress = Address.parseFriendly('EQDrjaLahLkMB-hMCmkzOyBuHJ139ZUYmPHu6RRBKnbdLIYI').address;


var DefaultConfig : MasterchefConfig = {
    name: 'Masterchef',
    symbol: 'NO_NEED',
    totalSupply: 12
};


describe('SmartContract', () => {
    let source: string

    beforeAll(async () => {
        source = (await readFile('./src/masterchef.fc')).toString('utf-8')
    })

    it('should return name', async () => {
        let contract = await MasterchefDebug.create(DefaultConfig)
        expect(await contract.getName()).toEqual(DefaultConfig.name)
    })

    it('should return symbol', async () => {
        let contract = await MasterchefDebug.create(DefaultConfig)
        expect(await contract.getSymbol()).toEqual(DefaultConfig.symbol)
    })

    it('should return total_supply', async () => {
        let contract = await MasterchefDebug.create(DefaultConfig)
        expect(await contract.getSupply()).toEqual(DefaultConfig.totalSupply);
    })



//     it('should mint a single token ', async () => {
//         let contract = await MasterchefDebug.create(DefaultConfig)

//         let res = await contract.mint(myAddress)
//         expect(res.exit_code).toBe(0)
        
//         expect(await contract.getName()).toEqual(DefaultConfig.name)

//         // ipfs test
//         let uri = await contract.getTokenUri(1)
//         let nftData = await fethcIpfs(uri);
//         expect(nftData.image).toBe(APE_1_IMAGE);

//         expect((await contract.getSupply())).toBe(1)
//         expect( await contract.balanceOf(myAddress)).toBe(1);
        
// /// TODO
//         //expect((await contract.getOwner(1)).toFriendly()).toEqual(myAddress.toFriendly())
//     })


//     it('should mint a couple of tokens ', async () => {
//         let contract = await Trc721Debug.create(DefaultConfig);

//         let res1 = await contract.mint(myAddress)
//         expect(res1.exit_code).toBe(0)
//         let res2 = await contract.mint(myAddress)
//         expect(res2.exit_code).toBe(0)        

//         let uri = await contract.getTokenUri(2)
//         let nftData = await fethcIpfs(uri);
//         expect(nftData.image).toBe(APE_2_IMAGE);

//         expect( await contract.getSupply()).toBe(2)
//         expect( await contract.balanceOf(myAddress)).toBe(2);

//         expect( await contract.balanceOf(bobAddress)).toBe(0);

       

//         //console.log(await contract.getOwner(1));

//         //console.log(await contract.getOwner(1));
        
//         //expect((await contract.getOwner(2)).toFriendly()).toEqual(myAddress.toFriendly())
//     })

//     it('should mint a couple of tokens from different users ', async () => {
//         let contract = await Trc721Debug.create(DefaultConfig);

//         let res1 = await contract.mint(myAddress)
//         expect(res1.exit_code).toBe(0)
//         expect( await contract.getSupply()).toBe(1)
//         expect( await contract.balanceOf(myAddress)).toBe(1);

//         let res2 = await contract.mint(bobAddress)
//         expect(res2.exit_code).toBe(0)        
//         expect( await contract.getSupply()).toBe(2)
//         expect( await contract.balanceOf(bobAddress)).toBe(1);

//         let uri = await contract.getTokenUri(2)
//         let nftData = await fethcIpfs(uri);
//         expect(nftData.image).toBe(APE_2_IMAGE);

        
//     });
       
    
//     it('should transfer from user to bob', async () => {
//         let contract = await Trc721Debug.create(DefaultConfig);

//         let res1 = await contract.mint(myAddress)
//         expect(res1.exit_code).toBe(0)
//         expect( await contract.getSupply()).toBe(1)
//         expect( await contract.balanceOf(myAddress)).toBe(1);

//         contract.transfer(bobAddress)
        
//     });

 

})

