const express = require('express')
const mongoose = require('mongoose')

require('dotenv').config()
const app = express()
const port = process.env.port
const employeeRouter = require('./src/routes/employees/employees.router')
const authRouter = require('./src/routes/auth/auth.router')

app.use(express.json())

mongoose
	.connect(process.env.CONNECTION_STRING)
	.then(() => {
		console.log(`Database Connection Ready`)
	})
	.catch((err) => {
		console.log(err)
	})

app.use('/api/v1/employees', employeeRouter)
app.use('/api/v1/auth', authRouter)

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
