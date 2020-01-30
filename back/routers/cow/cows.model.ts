import mongoose from 'mongoose'
import { validDate } from '../../common/validators'
import { affiliatesRouter } from '../affiliate/affiliates.router'
import { environment } from '../../common/environment'
import { BadRequestError, NotAcceptableError, PreconditionFailedError, NotFoundError, InternalServerError } from 'restify-errors'

export interface Cow extends mongoose.Document {
	internalCode: string,
	affiliate: mongoose.Types.ObjectId,
	breed: mongoose.Types.ObjectId,
	birthDate: Date
}

const cowSchema = new mongoose.Schema({
	internalCode:{
		type: String,
		required: true,
		unique: true,
		minlength: 1,
		maxlength: 10
	},
	birthDate: {
		type: Date,
		required: false,
		default: Date.now(),
		validate: {
			validator: validDate,
			message: `{PATH}: Invalid Birth Date {VALUE}`
		}
	},
	affiliate: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	breed: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	}
})

const saveMiddleware = function(this: any, next: any) {
	const cow: Cow = this
	
	affiliatesRouter.totalCows(this.affiliate).then(affiliate => {

		if(affiliate == null || affiliate == undefined) {next(new InternalServerError('Unexpected error'))}
		else if (affiliate?.totalCows >= environment.affiliateRule.limitOfCows) {
			next(new BadRequestError('Execeeded limit of cows'))
		} else {
			affiliate.totalCows = affiliate?.totalCows + 1 
			affiliatesRouter.refreshTotal(affiliate?._id, affiliate)
			next()
		}
	})
	
}

const updateMiddleware = function(this: any, next: any) {

	const newValues = this.getUpdate()

	this.model.findById(this._conditions._id).then((oldValues: Cow) => {

		if(oldValues.affiliate == newValues.affiliate || !newValues.affiliate) {
			next()
		} else {
			affiliatesRouter.totalCows(this.getUpdate().affiliate).then(af => {
				let affiliate = af
				if(affiliate == null || affiliate == undefined || af == null) {next(new InternalServerError('Unexpected error'))}
				else if (affiliate.totalCows >= environment.affiliateRule.limitOfCows) {
					next(new BadRequestError('Execeeded limit of cows'))
				} else {
					affiliate.totalCows = af.totalCows + 1
					affiliatesRouter.refreshTotal(newValues.affiliate, affiliate)

					affiliatesRouter.totalCows(oldValues.affiliate).then(af => {
						let affiliate = af
						if(affiliate == null || af == null) {next(new InternalServerError('Unexpected error'))} 
						else {
							affiliate.totalCows = af?.totalCows - 1
							affiliatesRouter.refreshTotal(oldValues.affiliate, affiliate)
							next()
						}
						
					})
	
				}
			})
		}
	})
}


cowSchema.pre('save', saveMiddleware)
cowSchema.pre('findOneAndUpdate',updateMiddleware)
cowSchema.pre('update',updateMiddleware)

export const Cow = mongoose.model<Cow>('Cow', cowSchema)