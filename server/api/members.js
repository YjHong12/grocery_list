const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { getMemberById, getAllMembers, createMember, updateMember, deleteMember } = require('../db/helpers/members')

// A GET request for a single user by id
router.get('/:member_id', async (req, res, next) => {
    try{
        const member = await getMemberById(req.params.member_id);
        res.send(member);
    } catch (error) {
        next(error);
    }
})

// A GET request for all members
router.get('/', async (req, res, next) => {
    try{
        const members = await getAllMembers();
        res.send(members);
    } catch (error) {
        next(error);
    }
});

// A POST request to add a new member
router.post('/', async (req, res, next) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const member = await createMember(req.body);
        res.send(member);
    } catch (error) {
        next(error);
    }
});

// A PUT or PATCH request to update member by id
router.put('/:member_id', async (req, res, next) => {
    try{
        const member = await updateMember(req.params.member_id, req.body);
        res.send(member);
    } catch (error) {
        next(error);
    }
});

// A DELETE request to delete a member by id
router.delete('/:member_id', async (req, res, next) => {
    try{
        const member = await deleteMember(req.params.member_id);
        res.send(member);
    } catch (error) {
        next(error);
    }
});

// LOGIN 
router.post('/login', async (req,res) => {
    const member = await User.findOne({ username: req.body.username });

    try {
        const match = await bcrypt.compare(req.body.password, user.password);
        const accessToken = jwt.sign(JSON.stringify(user), process.env.TOKEN_SECRET)
        if(match) {
            res.json({ accessToken: accessToken });
        } else {
            res.json({ message: "Invalid Login" });
        }
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;