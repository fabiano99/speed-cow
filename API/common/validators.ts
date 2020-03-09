import moment, { isDate } from 'moment'

export const validDate = (date: Date): boolean => {

	const today = Date.now()

	if (isDate(date)) {
		return moment(date).isBefore(Date.now())
	}

	return false

}