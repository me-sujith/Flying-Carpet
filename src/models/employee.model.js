const mongoose = require('mongoose')

const employeeSchema = mongoose.Schema({
	employeeName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	dateOfJoin: {
		type: Date,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	isSuperAdmin: {
		type: Boolean,
		default: false,
	},
})

const Employees = mongoose.model('Employees', employeeSchema)

module.exports = Employees
