import * as restify from 'restify'
import mongoose, { Mongoose } from 'mongoose'
import { environment } from '../common/environment'
import { Router } from '../common/router'
import { handleError } from './error-handler'


export class Server {
	application: restify.Server
	
	initializeDb(): Promise<mongoose.Mongoose>{
		return mongoose.connect(environment.db.url, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})
	}

	initRoutes(routers: Router[]): Promise<restify.Server> {
		return new Promise((resolve, reject) => {
			try {
				this.application = restify.createServer({
					name: 'speed-cow-api',
					version: '1.0.0'
				})

				this.application.use(restify.plugins.bodyParser())
				this.application.use(restify.plugins.queryParser())

				// routes
				for (let router of routers) {
					router.applyRoutes(this.application)
				}

				this.application.listen(environment.server.port, ()=>{
					resolve(this.application)
				})

				this.application.on('restifyError', handleError)

			} catch (error) {
				reject(error)
			}
			
		})
	}

	bootstrap(routers: Router[] = []): Promise<Server> {
		return this.initializeDb().then( () => 
			this.initRoutes(routers).then(()=>this)
		) 
	}
}