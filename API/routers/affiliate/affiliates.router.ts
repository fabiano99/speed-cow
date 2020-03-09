import * as restify from 'restify'
import { ModelRouter } from '../../common/model-router';
import { Affiliate } from './affiliates.model';
import mongoose from 'mongoose'
import { NotFoundError, BadRequestError } from 'restify-errors';
import { cowsRouter } from '../cow/cows.router';


class AffiliatesRouter extends ModelRouter<Affiliate> {

	constructor() {
		super(Affiliate)
	}

	totalCows (idAffiliate: mongoose.Types.ObjectId) {
		return this.model.findById(idAffiliate, '+totalCows')
	}

	refreshTotal(idAffiliate: mongoose.Types.ObjectId, body: any){
		const options = {runValidators: true,new: true}
		this.model.findByIdAndUpdate(idAffiliate, body, options).then().catch()
	}

	delete = (req: restify.Request, resp: restify.Response, next: any)=>{
		cowsRouter.model.find({'affiliate': req.params.id}).then(result => {
			if (result.length) {
				next(new BadRequestError('Remove all cows associated with this affiliate'))
			} else {
				this.model.deleteOne({_id:req.params.id}).exec().then((cmdResult:any)=>{

					if(cmdResult.n) {
						resp.send(204)
						
					} else {
						throw new NotFoundError('Documento não encontrado')
					}
					return next()
				}).catch(next)
			}
		})


	}
	
	applyRoutes(application: restify.Server) {

		application.get('/affiliates', this.findAll)
		application.get('/affiliates/:id', [this.validadeId, this.findById])
		application.post('/affiliates', this.save)
		application.put('/affliliates/:id', [this.validadeId, this.replace])
		application.patch('/affiliates/:id', [this.validadeId, this.update])
		application.del('/affiliates/:id', [this.validadeId, this.delete])

	}

}

export const affiliatesRouter = new AffiliatesRouter()