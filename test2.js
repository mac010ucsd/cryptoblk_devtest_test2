const {ethers} = require("ethers")
const contractabi = require("./contractabi.json")

pa = 'scrap vital item urban flame fluid federal gown ocean ticket spy coffee'
contractAddr = "0x715696b3AEA58920E1F5A4cF161e843405D2d384"
traansfer_amount = "1"
deestination_addr = "0x3126081ee598F6658eF6b1aA6A067484759DE4cA"

provider = new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545")
function dotransfer (mnemonic, to_address, value){
	console.log("contract status %s", contractabi.status)

	try {
		wallet = ethers.Wallet.fromMnemonic(mnemonic)
		wallet = wallet.connect(provider)
	} catch {
	}

	console.log("connected my wallet!")

	mycontract = new ethers.Contract(contractAddr, contractabi.result, wallet)
	converted_amount = ethers.utils.parseUnits(value, "ether")

	mycontract.transfer(to_address, converted_amount).then(() => console.log("transfer success"))
}

dotransfer(pa, deestination_addr, traansfer_amount)
