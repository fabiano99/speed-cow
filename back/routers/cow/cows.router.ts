import * as restify from 'restify'
import { ModelRouter } from '../../common/model-router';
import { Cow } from './cows.model';
import { affiliatesRouter } from '../affiliate/affiliates.router';
import { NotFoundError, InternalServerError } from 'restify-errors';

class CowsRouter extends ModelRouter<Cow> {
	constructor() {
		super(Cow)
	}

	deleteAndUpdate = (req: restify.Request, resp: restify.Response, next: any)=>{
		const options = {runValidators: true, overwrite: true}

		this.model.findByIdAndDelete({_id:req.params.id}).exec().then((cmdResult:any)=>{
			if(cmdResult) {
				affiliatesRouter.model.findById(cmdResult.affiliate, '+totalCows')
				.then(result => {
					if(result == null) {next(new InternalServerError('Unexpected error'))} 
					else {
						result.totalCows = result?.totalCows - 1
						affiliatesRouter.model.findOneAndUpdate({'_id':cmdResult.affiliate}, result, options)
						.then().catch()
					}
				}).catch()
				resp.send(204)
				
			} else {
				throw new NotFoundError('Documento não encontrado')
			}

			return next()
		}).catch(next)
	}

	findByAffiliate = (req: restify.Request, resp: restify.Response, next: any)=>{

		this.model.find({'affiliate': req.params.id}).then(result => {
			if(result) {
				resp.json(result)
				
			} else {
				resp.json([])
			}
			return next
		}).catch()

	}

	findByBreed = (req: restify.Request, resp: restify.Response, next: any)=>{
		this.model.find({'breed': req.params.id}).then(result => {
			if(result) {
				resp.json(result)
				
			} else {
				resp.json([])
			}
			return next
		}).catch()

	}

	applyRoutes(application: restify.Server) {

		application.get('/cows', this.findAll)
		application.get('/cows/:id', [this.validadeId, this.findById])
		application.post('/cows', [this.save])
		application.put('/cows/:id', [this.validadeId, this.replace])
		application.patch('/cows/:id', [this.validadeId, this.update])
		application.del('/cows/:id', [this.validadeId, this.deleteAndUpdate])

		application.get('/cows/affiliate/:id', [this.findByAffiliate])
		application.get('/cows/breed/:id', [this.findByBreed])

	}
}

export const cowsRouter = new CowsRouter()