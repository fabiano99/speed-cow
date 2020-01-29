import * as restify from 'restify'
import { ModelRouter } from '../../common/model-router';
import { Breed } from './breeds.model';

class BreedsRouter extends ModelRouter<Breed> {
	constructor() {
		super(Breed)
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