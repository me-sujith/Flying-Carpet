const bcrypt = require('bcrypt')
const Employee = require('../../models/employee.model')

const addEmployees = async (employees) => {
	let createdEmployees = []
	for await (let emp of employees) {
		let employee = new Employee(emp)
		const hashedPassword = bcrypt.hashSync(emp.password, 10)
		employee.password = hashedPassword
		await employee.save()

		createdEmployees.push(employee)
	}
	return createdEmployees
}

const getEmployeeByEmail = async (email) => {
	const employee = await Employee.findOne({ email })
	return employee
}

const getEmployeeById = async (_id) => {
	const employee = await Employee.findById(_id)
	return employee
}

const getEmployees = async () => {
	const employee = await Employee.find({}).select('-password')
	return employee
}

const updateEmployee = async (id, employee) => {
	const emp = await Employee.findByIdAndUpdate(id, employee, { new: true })
	return employee
}
const deleteEmployees = async (id) => {
	try {
		const employee = await Employee.findByIdAndRemove(id)
		if (!employee) {
			return { success: false, message: 'employee  not found!' }
		}
		return { success: true, message: 'the employee is deleted' }
	} catch (error) {
		return { success: false, message: 'the employee is deleted' }
	}
}

module.exports = {
	addEmployees,
	getEmployeeByEmail,
	getEmployeeById,
	getEmployees,
	updateEmployee,
	deleteEmployees,
}
