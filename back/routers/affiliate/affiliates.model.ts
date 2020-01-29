import mongoose from 'mongoose'

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
	}
})

export const Affiliate = mongoose.model<Affiliate>('Affliate', affiliateSchema)