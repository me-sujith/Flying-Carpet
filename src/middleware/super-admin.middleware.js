const isSuperAdmin = (req, res, next) => {
	if (req.user.isSuperAdmin) {
		next()
	} else {
		return res.status(403).send('Access denied!')
	}
}

module.exports = { isSuperAdmin }
