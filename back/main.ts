import { Server } from "./server/server";
import { affiliatesRouter } from "./routers/affiliate/affiliates.router";
import { breedsRouter } from "./routers/breed/breeds.router";


const server = new Server()

server.bootstrap([affiliatesRouter, breedsRouter]).then(server=>{
	console.log(`Server running on: ${server.application.address().address}:${server.application.address().port}`)
}).catch(error=>{
	console.log('Failed on starting')
	console.log(error)
	process.exit(1)
})