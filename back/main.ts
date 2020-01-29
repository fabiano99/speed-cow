import { Server } from "./server/server";


const server = new Server()

server.bootstrap([]).then(server=>{
	console.log(`Server running on: ${server.application.address().address}:${server.application.address().port}`)
}).catch(error=>{
	console.log('Failed on starting')
	console.log(error)
	process.exit(1)
})