import * as restify from 'restify'
import { ModelRouter } from '../../common/model-router';
import { Affiliate } from './affiliates.model';


class AffiliatesRouter extends ModelRouter<Affiliate> {

	constructor() {
		super(Affiliate)
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