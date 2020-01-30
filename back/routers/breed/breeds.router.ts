import * as restify from 'restify'
import { ModelRouter } from '../../common/model-router';
import { Breed } from './breeds.model';
import { NotFoundError, BadRequestError } from 'restify-errors';
import { cowsRouter } from '../cow/cows.router';

class BreedsRouter extends ModelRouter<Breed> {
	constructor() {
		super(Breed)
	}

	delete = (req: restify.Request, resp: restify.Response, next: any)=>{
		cowsRouter.model.find({'breed': req.params.id}).then(result => {
			if (result.length) {
				next(new BadRequestError('Remove all cows associated with this breed'))
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

		application.get('/breeds', this.findAll)
		application.get('/breeds/:id', [this.validadeId, this.findById])
		application.post('/breeds', this.save)
		application.put('/breeds/:id', [this.validadeId, this.replace])
		application.patch('/breeds/:id', [this.validadeId, this.update])
		application.del('/breeds/:id', [this.validadeId, this.delete])

	}
}

export const breedsRouter = new BreedsRouter()