const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { getEmployeeByEmail } = require('../employees/employees.service')

const login = async (req, res) => {
	const { email, password } = req.body

	const employee = await getEmployeeByEmail(email)
	if (employee) {
		if (bcrypt.compareSync(password, employee.password)) {
			const token = jwt.sign({ user: employee._id }, process.env.AUTH_KEY)
			return res.json({ token })
		} else {
			return res.json({ error: 'Invalid credentials' }, 401)
		}
	} else {
		return res.json({ error: 'Employee not found' }, 404)
	}
}

module.exports = { login }
