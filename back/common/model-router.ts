import mongoose from 'mongoose'
import { Router } from './router';
import { NotFoundError } from 'restify-errors';
import * as restify from 'restify'

export abstract class ModelRouter<D extends mongoose.Document> extends Router {

	constructor(public model: mongoose.Model<D>) {
		super()
	}

	validadeId = (req: restify.Request, resp: restify.Response, next: any)=>{
		if(!mongoose.Types.ObjectId.isValid(req.params.id)){
			next(new NotFoundError('Document not found'))
		} else {
			next()
		}
	}

	findAll = (req: restify.Request, resp: restify.Response, next: any)=>{
		this.model.find()
		.populate('affiliate')
		.sort('-affiliate')
		.exec()
		.then(this.renderAll(resp, next))
		.catch(next)
	}

	findById =(req: restify.Request, resp: restify.Response, next: any)=>{
		this.model.findById(req.params.id)
		.populate('breed')
		.populate('affiliate')
		.then(this.render(resp, next))
		.catch(next)
	}

	save = (req: restify.Request, resp: restify.Response, next: any)=>{
		let document = new this.model(req.body)

		document.save().then(this.render(resp, next))
		.catch(next)
	}

	replace = (req: restify.Request, resp: restify.Response, next: any)=>{
		const options = {runValidators: true, overwrite: true}
		this.model.updateOne({_id:req.params.id}, req.body, options).exec()
		.then(result=>{
			if(result.n) {
				return this.model.findById(req.params.id)
			} else {
				throw new NotFoundError('Documento não encontrado')
			}
		}).then(this.render(resp, next))
		.catch(next)
	}

	update = (req: restify.Request, resp: restify.Response, next: any)=>{
		const options = {runValidators: true,new: true}
		this.model.findByIdAndUpdate(req.params.id, req.body, options)
		.then(this.render(resp, next))
		.catch(next)
	}

	delete = (req: restify.Request, resp: restify.Response, next: any)=>{
		this.model.deleteOne({_id:req.params.id}).exec().then((cmdResult:any)=>{

			if(cmdResult.n) {
				resp.send(204)
				
			} else {
				throw new NotFoundError('Documento não encontrado')
			}

			return next()
		}).catch(next)
	}
}