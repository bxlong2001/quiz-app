const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
	const authHeader = req.header('Authorization')
	const token = authHeader && authHeader.split(' ')[1]

	if (!token)
		return res
			.status(401)
			.json({ success: false, message: 'Access token not found' })

	try {
		const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
		req.id = decoded.id
		req.admin = decoded.admin
		next()
	} catch (error) {
		console.log(error)
		return res.status(403).json({ success: false, message: 'Invalid token' })
	}
}

const verifyTokenAndAdmin = (req, res, next) => {
	verifyToken(req, res, () => {
		if(req.admin) {
			next()
		} else {
			res.status(403).json({ success: false, message: 'Bạn không phải admin' })
		}
	})
}

module.exports = {
	verifyToken,
	verifyTokenAndAdmin
}