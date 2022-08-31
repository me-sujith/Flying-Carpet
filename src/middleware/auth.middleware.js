const jwt = require('jsonwebtoken')
const { getEmployeeById } = require('../routes/employees/employees.service')

const isAuthenticated = async (req, res, next) => {
	try {
		const token = req.headers.authorization.substring('Bearer '.length)
		const verified = jwt.verify(token, process.env.AUTH_KEY)
		req.user = await getEmployeeById(verified.user)
		next()
	} catch (error) {
		console.log(error)
		return res.status(401).jaon({ error: error })
	}
}

module.exports = { isAuthenticated }
