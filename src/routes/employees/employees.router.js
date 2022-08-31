const express = require('express')
const router = express.Router()
const { isAuthenticated } = require('../../middleware/auth.middleware')
const { isSuperAdmin } = require('../../middleware/super-admin.middleware')
const {
	getEmployees,
	addEmployees,
	updateEmployee,
	deleteEmployee,
} = require('./employees.controller')

router.get('/', [isAuthenticated, isSuperAdmin], getEmployees)
router.post('/', isAuthenticated, addEmployees)
router.put('/:id', isAuthenticated, updateEmployee)
router.delete('/:id', isAuthenticated, deleteEmployee)

module.exports = router
