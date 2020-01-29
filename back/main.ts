import { Server } from "./server/server";
import { affiliatesRouter } from "./routers/affiliate/affiliates.router";


const server = new Server()

server.bootstrap([affiliatesRouter]).then(server=>{
	console.log(`Server running on: ${server.application.address().address}:${server.application.address().port}`)
}).catch(error=>{
	console.log('Failed on starting')
	console.log(error)
	process.exit(1)
})