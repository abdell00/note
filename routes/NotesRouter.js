const { models } = require('mongoose')
const checkAuth = require('../middlewares/chekAuth')
const Note = require('../models/Note')

const router = require('express').Router()


router.get('/', checkAuth, async (req, res) => {
    try {
        const data = await Note.find({owner: req.user})
        res.json(data)      
    } catch (err) {
         console.log(err)
         res.json({msg: err?.message})
    }
})

router.get('/note/:id', checkAuth, async (req, res) => {
    try {
        const { id } = req.params
        const data = await Note.findById(id)
        res.json(data)      
    } catch (err) {
         console.log(err)
         res.json({msg: err?.message})
    }
})

router.post('/', checkAuth, async (req, res) => {
    try {
        const { title, content } = req.body
        const data = await Note.create({
            title,
            content,
            owner: req.user
        })
        res.json(data)      
    } catch (err) {
         console.log(err)
         res.json({msg: err?.message})
    }
})

router.delete('/delete/:id', checkAuth, async(req, res) => {
    try {
        const { id } = req.params
        await Note.findByIdAndDelete(id)
        res.json({msg: "Done"})
    } catch (err) {
        res.json({err: err?.message})
    }
})



module.exports = router