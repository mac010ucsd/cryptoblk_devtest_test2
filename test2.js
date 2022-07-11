const https = require('node:http')
const {ethers} = require("ethers")
const contractabi = require("./contractabi.json")
const config = require("./config.json")

provider = new ethers.providers.JsonRpcProvider(config["provider"])
contractAddr = config["contractAddr"]

function do_transfer (mnemonic, to_address, value){
	console.log("contract status %s", contractabi.status)

	try {
		wallet = ethers.Wallet.fromMnemonic(mnemonic)
	} catch {
		console.log("failed to connect wallet")
		return
	}
	
	wallet = wallet.connect(provider)
	console.log("connected my wallet!")

	mycontract = new ethers.Contract(contractAddr, contractabi.result, wallet)
	converted_amount = ethers.utils.parseUnits(value.toString(), "ether")

	mycontract.transfer(to_address, converted_amount).then(() => console.log("transfer success"))
}

valid_keys = ["mnemonic", "to_address", "value"]

function verify_request(parsed_json) {
	keys = Object.keys(parsed_json)
	if (keys.length != 3){
		return false
	}
	for (key in valid_keys) {
		if (!(key in keys)){
			return false
		}
	}
	if (typeof(parsed_json["mnemonic"]) != "string" || 
		parsed_json["mnemonic"].split(" ").length != 12){
		return false
	}
	if (typeof(parsed_json["value"]) != "number" || 
		parsed_json["value"] <= 0){
		return false
	}
	if (typeof(parsed_json["to_address"]) != "string"){
		return false
	}
	return true
}


server = https.createServer((req, res) => {
	res.statusCode = 200
	res.setHeader('Content-Type', 'text/plain')
	res.write('hello world !')
	res.end()
//	console.log(req.body.mnemonic)
	req.setEncoding('utf8')
	console.log(req.method)
	headers = req.headers
	if ('content-type' in headers && 
		headers["content-type"] == 'application/json') {
		//console.log("we json")
		req.on('data', (data) => {
			//console.log(data)
			//console.log(typeof(data))
			try {
				data_parsed = JSON.parse(data)
				console.log(data_parsed)
				
				// mnemonic to_address value
				
			} catch { 
				console.log("bad")
				return
				// error code
			}
			if(!verify_request(data_parsed)){
				console.log("error parsing")
				return
			}
			try{
				do_transfer(
					data_parsed["mnemonic"],
					data_parsed["to_address"],
					data_parsed["value"]
				)
			} catch (exception) { console.log(exception) }
		})
	}
})

port = config["port"]

server.listen(port, () => {
	console.log('server running at port %d', port)
})
