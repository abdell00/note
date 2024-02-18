const Client = require('../models/Client')
const bcrytp = require('bcryptjs')
const router = require('express').Router()
const jwt = require('jsonwebtoken')
const checkAuth = require('../middlewares/chekAuth')


const generateRefreshToken = require('../models/Client');

router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body
        const hashPass = await bcrytp.hashSync(password, 10)
        const data = await Client.create({
            username,
            email,
            password: hashPass
        })
        res.json(data)
    } catch (err) {
        console.log(err)
        res.json({
            err: err?.message
        })
    }
})


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const us = await Client.findOne({email})
        if(us) {
            const checkPas = await bcrytp.compareSync(password, us.password)
            if(checkPas) {
                const token = jwt.sign({email: us.email, id: us._id}, 'abdell', {expiresIn: '3d'})
                const refreshToken = generateRefreshToken();
                us.refreshToken = refreshToken;
                await us.save();
                res.json({
                    token,
                    user: us
                })
            }
            else {
                res.json({msg: "Password Wrong"})
            }
        }
        else {
            res.json({msg: "User Not Found"})
        }
    } catch (err) {
        console.log(err)
        res.json({
            msg: err?.message
        })
    }
})

router.get('/profile', checkAuth, async (req, res) => {
    try {
        const data = await Client.findById(req.user)
        res.json(data)
    } catch (err) {
        console.log(err)
        res.json({msg: err?.message})
    }
})

router.post('/refresh-token', async (req, res) => {
    const refreshToken = req.body.refreshToken;

    try {
       
        const decoded = jwt.verify(refreshToken, 'abdell');

       
        const user = await Client.findOne({ _id: decoded.id, refreshToken });

        if (!user) {
            return res.json({ msg: 'Invalid refresh token' });
        }

        
        const newAccessToken = jwt.sign({ email: user.email, id: user._id }, 'abdell', { expiresIn: '3d' });

        res.json({
            token: newAccessToken,
            user
        });
    } catch (err) {
        console.log(err);
        res.json({ msg: 'Invalid refresh token' });
    }
});


module.exports = router