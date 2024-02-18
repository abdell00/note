const jwt = require('jsonwebtoken')

const checkAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization
        if(token) {
            const result = await jwt.verify(token, 'abdell')
            console.log(result)
            if(result) {
                req.user = result?.id
                next()
            }
            else {
                res.json({msg: "No Authorized"})
            }
        }
        else {
            res.json({msg: "No Authorized"})
        }
    } catch (err) {
        console.log(err)
        res.json({msg: "No Authorized"})
    }
}


module.exports = checkAuth