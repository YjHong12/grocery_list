const bcrypt = require('bcrypt')
const jwt = require ('jsonwebtoken')
const { createMember, getMemberByUsername } = require('../db/helpers/members')
const { JWT_SECRET } = require('../secrets')

const router = require('express').Router()

const SALT_ROUNDS = 10

router.get('/', async (req, res, next) => {
    try {
        res.send('This is auth')
    } catch (error) {
        next(error)
    }
})

router.post('/register', async (req, res, next) => {
    try {
        console.log(req.body)
        const { username, password } = req.body
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
        const member = await createMember({ username, password: hashedPassword })
        delete member.password

        const token = jwt.sign(member, JWT_SECRET)

        res.cookie('token', token, {
            sameSite: 'strict',
            httpOnly: true,
            signed: true
        })
        delete member.passwordres.send({member})
    } catch (error) {
        next(error)
    }
})

router.post('/login', async (req, res, next) => {
    try {
        console.log(req.body)
        const { username, password } = req.body
        const member = await getMemberByUsername(username)
        console.log(member)

        const validPassword = await bcrypt.compare(password, member.password)

        delete member.password
        if (validPassword) {
            const token = jwt.sign(member, JWT_SECRET)
            res.cookie('token', token, {
                sameSite: 'strict',
                httpOnly: true,
                signed: true
            })
            delete member.password
            res.send({member})
        }
    } catch (error) {
        next(error)
    }
})

router.post('/logout', async (req, res, next) => {
    try {
        res.clearCookie('token', {
            sameSite:'strict',
            httpOnly: true,
            signed: true
        })
        res.send({
            loggedIn:false,
            message: 'Logged Out'
        })
    } catch (error) {
        next(error)
    }
})

module.exports = router