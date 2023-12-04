const jwt = require("jsonwebtoken")
const auth = (req, res, next) => {
    if (!req.headers.authorization) return res.status(401).json("Vous devez être authentifié pour effectuer ceci")
    const token = req.headers.authorization.split(" ")[1]

    jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
        console.log(token, process.env.JWT_TOKEN)
        console.log(decoded)
        if (err || !decoded.userId) return res.status(401).json("Vous devez être authentifié pour effectuer ceci")
        req.body.userId = decoded.userId
        next()
    })
}

module.exports = {auth}