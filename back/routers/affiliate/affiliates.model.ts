import mongoose from 'mongoose'
import { environment } from '../../common/environment'

export interface Affiliate extends mongoose.Document {
	name: string,
	totalCows: number
}

const affiliateSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		maxlength: 80,
		minlength: 5
	},
	totalCows: {
		type: Number,
		required: true,
		max: environment.affiliateRule.limitOfCows,
		min: 0,
		default: 0,
		select: false
	}
})

export const Affiliate = mongoose.model<Affiliate>('Affliate', affiliateSchema)