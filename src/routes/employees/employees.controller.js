const fs = require('fs')
const csv = require('node-csv').createParser()
const employeeService = require('./employees.service')
const getEmployees = async (req, res) => {
	const employees = await employeeService.getEmployees()
	res.json(employees)
}
const addEmployees = async (req, res) => {
	const data = fs.readFileSync('./res/FCT-EMP-LIST.csv')
	const parsed = await new Promise((resolve, reject) => {
		csv.parse(data, function (err, data) {
			resolve(data)
		})
	})
	parsed.shift()

	const inserted = await employeeService.addEmployees(
		parsed.map((e) => ({
			employeeName: e[0],
			email: e[1],
			dateOfJoin: e[2],
			password: e[3],
		}))
	)
	res.send(inserted)
}

const updateEmployee = async (req, res) => {
	const employee = await employeeService.updateEmployee(req.params.id, req.body)
	res.status(200).json(employee)
}

const deleteEmployee = async (req, res) => {
	const employee = await employeeService.deleteEmployees(req.params.id)
	res.status(200).json(employee)
}

module.exports = { getEmployees, addEmployees, updateEmployee, deleteEmployee }
