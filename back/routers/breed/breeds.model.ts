import mongoose from 'mongoose'

export interface Breed extends mongoose.Document {
	name: string
}

const breedSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 30,
		unique: true
	}
})

export const Breed = mongoose.model<Breed>('Breed', breedSchema)